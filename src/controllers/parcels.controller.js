const Parcels = require("../models/parcels.model");

exports.readAll = async (req, res, next) => {
  try {
    const filterPipeline = [
      {
        $match: {
          isDeleted: false,
          bound_to_client: req.body._id,
        },
      },
    ];

    const docs = await Parcels.aggregate([
      ...filterPipeline,
      { $project: { isDeleted: 0, created_by: 0, bound_to_client: 0, __v: 0 } },
    ]);

    return res.status(200).send(docs);
  } catch (error) {
    return next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const payload = req.body.payload;

    let doc = new Parcels(payload);
    await doc.save();

    return res.status(200).send("Successfully saved!")

  } catch (error) {
    return res.status(500).send('yeah');
  }
}

exports.read = async (req, res, next) => {
  try {
    const id = req.params.id;
    const parcel = await Parcels.findById(id);

    if (!parcel) return next({ codeName: 'NotFound' });

    return res.status(200).send(parcel);
  } catch (error) {
    return next(error);
  }
}

exports.update = async (req, res, next) => {
  try {
    const parcel = await Parcels.findByIdAndUpdate(req.params.id, req.body.payload)
    if (!parcel) return next({ codeName: 'NotFound' });

    return res.status(200).send('Successfully updated.');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

exports.delete = async (req, res, next) => {
  try {

    const id = req.params.id;
    const doc = await Parcels.findByIdAndUpdate(
      id,
      { isDeleted: true },
      {
        runValidators: true,
        omitUndefined: true,
      }
    );
    if (!doc) return next({ codeName: 'NotFound' });

    return res.status(200).send('Successfully removed.');
  } catch (error) {
    return next(error);
  }
}

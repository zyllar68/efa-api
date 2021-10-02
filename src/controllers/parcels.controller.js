const Parcels = require("../models/parcels.model");

exports.read = async (req, res, next) => {
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
    return next(error);
  }
}
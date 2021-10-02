const Users = require('../models/users.model');

exports.auth = async(req, res, next) => {
  try {
    const payload = req.body.payload;

    const user = await Users.findOne({username: payload.username, isDeleted: false});
    if(!user) return next({ codeName: 'NotFound' });

    const password = await Users.findOne({password: payload.password, isDeleted: false});
    if(!password) return next({ codeName: 'NotFound' });

    const user_info = {
      token: user._id,
      username: user.username,
      full_name: user.full_name,
      account_type: user.account_type,
    }
    return res.status(200).send({ user_info });
  } catch (error) {
    return next(error); 
  }
}

exports.read = async(req, res, next) => {
  try {
    const filterPipeline = [
      {
        $match: {
          isDeleted: false,
          bound_to_client: req.body._id,
        },
      },
    ];

    const docs = await Users.aggregate([
      ...filterPipeline,
      { $project: { isDeleted: 0, created_by: 0, bound_to_client: 0, __v: 0 } },
      { $sort: { name: 1 } },
    ]);

    return res.status(200).send(docs);
  } catch (error) {
    return next(error);
  }
}

exports.create = async (req, res, next) => {
  try {
    const payload = req.body.payload;

    let doc = new Users(payload);
    await doc.save();

    return res.status(200).send('Successfully saved.');
  } catch (error) {
    return res.json({message: error.message})
  }
};

exports.update = async (req, res, next) => {
  try {
    const payload = req.body.payload;
    const id = req.params.id;

    const doc = await Users.findByIdAndUpdate(id, payload);

    if (!doc) return next({ codeName: 'NotFound' });

    return res.status(200).send(doc);

  } catch (error) {
    return next(error);
  }
}

exports.delete = async (req, res, next) => {
  try {

    const id = req.params.id;
    const doc = await Distributable.findByIdAndUpdate(
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
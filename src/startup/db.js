const mongoose = require('mongoose');

module.exports = function () {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      //DeprecationWarning: current URL string parser is deprecated.
      useUnifiedTopology: true,
      // DeprecationWarning: collection.ensureIndex is deprecated.
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
};

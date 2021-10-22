const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    account_type: {
      type: Number,
      default: 2,
    },
    isDeleted: { type: Boolean, default: false },
  },
  {
    collection: 'users',
    timestamps: true,
    minimize: false,
  }
);

const Users = mongoose.model('users', Schema);

module.exports = Users;

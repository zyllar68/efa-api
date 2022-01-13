const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");


const Schema = new mongoose.Schema(
  { 
    lastEditedBy:{ type: String},
    createdBy:{ type: String, required: true },
    shipped_date:{ type: Date, required: true},
    sender:
      {
        full_name: { type: String, required: true },
        address: { type: String, required: true },
        contact_number: { type: String, required: true },
      },
    consignee:
      {
        full_name: { type: String, required: true },
        address: { type: String, required: true },
        contact_number: { type: String, required: true },
      },
    parcel_info:
      {
        item_description: { type: String, required: true },
        declared_value: { type: String, required: true },
        cod_amount: { type: String, required: true },
        no_of_items: { type: String, required: true },
        total_weight: { type: String, required: true },
        vol_weight: { type: String, required: true },
        chargable_weight: { type: String, required: true },
        status: { type: String, required: true },
        dimension: [
          {
            l: { type: String, required: true },
            w: { type: String, required: true },
            h: { type: String, required: true },
          },
        ]
      },
    isDeleted: { type: Boolean, default: false },
  },
  {
    collection: 'parcels',
    timestamps: true,
    minimize: false,
  }
);

autoIncrement.initialize(mongoose.connection);
Schema.plugin(autoIncrement.plugin, {
  model: 'parcels',
  field: '_id',
  startAt: 1221152445656,
  incrementBy: 1,
});


const Parcels = mongoose.model('parcels', Schema);

module.exports = Parcels;

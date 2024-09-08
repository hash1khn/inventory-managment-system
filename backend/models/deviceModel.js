// models/deviceModel.js
const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  deviceType: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productNumber: {
    type: String, // e.g., IMEI or Serial Number
    required: true,
    unique: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
  },
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;

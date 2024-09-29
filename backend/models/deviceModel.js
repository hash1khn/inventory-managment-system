const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  deviceType: {
    type: String, // e.g., Smartphone
    required: true,
  },
  brand: {
    type: String, // e.g., Apple
    required: true,
  },
  modelName: {
    type: String, // e.g., iPhone 12
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantityAvailable: {
    type: Number, // Total number of units available for this product
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;

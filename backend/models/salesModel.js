const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store',
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: {
    type: String,
    required: true,
  },
  customerAddress: {  // New field for customer address
    type: String,
    required: true,
  },
  customerPhone: {  // New field for customer phone number
    type: String,
    required: true,
  },
  deviceId: {  // Modified to match the updated deviceId in deviceModel
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  saleDate: {
    type: Date,
    default: Date.now,
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  receipt: {
    type: String, // URL or link to the digital receipt
  },
});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;

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
  customerAddress: {
    type: String,
    required: true,
  },
  customerPhone: {
    type: String,
    required: true,
  },
  saleAttendant: {
    type: String,  // Name of the sales attendant handling the sale
    required: true,
  },
  imei: {
    type: String,  // IMEI number for the device being sold
    required: true,
    unique: true,  // Ensures that each IMEI is unique
  },
  deviceType: {
    type: String, // Automatically fetched from Device model
    required: true,
  },
  brand: {
    type: String, // Automatically fetched from Device model
    required: true,
  },
  modelName: {
    type: String, // Model name of the device
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
    default: 'Completed',  // Assuming payment is completed as per your current logic
  },
  receipt: {
    type: String,  // Digital receipt as a string
    required: true,
  },
});

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;

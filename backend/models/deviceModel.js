// models/deviceModel.js
const mongoose = require('mongoose');
const Counter = require('./counterModel'); // Import the counter model

const deviceSchema = new mongoose.Schema({
  deviceId: {
    type: Number,
    unique: true,
  },
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
});

// Middleware to auto-increment the deviceId before saving
deviceSchema.pre('save', async function (next) {
  if (!this.isNew) {
    return next();
  }

  try {
    const counter = await Counter.findOneAndUpdate(
      { name: 'deviceId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.deviceId = counter.seq;
    next();
  } catch (err) {
    console.error('Error generating auto-incrementing deviceId', err);
    next(err);
  }
});

const Device = mongoose.model('Device', deviceSchema);
module.exports = Device;


const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose); // Import and initialize the plugin

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
  devices: [
    {
      deviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
        required: true,
      },
      modelName: {
        type: String, // Model name of the device sold
        required: true,
      },
      quantity: {
        type: Number, // Quantity of the device sold
        required: true,
      },
      itemTotalPrice: {
        type: Number, // Price for the quantity of this device sold
        required: true,
      }
    }
  ],
  totalAmount: {
    type: Number, // Total price for all devices sold in the sale
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
  receipt_id: {
    type: Number,
    unique: true, // Ensure receipt_id is unique
  },
});

// Apply the AutoIncrement plugin to the receipt_id field
salesSchema.plugin(AutoIncrement, { inc_field: 'receipt_id' });

const Sales = mongoose.model('Sales', salesSchema);
module.exports = Sales;

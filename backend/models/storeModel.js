// models/storeModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const storeSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: true,
  },
  storeName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  address: String,
  emailVerificationToken: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
});

// Hash password before saving the store owner
storeSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Store = mongoose.model('Store', storeSchema);

module.exports = Store;

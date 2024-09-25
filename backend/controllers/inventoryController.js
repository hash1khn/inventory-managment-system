// controllers/inventoryController.js
const Device = require('../models/deviceModel');
const Store = require('../models/storeModel');

// Add a new device to the inventory
exports.addDevice = async (req, res) => {
  const { deviceType, modelName, price, productNumber } = req.body;

  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Create a new device
    const newDevice = new Device({
      storeId: storeOwner.id,
      deviceType,
      modelName,
      price,
      productNumber,
    });

    await newDevice.save();
    res.status(201).json({ message: 'Device added to inventory', device: newDevice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDeviceById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware
  
      // Find the device by its ID and ensure it belongs to the authenticated store owner
      const device = await Device.findOne({ _id: id, storeId: storeOwner.id });
  
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }
  
      res.status(200).json(device);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get all devices in the store's inventory
exports.getAllDevices = async (req, res) => {
  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Find all devices for the store owner
    const devices = await Device.find({ storeId: storeOwner.id });
    res.status(200).json(devices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update device in the inventory
exports.updateDevice = async (req, res) => {
  const { id } = req.params;
  const { deviceType, modelName, price, productNumber, quantityAvailable } = req.body;

  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Find the device by id and storeId
    let device = await Device.findOne({ _id: id, storeId: storeOwner.id });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Update the device details
    device.deviceType = deviceType || device.deviceType;
    device.modelName = modelName || device.modelName;
    device.price = price || device.price;
    device.productNumber = productNumber || device.productNumber;
    device.quantityAvailable = quantityAvailable || device.quantityAvailable;

    await device.save();
    res.status(200).json({ message: 'Device updated', device });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a device from the inventory
exports.deleteDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Find and delete the device by id and storeId
    const device = await Device.findOneAndDelete({ _id: id, storeId: storeOwner.id });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json({ message: 'Device deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

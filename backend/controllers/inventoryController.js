const Device = require('../models/deviceModel');
const Store = require('../models/storeModel');

// Add a new device to the inventory
exports.addDevice = async (req, res) => {
  const { deviceType, brand, modelName, price, quantityAvailable } = req.body;

  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Check if a device with the same storeId, deviceType, brand, and modelName already exists
    const existingDevice = await Device.findOne({
      storeId: storeOwner.id,
      deviceType,
      brand,
      modelName
    });

    if (existingDevice) {
      return res.status(400).json({ message: 'Device with the same type, brand, and model already exists in the store.' });
    }

    // Create a new device with the given details
    const newDevice = new Device({
      storeId: storeOwner.id,
      deviceType,
      brand,
      modelName,
      price,
      quantityAvailable: quantityAvailable || 1 // Default quantity to 1 if not provided
    });

    await newDevice.save();
    res.status(201).json({ message: 'Device added to inventory', device: newDevice });
  } catch (err) {
    console.error('Error adding device:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific device by ID
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
    console.error('Error fetching device by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all devices in the store's inventory
exports.addDevice = async (req, res) => {
  const { deviceType, brand, modelName, price, quantityAvailable } = req.body;

  console.log('Received request to add device:', req.body); // Debugging: Log request body

  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware
    console.log('Authenticated store owner:', storeOwner.id); // Debugging: Log store owner

    // Ensure price and quantityAvailable are numbers
    const parsedPrice = Number(price);
    const parsedQuantity = Number(quantityAvailable);

    // Check if parsing was successful
    if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
      return res.status(400).json({ message: 'Price and quantityAvailable must be valid numbers.' });
    }

    // Check if a device with the same storeId, deviceType, brand, and modelName already exists
    const existingDevice = await Device.findOne({
      storeId: storeOwner.id,
      deviceType,
      brand,
      modelName
    });

    if (existingDevice) {
      console.log('Device already exists:', existingDevice); // Debugging: Log existing device
      return res.status(400).json({ message: 'Device with the same type, brand, and model already exists in the store.' });
    }

    // Log that the device does not exist, proceed to create a new one
    console.log('No existing device found, proceeding to add new device');

    // Create a new device with the given details
    const newDevice = new Device({
      storeId: storeOwner.id,
      deviceType,
      brand,
      modelName,
      price: parsedPrice,
      quantityAvailable: parsedQuantity || 1 // Default quantity to 1 if not provided
    });

    console.log('Saving new device:', newDevice); // Debugging: Log the new device before saving

    await newDevice.save();

    console.log('Device added successfully:', newDevice); // Debugging: Log success
    res.status(201).json({ message: 'Device added to inventory', device: newDevice });
  } catch (err) {
    console.error('Error adding device:', err); // Debugging: Log error stack trace
    res.status(500).json({ message: 'Server error' });
  }
};


// Update a device in the inventory
exports.updateDevice = async (req, res) => {
  const { id } = req.params;
  const { deviceType, brand, modelName, price, quantityAvailable } = req.body;

  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Find the device by ID and storeId
    const device = await Device.findOne({ _id: id, storeId: storeOwner.id });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    // Update the device details
    device.deviceType = deviceType || device.deviceType;
    device.brand = brand || device.brand;
    device.modelName = modelName || device.modelName;
    device.price = price || device.price;
    device.quantityAvailable = quantityAvailable !== undefined ? quantityAvailable : device.quantityAvailable;

    await device.save();
    res.status(200).json({ message: 'Device updated successfully', device });
  } catch (err) {
    console.error('Error updating device:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a device from the inventory
exports.deleteDevice = async (req, res) => {
  const { id } = req.params;

  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Find and delete the device by ID and storeId
    const device = await Device.findOneAndDelete({ _id: id, storeId: storeOwner.id });
    if (!device) {
      return res.status(404).json({ message: 'Device not found' });
    }

    res.status(200).json({ message: 'Device deleted successfully' });
  } catch (err) {
    console.error('Error deleting device:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

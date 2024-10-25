const Device = require('../models/deviceModel');
const Store = require('../models/storeModel');

// Add a new device to the inventory
exports.addDevice = async (req, res) => {
  const { deviceType, brand, modelName, price, quantityAvailable } = req.body;

  try {
    // Get the authenticated store owner's ID from the request (set by the auth middleware)
    const storeOwner = req.storeOwner;

    if (!storeOwner) {
      return res.status(401).json({ message: 'Unauthorized, store owner not found' });
    }


    const newDevice = new Device({
      storeId: storeOwner.id, 
      deviceType,
      brand,
      modelName,
      price,
      quantityAvailable,
    });

    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error adding device' });
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
exports.getAllDevices = async (req, res) => {
  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Fetch all devices belonging to the authenticated store owner
    const devices = await Device.find({ storeId: storeOwner.id });
    
    res.status(200).json(devices);
  } catch (err) {
    console.error(err);
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

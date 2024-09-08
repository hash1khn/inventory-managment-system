// routes/inventoryRoutes.js
const express = require('express');
const { addDevice, getDeviceById,getAllDevices, updateDevice, deleteDevice } = require('../controllers/inventoryController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure only logged-in store owners can manage inventory

const router = express.Router();

router.post('/add-device', authMiddleware, addDevice);
router.get('/get-by-id/:id', authMiddleware, getDeviceById);  // New route for getting a device by its ID
router.get('/get-all-devices', authMiddleware, getAllDevices);
router.put('/update-device/:id', authMiddleware, updateDevice);
router.delete('/delete-device/:id', authMiddleware, deleteDevice);

module.exports = router;

// routes/salesRoutes.js
const express = require('express');
const { createSale, getReceipts, getReceiptById } = require('../controllers/salesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/initiate-sale', authMiddleware, createSale);          // Log a sale
router.get('/get-all-receipts', authMiddleware, getReceipts);        // Get all receipts for the store
router.get('/receipt/:id', authMiddleware, getReceiptById);  // Get receipt by ID

module.exports = router;

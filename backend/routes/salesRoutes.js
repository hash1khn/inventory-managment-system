// routes/salesRoutes.js
const express = require('express');
const { createSale, recallReceipt, getAllSales } = require('../controllers/salesController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/initiate-sale', authMiddleware, createSale);          // Log a sale
// router.get('/get-all-receipts', authMiddleware, getReceipts);        // Get all receipts for the store
// router.get('/receipt/:id', authMiddleware, getReceiptById);  // Get receipt by ID
// Route to recall a receipt
router.get('/recall-receipt', authMiddleware,recallReceipt);

// Route to get all sales
router.get('/all', authMiddleware,getAllSales);
module.exports = router;

const Sales = require('../models/salesModel');
const Device = require('../models/deviceModel');
const Store = require('../models/storeModel');
const nodemailer = require('nodemailer');
const paystack = require('../utils/payment'); // Paystack initialized here

// // Create a new sale, charge the fee, and generate a receipt
// exports.createSale = async (req, res) => {
//   const { customerName, customerEmail, deviceId, salePrice } = req.body;

//   try {
//     const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

//     // Find the device being sold
//     const device = await Device.findById(deviceId);
//     if (!device || device.storeId.toString() !== storeOwner.id) {
//       return res.status(404).json({ message: 'Device not found or unauthorized' });
//     }

//     // Calculate the 1% fee
//     const serviceFee = (salePrice * 1) / 100;

//     // Handle payment via Paystack
//     const paymentResponse = await paystack.transaction.initialize({
//       email: storeOwner.email,
//       amount: serviceFee * 100, // Paystack accepts amount in kobo (smallest unit)
//       currency: 'NGN',               // Nigerian Naira
//       callback_url: 'http://localhost:5000/api/sales/verify-payment'
//     });

//     // If payment is not successful
//     if (paymentResponse.status !== 'success') {
//       return res.status(400).json({ message: 'Payment failed' });
//     }

//     // Create the sale entry
//     const sale = new Sales({
//       storeId: storeOwner.id,
//       customerName,
//       customerEmail,
//       deviceId,
//       salePrice,
//       paymentStatus: 'Completed',
//     });

//     await sale.save();

//     // Generate a digital receipt (just a simple receipt string for now)
//     const receipt = `Receipt for ${customerName}, device: ${device.modelName}, price: $${salePrice}, sold by ${storeOwner.storeName}`;
//     sale.receipt = receipt;

//     await sale.save();

//     // Send receipt via email
//     const transporter = nodemailer.createTransport({
//       service: 'Sendinblue', // Or Brevo SMTP
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const mailOptions = {
//       from: 'yourapp@example.com',
//       to: customerEmail,
//       subject: 'Your Purchase Receipt',
//       text: `Thank you for your purchase. Here is your receipt: ${receipt}`,
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         console.error('Error sending receipt email:', err);
//         return res.status(500).json({ message: 'Receipt email failed' });
//       }
//       console.log('Receipt email sent:', info.response);
//     });

//     res.status(201).json({ message: 'Sale logged and receipt generated', sale });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// Create a new sale and generate a receipt (no payment gateway for now)
exports.createSale = async (req, res) => {
  const { customerName, customerEmail, customerAddress, customerPhone, modelName, imei, saleAttendant } = req.body;

  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Find the device being sold using only the modelName
    const device = await Device.findOne({
      storeId: storeOwner.id,
      modelName
    });

    if (!device) {
      return res.status(404).json({ message: 'Device not found in inventory' });
    }

    // Check if the device is available in sufficient quantity
    if (device.quantityAvailable <= 0) {
      return res.status(400).json({ message: 'Device out of stock' });
    }

    // Check if the IMEI number is unique in sales records
    const existingSaleWithIMEI = await Sales.findOne({ imei });
    if (existingSaleWithIMEI) {
      return res.status(400).json({ message: 'This IMEI has already been sold' });
    }

    // Get the device details
    const { deviceType, brand, price } = device;

    // Generate a digital receipt (a simple string for now)
    const receipt = `Receipt for ${customerName}, device: ${device.modelName}, price: $${price}, IMEI: ${imei}, sold by ${storeOwner.storeName}`;

    // Create the sale entry
    const sale = new Sales({
      storeId: storeOwner.id,
      customerName,
      customerEmail,
      customerAddress,  // Include the customer address
      customerPhone,    // Include the customer phone number
      saleAttendant,    // Name of the sales attendant
      imei,             // IMEI of the device being sold
      deviceType,       // Automatically fetched device type
      brand,            // Automatically fetched brand
      modelName,        // Model name of the device
      salePrice: price, // Automatically fetched price
      paymentStatus: 'Completed', // Assume payment is "Completed" for now
      receipt,          // Assign the receipt string here
    });

    // Save the sale entry to the database
    await sale.save();

    // Decrease the device quantity after sale
    device.quantityAvailable -= 1;
    await device.save();

    // Optionally, send receipt via email
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com', // Or another email service (e.g., Brevo)
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: 'hashirkhan.tech@gmail.com',
      to: customerEmail,
      subject: 'Your Purchase Receipt',
      text: `Thank you for your purchase. Here is your receipt: ${receipt}`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending receipt email:', err);
        return res.status(500).json({ message: 'Receipt email failed' });
      }
      console.log('Receipt email sent:', info.response);
    });

    res.status(201).json({ message: 'Sale logged and receipt generated', sale });
  } catch (err) {
    console.error('Error creating sale:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
// Recall a receipt based on IMEI, modelName, or customerEmail
exports.recallReceipt = async (req, res) => {
  const { imei, modelName, customerEmail } = req.query;

  try {
    // Build the query based on provided parameters
    const query = {};

    if (imei) {
      query.imei = imei;
    }

    if (modelName) {
      query.modelName = modelName;
    }

    if (customerEmail) {
      query.customerEmail = customerEmail;
    }

    // Ensure at least one search parameter is provided
    if (!imei && !modelName && !customerEmail) {
      return res.status(400).json({ message: 'Please provide at least one search criteria: imei, modelName, or customerEmail' });
    }

    // Find the sale(s) based on the query
    const sales = await Sales.find(query);

    // Check if any sales are found
    if (sales.length === 0) {
      return res.status(404).json({ message: 'No matching receipts found' });
    }

    // Return the receipts of all matched sales
    const receipts = sales.map((sale) => ({
      customerName: sale.customerName,
      customerEmail: sale.customerEmail,
      customerAddress: sale.customerAddress,
      customerPhone: sale.customerPhone,
      deviceType: sale.deviceType,
      brand: sale.brand,
      modelName: sale.modelName,
      imei: sale.imei,
      salePrice: sale.salePrice,
      saleDate: sale.saleDate,
      receipt: sale.receipt,
    }));

    res.status(200).json(receipts);
  } catch (err) {
    console.error('Error recalling receipt:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all sales for the store owner
exports.getAllSales = async (req, res) => {
  try {
    const storeOwner = req.storeOwner; // Authenticated store owner from authMiddleware

    // Fetch all sales for the store owner
    const sales = await Sales.find({ storeId: storeOwner.id });

    // Return the sales records
    res.status(200).json(sales);
  } catch (err) {
    console.error('Error fetching all sales:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get receipt by sale ID
exports.getReceiptById = async (req, res) => {
  const { id } = req.params;

  try {
    const storeOwner = req.storeOwner;

    // Fetch the sale and ensure it belongs to the authenticated store owner
    const sale = await Sales.findOne({ _id: id, storeId: storeOwner.id });
    if (!sale) {
      return res.status(404).json({ message: 'Receipt not found' });
    }

    res.status(200).json(sale);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

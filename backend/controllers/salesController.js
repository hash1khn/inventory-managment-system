const Sales = require("../models/salesModel");
const Device = require("../models/deviceModel");
const Store = require("../models/storeModel");
const nodemailer = require("nodemailer");
const stripe = require("../utils/payment"); // Paystack initialized here

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
    const {
        customerName,
        customerEmail,
        customerAddress,
        customerPhone,
        saleAttendant,
        cart,
    } = req.body;

    try {
        const storeOwner = req.storeOwner;

        // Fetch the largest receipt_id in the sales records
        const largestReceipt = await Sales.findOne()
            .sort({ receipt_id: -1 })
            .limit(1);
        const newReceiptId = largestReceipt ? largestReceipt.receipt_id + 1 : 1;

        let totalAmount = 0;
        let devicesSold = [];

        // Loop through the cart and process each item
        for (const item of cart) {
            const device = await Device.findOne({
                _id: item.deviceId,
                storeId: storeOwner.id,
            });

            if (!device) {
                return res.status(404).json({
                    message: `Device with ID ${item.deviceId} not found in inventory`,
                });
            }

            if (device.quantityAvailable < item.quantity) {
                return res.status(400).json({
                    message: `Insufficient quantity for ${device.modelName}`,
                });
            }

            const itemTotalPrice = item.quantity * device.price;
            totalAmount += itemTotalPrice;
            device.quantityAvailable -= item.quantity;
            await device.save();

            devicesSold.push({
                deviceId: device._id,
                modelName: device.modelName,
                quantity: item.quantity,
                itemTotalPrice: itemTotalPrice,
            });
        }

        // Generate a digital receipt with the receipt ID included
        let receipt = `Receipt for ${customerName}\nReceipt ID: ${newReceiptId}\nDevices Sold:\n`;
        devicesSold.forEach((device) => {
            receipt += ` - ${device.modelName}: ${device.quantity} units, Total: $${device.itemTotalPrice}\n`;
        });
        receipt += `Total Amount: $${totalAmount}\nSold by: ${storeOwner.storeName}\nAttendant: ${saleAttendant}`;

        const sale = new Sales({
            storeId: storeOwner.id,
            customerName,
            customerEmail,
            customerAddress,
            customerPhone,
            saleAttendant,
            devices: devicesSold,
            totalAmount,
            paymentStatus: "Completed",
            receipt_id: newReceiptId,
            receipt,
        });

        await sale.save();

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: "hashirkhan.tech@gmail.com",
            to: customerEmail,
            subject: "Your Purchase Receipt",
            text: `Thank you for your purchase. Here is your receipt:\n\n${receipt}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error("Error sending receipt email:", err);
                return res
                    .status(500)
                    .json({ message: "Receipt email failed" });
            }
            console.log("Receipt email sent:", info.response);
        });

        res.status(201).json({
            message: "Sale logged and receipt generated",
            sale,
        });
    } catch (err) {
        console.error("Error creating sale:", err);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getLargestReceiptId = async (req, res) => {
    try {
        const largestReceipt = await Sales.findOne()
            .sort({ receipt_id: -1 })
            .limit(1);

        if (!largestReceipt) {
            return res.status(404).json({ message: "No sales records found" });
        }

        res.status(200).json({ largestReceiptId: largestReceipt.receipt_id });
    } catch (err) {
        console.error("Error fetching the largest receipt ID:", err);
        res.status(500).json({ message: "Server error" });
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
            return res.status(400).json({
                message:
                    "Please provide at least one search criteria: imei, modelName, or customerEmail",
            });
        }

        // Find the sale(s) based on the query
        const sales = await Sales.find(query);

        // Check if any sales are found
        if (sales.length === 0) {
            return res
                .status(404)
                .json({ message: "No matching receipts found" });
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
        console.error("Error recalling receipt:", err);
        res.status(500).json({ message: "Server error" });
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
        console.error("Error fetching all sales:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get receipt by sale ID
exports.getReceiptById = async (req, res) => {
    const { receipt_id } = req.params; // Get receipt_id from the request parameters

    try {
        const storeOwner = req.storeOwner; // Get the authenticated store owner

        // Fetch the sale using receipt_id and ensure it belongs to the authenticated store owner
        const sale = await Sales.findOne({
            receipt_id: receipt_id,
            storeId: storeOwner.id,
        });

        // Check if the sale was found
        if (!sale) {
            return res.status(404).json({ message: "Receipt not found" });
        }

        // Return the sale details, including the digital receipt
        res.status(200).json({
            receipt_id: sale.receipt_id,
            receipt: sale.receipt, // Include the digital receipt string
            // Include other relevant sale details if necessary
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

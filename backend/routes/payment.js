const express = require('express');
const router = express.Router();
require('dotenv').config(); 
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); 

// Update this route to create a Payment Intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { totalAmount } = req.body; // Get totalAmount directly from the request body

    if (totalAmount <= 0) {
      return res.status(400).send('Total amount must be greater than zero.');
    }

    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount, // Amount in cents
      currency: 'usd', // Set your currency here
      // You can include additional fields here (e.g., receipt_email)
    });

    res.json({ clientSecret: paymentIntent.client_secret }); // Send back the clientSecret
  } catch (error) {
    console.error('Error creating Stripe payment intent:', error);
    res.status(500).send('Failed to create payment intent');
  }
});

module.exports = router;

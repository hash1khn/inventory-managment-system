const Store = require('../models/storeModel');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Register a new store owner with email verification
exports.registerStore = async (req, res) => {
  const { ownerName, storeName, email, password, phone, address } = req.body;

  try {
    // Check if the store owner already exists
    let storeOwner = await Store.findOne({ email });
    if (storeOwner) {
      return res.status(400).json({ message: 'Store owner already exists' });
    }

    // Create an email verification token
    const emailVerificationToken = crypto.randomBytes(10).toString('hex');

    // Create a new store owner (but not verified)
    storeOwner = new Store({
      ownerName,
      storeName,
      email,
      password,
      phone,
      address,
      emailVerificationToken,
      isVerified: false,
    });

    // Save the new store owner to the database
    await storeOwner.save();

    // Set up Nodemailer with Brevo's SMTP service
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      auth: {
        user: process.env.EMAIL_USER, // Brevo SMTP email (from .env)
        pass: process.env.EMAIL_PASS, // Brevo SMTP password (from .env)
      },
    });

    // Construct the email message
    const mailOptions = {
      to: storeOwner.email,
      from: "hashirkhan.tech@gmail.com", 
      subject: 'Email confirmation',
      text: `You are receiving this because you have registered your store account.\n\n
      Please click on the following link, or paste this into your browser to verify your email address:\n\n
      http://${req.headers.host}/api/auth/verify-email/${emailVerificationToken}\n\n
      If you did not request this, please ignore this email.\n`,
    };

    // Send the verification email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(500).json({ message: 'Error sending verification email' });
      }
      console.log('Verification email sent: ' + info.response);
      res.status(200).json({ message: 'Registration successful. Please check your email to verify your account.' });
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Unable to register the store owner' });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Find store owner by the verification token
    const storeOwner = await Store.findOne({ emailVerificationToken: token });

    if (!storeOwner) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Mark store owner as verified and remove the token
    storeOwner.isVerified = true;
    storeOwner.emailVerificationToken = undefined;

    await storeOwner.save();

    res.status(200).json({ message: 'Email verified successfully. You can now log in.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error verifying email' });
  }
};

// Login store owner
exports.loginStore = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the store owner by email
    const storeOwner = await Store.findOne({ email });
    if (!storeOwner) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the email is verified
    if (!storeOwner.isVerified) {
      return res.status(400).json({ message: 'Email is not verified' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, storeOwner.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create and return a JWT token for authentication
    const token = jwt.sign({ id: storeOwner._id, storeName: storeOwner.storeName }, process.env.JWT_SECRET, {
      expiresIn: '72h',
    });

    res.status(200).json({message:"logged in successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Logout store owner (This is mostly handled on the client-side)
exports.logoutStore = (req, res) => {
  res.status(200).json({ message: 'Successfully logged out' });
};

// routes/authRoutes.js
const express = require('express');
const { registerStore, loginStore, logoutStore ,verifyEmail} = require('../controllers/authController');
const router = express.Router();

router.post('/register', registerStore);
router.get('/verify-email/:token', verifyEmail);
router.post('/login', loginStore);
router.get('/logout', logoutStore);

module.exports = router;

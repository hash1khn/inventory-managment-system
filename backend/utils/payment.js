const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET); 
module.exports = paystack;
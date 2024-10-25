// // services/stripeService.js
// import axios from 'axios';

// export const createStripeCheckoutSession = async (salesData) => {
//   try {
//     const response = await axios.post('http://localhost:5000/api/payment/create-checkout-session', salesData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating Stripe checkout session:', error);
//     throw error;
//   }
// };

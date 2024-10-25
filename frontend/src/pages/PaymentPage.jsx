import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Form, Input, Button, message } from 'antd';
import { CardElement, Elements, useStripe, useElements } from '@stripe/react-stripe-js';
import { logSale } from '../services/salesService'; // Import logSale function

const stripePromise = loadStripe('pk_test_51PeF5sFPvVq2qzVR4SexD07W9sN5YGjXVZ2O0UNft4MfHzDLq5FBJvQAmLQUDKbBgGnK1P0vLxwlAi4RCevQCS0E00XrlWmYbt');

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const { salesData } = location.state || {};
  const [loading, setLoading] = useState(false);
  const totalAmount = salesData?.totalAmount;
  const fee = Math.round((totalAmount ? totalAmount * 0.01 : 0) * 100) / 100; // Calculate fee in dollars
  console.log(fee)
  const amountWithFee = Number(totalAmount) + fee;  // Get total amount from salesData
  const formattedAmount = Math.round(parseFloat(amountWithFee) * 100); // Convert to cents
  // Use the Stripe and Elements hooks
  console.log(typeof(formattedAmount))
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (!salesData) {
      message.error('No sales data found. Please add items to your cart.');
    }
  }, [salesData]);

  const handleSubmit = async (values) => {
    setLoading(true);

    // Create a payment intent on your backend and get the client secret
    try {
      const response = await fetch('http://localhost:5000/api/payment/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalAmount:formattedAmount }) // Send totalAmount directly
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();

      // Use Stripe.js to confirm the payment
      const cardElement = elements.getElement(CardElement); // Get the CardElement instance

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: values.cardholderName,
            email: salesData.customerEmail, // Or any relevant customer info
          },
        },
      });

      if (error) {
        message.error(`Payment failed: ${error.message}`);
      } else {
        message.success('Payment succeeded!');
        await handleLogSale(salesData);
        navigate('/'); // Call logSale function here
      }
    } catch (err) {
      console.error('Payment error:', err);
      message.error('Failed to process payment.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogSale = async (salesData) => {
    try {
      const result = await logSale(salesData); // Use the imported logSale function
      console.log('Sale logged successfully:', result);
      // Redirect or show success message after logging sale
    } catch (error) {
      console.error('Error logging sale:', error);
      message.error('Failed to log sale.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Payment Page</h2>
      <h4>Amount: ${totalAmount}</h4>
      <h4>Fee (1%): ${Number(fee).toFixed(2)}</h4>
      <h4>Total Amount with Fee: ${(formattedAmount/100).toFixed(2)}</h4>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Cardholder Name"
          name="cardholderName"
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Card Details">
          <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay Now
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const WrappedPaymentPage = () => (
  <Elements stripe={stripePromise}>
    <PaymentPage />
  </Elements>
);

export default WrappedPaymentPage;

import React, { useState } from 'react';
import { Input, Button, Row, Col, message, Typography } from 'antd';
import { getReceiptById } from '../services/salesService'; // Adjust the path as necessary

const { Title, Paragraph } = Typography;

const RecallReceiptPage = () => {
  const [receiptId, setReceiptId] = useState('');
  const [receiptData, setReceiptData] = useState(null); // State to store fetched receipt data

  const handleRecall = async () => {
    try {
      const data = await getReceiptById(receiptId); // Call the service to get the receipt
      console.log('Receipt data:', data);
      setReceiptData(data); // Set the fetched receipt data to state
      message.success('Receipt fetched successfully!');
    } catch (error) {
      message.error('Failed to fetch receipt. Please try again.');
      setReceiptData(null);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={1}>Recall Receipt</Title>
      <Row gutter={16} align="middle">
        <Col>
          <Input
            placeholder="Enter Receipt ID"
            style={{ width: '400px' }} // Set the width for the input
            value={receiptId}
            onChange={(e) => setReceiptId(e.target.value)} // Update state on input change
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleRecall}>
            Recall Receipt
          </Button>
        </Col>
      </Row>
      
      {/* Conditional rendering of the receipt data */}
      {receiptData && (
        <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #d9d9d9', borderRadius: '5px' }}>
          <Title level={2}>Receipt Details</Title>
          <Paragraph><strong>Receipt ID:</strong> {receiptData.receipt_id}</Paragraph>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{receiptData.receipt}</pre> {/* Display digital receipt as a string */}
        </div>
      )}
    </div>
  );
};

export default RecallReceiptPage;

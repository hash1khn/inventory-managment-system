import React from 'react';
import { Input, Button, Row, Col } from 'antd';

const RecallReceiptPage = () => {
  const handleRecall = () => {
    // Logic to handle the recall of the receipt
    console.log('Receipt recalled');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Recall Receipt</h1>
      <Row gutter={16} align="middle">
        <Col>
          <Input
            placeholder="Enter Receipt ID"
            style={{ width: '400px' }} // Set the width for the input
          />
        </Col>
        <Col>
          <Button type="primary" htmlType="submit" className="ant-btn-custom" onClick={handleRecall}>
            Recall Receipt
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default RecallReceiptPage;

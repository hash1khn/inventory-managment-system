import React from 'react';
import { Button, Typography } from 'antd';

const { Title, Paragraph } = Typography;

const CheckEmailPage = () => {

  // Function to close the tab
  const handleCloseTab = () => {
    window.close();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', padding: '2rem' }}>
      <Title level={2}>Check Your Email</Title>
      <Paragraph>
        We have sent you an email with a verification link. Please check your inbox and click on the link to verify your email address.
      </Paragraph>
      <Paragraph>
        You can close this tab now.
      </Paragraph>
      <Button htmlType="submit"
                        size="large"
                        className="ant-btn-custom" type="primary" onClick={handleCloseTab}>
        Close This Tab
      </Button>
    </div>
  );
};

export default CheckEmailPage;

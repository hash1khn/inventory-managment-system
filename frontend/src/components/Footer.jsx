import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        height: '48px',
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: '#C2E7DA', // Light green background color from your theme
        display: 'flex',
        alignItems: 'center', // Center text vertically
        justifyContent: 'center', // Center text horizontally
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body1"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '300', // Light font weight
            textAlign: 'center',
            color: '#1A1341', // Dark blue text color from your theme
          }}
        >
          Tech Haven © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

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
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          Admin Site © {new Date().getFullYear()}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;

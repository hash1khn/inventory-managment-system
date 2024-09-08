import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      {/* Center content vertically and horizontally */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%',  // Ensure it takes full available height
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Admin Site
        </Typography>
        <Typography variant="h6" component="p" gutterBottom>
          Manage your inventory and sales with ease. Please login or register to continue.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            sx={{ marginRight: 2 }}
          >
            Login
          </Button>
          <Button variant="outlined" color="primary" component={Link} to="/register">
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;

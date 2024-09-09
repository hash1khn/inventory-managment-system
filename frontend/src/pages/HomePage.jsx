import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import '../App.css'; // Ensure this CSS file is imported

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
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          className="poppins-bold"  // Apply bold font style
        >
          Welcome to the Admin Site
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          gutterBottom 
          className="poppins-light"  // Apply light font style
        >
          Manage your inventory and sales with ease. Please login or register to continue.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            sx={{ marginRight: 2 }}
            className="poppins-medium"  // Apply medium font style to the button
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to="/register"
            className="poppins-medium"  // Apply medium font style to the button
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;

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
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 'bold',
          }}
        >
          Welcome to Tech Haven
        </Typography>
        <Typography 
          variant="h6" 
          component="p" 
          gutterBottom 
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: '300',  // Light font weight
          }}
        >
          Manage your inventory and sales with ease. Please login or register to continue.
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
            sx={{
              marginRight: 2,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',  // Medium font weight
            }}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to="/register"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: '500',  // Medium font weight
            }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default HomePage;

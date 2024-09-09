import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import '../App.css'; // Ensure this CSS file is imported

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1A1341' }}> {/* Dark blue background */}
      <Toolbar>
        {/* Logo area */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Poppins', fontWeight: 'bold', color: '#C2E7DA' }}>
            Tech Haven
          </Typography>
        </Box>
        {/* Navigation buttons */}
        <Button color="inherit" component={Link} to="/login" sx={{ fontFamily: 'Poppins', fontWeight: 'medium' }}>
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register" sx={{ fontFamily: 'Poppins', fontWeight: 'medium' }}>
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

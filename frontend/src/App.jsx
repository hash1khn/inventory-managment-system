import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import InventoryPage from './pages/InventoryPage';
import SalesPage from './pages/SalesPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Box } from '@mui/material';
import './App.css';

// Create a Material UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Apply a full viewport height */}
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar /> {/* The header/navbar */}
          {/* Main content will take the available space */}
          <Box component="main" sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/sales" element={<SalesPage />} />
              <Route path="/" element={<HomePage />} />  {/* HomePage as default route */}
            </Routes>
          </Box>
          <Footer /> {/* Footer sticks at the bottom */}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;

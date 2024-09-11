require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const inventoryRoutes=require('./routes/inventoryRoutes');
const salesRoutes = require('./routes/salesRoutes');
const morgan = require('morgan'); // Import Morgan
const cors = require('cors');

const app = express();
// Use CORS and specify allowed origin
app.use(cors({
  origin: 'http://localhost:5173',  // Allow requests from your Vite frontend
  credentials: true                 // Allow cookies to be sent with the requests if necessary
}));
  
// Middleware
app.use(express.json());
app.use(morgan('dev')); // Add Morgan for logging requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory',inventoryRoutes);
app.use('/api/sales', salesRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

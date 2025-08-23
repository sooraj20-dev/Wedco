require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const photographerRoutes = require('./routes/photographer');
const authRoutes = require('./routes/auth'); // ✅ Include auth routes
const errorHandler = require('./middleware/errorhandler');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,  // ✅ allow cookies / headers
}));

app.use(express.json());
app.use('/uploads', express.static('uploads')); // Static file serving

// Routes
app.use('/api/photographer', photographerRoutes);
app.use('/api/auth', authRoutes); // ✅ Add auth route

// Global error handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

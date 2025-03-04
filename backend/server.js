require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const photoRoutes = require('./routes/photos');
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (for testing purposes)
app.use(cors({
    origin: 'https://meta-photo-api-john-rocha.onrender.com/',
    methods: 'GET,POST',
    allowedHeaders: 'Content-Type,Authorization'
}));

// Middleware for JSON
app.use(express.json());

// Serve API routes
app.use('/externalapi/photos', photoRoutes);

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Fallback route to handle any other requests (for React Router in frontend)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

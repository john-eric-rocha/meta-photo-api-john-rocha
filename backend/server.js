require('dotenv').config();
const express = require('express');
const app = express();
const photoRoutes = require('./routes/photos');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use('/externalapi/photos', photoRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

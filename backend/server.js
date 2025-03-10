require("dotenv").config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5001;

// Connect to DB
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('POS System Backend is Running...');
});

app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});

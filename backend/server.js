require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const Purchase = require('./models/Purchase'); // Import Purchase model

const app = express();
const port = process.env.PORT || 5001;

// Connect to MongoDB Atlas
connectDB();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow your frontend URL
}));
app.use(bodyParser.json());

// Root test route
app.get("/", (req, res) => {
    res.send("POS System Backend is Running...");
});

// API route to handle purchases
app.post('/api/purchases', async (req, res) => {
    const { itemName, quantity, price, total } = req.body;

    try {
        const newPurchase = new Purchase({ itemName, quantity, price, total });
        await newPurchase.save();
        res.json(newPurchase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
});
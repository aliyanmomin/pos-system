require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cartRoutes = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/cart", cartRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

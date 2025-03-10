const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
    itemName: String,
    quantity: Number,
    price: Number,
    total: Number,
    tax: Number,
    paymentMethod: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);

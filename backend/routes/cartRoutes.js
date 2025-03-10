const express = require("express");
const Cart = require("../models/cartModel");

const router = express.Router();

router.get("/", async (req, res, next) => {
    try {
        const items = await Cart.getAllItems();
        res.json(items);
    } catch (err) {
        next(err);
    }
});

router.post("/", async (req, res, next) => {
    const { name, price, qty } = req.body;
    try {
        const newItem = await Cart.addItem(name, price, qty);
        res.json(newItem);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await Cart.removeItem(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

module.exports = router;

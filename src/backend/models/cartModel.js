const pool = require("../config/db");

const Cart = {
    getAllItems: async () => {
        const result = await pool.query("SELECT * FROM cart");
        return result.rows;
    },
    
    addItem: async (name, price, qty) => {
        const result = await pool.query(
            "INSERT INTO cart (name, price, qty) VALUES ($1, $2, $3) RETURNING *",
            [name, price, qty]
        );
        return result.rows[0];
    },
    
    removeItem: async (id) => {
        await pool.query("DELETE FROM cart WHERE id = $1", [id]);
    }
};

module.exports = Cart;

import React, { useState } from "react";
import { 
    AppBar, Toolbar, Typography, Drawer, Box, Button, IconButton, 
    Grid, Paper, Divider, TextField, List, ListItem, ListItemText
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ReceiptIcon from "@mui/icons-material/Receipt";

const categories = ["Tax", "Non Tax", "Beer", "24 Pack Beer", "Soda", "Candy", "Cake", "Grocery", "Deli", "Fuel", "Cigarettes", "Cigar", "Lottery", "Money Order"];
const reports = [
    { id: 1, name: "Fuel Report" },
    { id: 2, name: "Sales Report" },
    { id: 3, name: "Daily Report" }
];

export default function App() {
    const [cart, setCart] = useState([]);
    const [manualPrice, setManualPrice] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const addToCart = (category) => {
        if (!manualPrice) {
            alert("Please enter a price.");
            return;
        }

        const newItem = {
            id: Date.now(),
            name: category,
            price: parseFloat(manualPrice),
            qty: 1
        };

        setCart([...cart, newItem]);
        setManualPrice("");
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item.id !== id));
    };

    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Drawer open={drawerOpen} onClose={toggleDrawer} variant="temporary">
                <Box sx={{ width: 250, padding: 2 }}>
                    <Typography variant="h6">Reports</Typography>
                    <List>
                        {reports.map((report) => (
                            <ListItem 
                                button 
                                key={report.id} 
                                onClick={() => { setSelectedReport(report.name); toggleDrawer(); }}
                            >
                                <ReceiptIcon sx={{ marginRight: 1 }} />
                                <ListItemText primary={report.name} />
                            </ListItem>
                        ))}
                        <ListItem button onClick={() => { setSelectedReport(null); toggleDrawer(); }}>
                            <ShoppingCartIcon sx={{ marginRight: 1 }} />
                            <ListItemText primary="Checkout" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>

            <Box sx={{ flexGrow: 1, padding: 3, backgroundColor: 'gray' }}>
                <AppBar position="static" sx={{ backgroundColor: "#34ebd5" }}>
                    <Toolbar>
                        <IconButton color="inherit" onClick={toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1, color: "white" }}>
                            {selectedReport ? selectedReport : "POS Checkout"}
                        </Typography>
                    </Toolbar>
                </AppBar>

                {selectedReport ? (
                    <Paper sx={{ padding: 3, marginTop: 2 }}>
                        <Typography variant="h5">{selectedReport}</Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <Typography variant="body1">
                            This is a placeholder for the {selectedReport}.
                        </Typography>
                    </Paper>
                ) : (
                    <Grid container spacing={2} sx={{ marginTop: 2 }}>
                        <Grid item xs={8}>
                            <Paper sx={{ padding: 2, minHeight: "60vh" }}>
                                <Typography variant="h6">Enter Price & Select Category</Typography>
                                <TextField
                                    label="Enter Price"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    value={manualPrice}
                                    onChange={(e) => setManualPrice(e.target.value)}
                                    sx={{ marginTop: 2, marginBottom: 2 }}
                                />
                                <Grid container spacing={1}>
                                    {categories.map((category) => (
                                        <Grid item xs={4} key={category}>
                                            <Button 
                                                fullWidth 
                                                variant="contained" 
                                                onClick={() => addToCart(category)}
                                            >
                                                {category}
                                            </Button>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper sx={{ padding: 2, minHeight: "60vh" }}>
                                <Typography variant="h6">
                                    <ShoppingCartIcon /> Order Summary
                                </Typography>
                                <Divider sx={{ marginY: 1 }} />
                                {cart.length === 0 ? (
                                    <Typography color="textSecondary">No items added</Typography>
                                ) : (
                                    cart.map((item) => (
                                        <Box key={item.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginY: 1 }}>
                                            <Typography>{item.name} - ${item.price.toFixed(2)}</Typography>
                                            <IconButton color="error" onClick={() => removeFromCart(item.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    ))
                                )}
                                <Divider sx={{ marginY: 1 }} />
                                <Typography variant="h6">Total: ${cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2)}</Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
                                    <Button variant="contained" color="primary" startIcon={<AttachMoneyIcon />}>Cash</Button>
                                    <Button variant="contained" color="secondary" startIcon={<CreditCardIcon />}>Card</Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Box>
    );
}

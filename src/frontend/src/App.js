//npm start everytime

import React, { useState } from "react";
import { Button, TextField, Card, CardContent, Typography, Grid, Container, Drawer, List, ListItem, ListItemText } from "@mui/material";

const LoginPage = ({ onLogin }) => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "10%" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <TextField fullWidth label="Username" margin="normal" />
          <TextField fullWidth label="Password" type="password" margin="normal" />
          <Button fullWidth variant="contained" color="primary" onClick={onLogin} style={{ marginTop: "20px" }}>Login</Button>
          <Grid container justifyContent="space-between" style={{ marginTop: "10px" }}>
            <Button color="secondary">Forgot Password?</Button>
            <Button color="secondary">Create Account</Button>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

const Checkout = ({ onCheckout }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState({});
  
  // Map each item to a specific image filename
  const itemImages = {
    Soda: "/images/soda.jpg",  // Update with actual filenames
    Candy: "/images/candy.jpg",
    Beer: "/images/beer.jpg",
    Lottery: "/images/lottery.jpg",
    Gas: "/images/gas.jpg"
  };

  const items = Object.keys(itemImages);

  const handleCheckout = () => {
    onCheckout(selectedItem, quantity, price[selectedItem]);
    alert(`Thank you for purchasing ${quantity} ${selectedItem}(s).`);
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "5%" }}>
      <Typography variant="h4" gutterBottom>Checkout</Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={4} key={item}>
            <Card style={{ padding: "10px", textAlign: "center" }}>
              <img src={itemImages[item]} alt={item} style={{ width: "100px", height: "100px", marginBottom: "10px" }} />
              <Button fullWidth variant="outlined" onClick={() => setSelectedItem(item)}>
                {item}
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      {selectedItem && (
        <Card style={{ marginTop: "20px", padding: "10px" }}>
          <Typography variant="h6">{selectedItem}</Typography>
          <TextField
            fullWidth
            label="Set Price"
            type="number"
            value={price[selectedItem] || ""}
            onChange={(e) => setPrice({ ...price, [selectedItem]: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleCheckout}>Checkout</Button>
        </Card>
      )}
    </Container>
  );
};


const Reports = ({ reportType, onHome }) => {
  const fakeData = {
    "Sales Report": "Total Sales: $1500", 
    "Gas Sales": "Total Gas Sold: 300 gallons", 
    "Lottery Sales": "Total Lottery Tickets Sold: 200"
  };
  return (
    <Container maxWidth="md" style={{ marginTop: "5%" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button onClick={onHome}>Home</Button>
        </Grid>
      </Grid>
      <Typography variant="h4" gutterBottom>{reportType} Report</Typography>
      <Typography>{fakeData[reportType]}</Typography>
    </Container>
  );
};

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button onClick={() => setMenuOpen(true)}>Menu</Button>
        </Grid>
        {selectedReport && (
          <Grid item>
            <Button onClick={() => setSelectedReport(null)}>Home</Button>
          </Grid>
        )}
      </Grid>
      <Drawer anchor="left" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <List>
          {["Sales Report", "Gas Sales", "Lottery Sales"].map((report) => (
            <ListItem button key={report} onClick={() => { setSelectedReport(report); setMenuOpen(false); }}>
              <ListItemText primary={report} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {selectedReport ? <Reports reportType={selectedReport} onHome={() => setSelectedReport(null)} /> : <Checkout onCheckout={() => {}} />}
    </>
  );
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return loggedIn ? <Dashboard /> : <LoginPage onLogin={() => setLoggedIn(true)} />;
};

export default App;

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data
app.use(express.json());

// Load the initial item data from a JSON file
const initialInventory = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'initial-items.json')));

// Load the current item data from a JSON file
let inventory = [...initialInventory];

app.get('/items', (req, res) => {
  res.json(inventory);
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  inventory.push(newItem);
  saveInventory();
  res.status(201).send('Item added successfully');
});

app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const itemIndex = inventory.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    inventory.splice(itemIndex, 1);
    saveInventory();
    res.send('Item deleted successfully');
  } else {
    res.status(404).send('Item not found');
  }
});

// Helper function to save the inventory to the JSON file
const saveInventory = () => {
  fs.writeFileSync(path.join(__dirname, 'data', 'items.json'), JSON.stringify(inventory, null, 2));
};

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

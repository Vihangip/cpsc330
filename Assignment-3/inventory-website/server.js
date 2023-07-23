const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;
const Item = require('./Item');
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

app.get('/items', (req, res) => {
  Item.find()
    .then(items => {
      res.json(items);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to fetch items' });
    });
});

app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = uuidv4(); // Generate a unique ID for the item

  // Create a new item using the Item model
  Item.create(newItem)
    .then(createdItem => {
      res.status(201).send('Item added successfully');
    })
    .catch(error => {
      console.error('Failed to create item in the database', error);
      res.status(500).send('Internal Server Error');
    });
});



app.delete('/items/:id', (req, res) => {
  const itemId = req.params.id;

  console.log('Deleting item:', itemId);

  // Remove the item from the database by its ID
  Item.findByIdAndRemove(itemId)
    .then(deletedItem => {
      if (!deletedItem) {
        console.error('Item not found');
        res.status(404).send('Item not found');
      } else {
        console.log('Item deleted successfully', deletedItem);
        res.send('Item deleted successfully');
      }
    })
    .catch(error => {
      console.error('Failed to delete item from the database', error);
      res.status(500).send('Internal Server Error');
    });
});



// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle all other routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const MONGODB_URI = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox.ec9hk0v.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });


// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

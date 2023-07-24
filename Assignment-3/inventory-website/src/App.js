
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, selectItem, deleteAllItems } from './redux/actions';
import ItemDetail from './ItemDetail';
import axios from 'axios';
import './App.css';


function App() {
  const selectedItem = useSelector(state => state.selectedItem);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [inventory, setInventory] = useState([]);

  const fetchInventory = () => {
    fetch('/items')
      .then(response => response.json())
      .then(data => {
        setInventory(data);
      })
      .catch(error => console.error(error));
  };

  const fetchItem = (id) => {
    fetch(`/items/${id}`)
      .then(response => response.json())
      .then(data => {
        dispatch(selectItem(data)); // dispatch the received item to the Redux store
      })
      .catch(error => console.error(error));
  };
  
  

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleSubmit = e => {
  e.preventDefault();

  // Validate the form fields
  if (!name || !description || !price) {
    console.error('Name, description, and price are required');
    return;
  }

  const newItem = {
    name,
    description,
    price,
    stock,
    image
  };

  // Make the POST request with the newItem data
  fetch('/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newItem)
  })
    .then(response => {
      if (response.status === 201) {
        setName('');
        setDescription('');
        setPrice('');
        setStock(0);
        setImage('');
        fetchInventory();
      } else {
        console.error('Failed to add item');
      }
    })
    .catch(error => console.error(error));
};


const handleRemove = item => {
  console.log(item);
  const itemId = item._id;

  if (!itemId) {
    console.error('Item ID is missing');
    return;
  }

  console.log('Deleting item:', itemId);

  fetch(`/items/${itemId}`, { method: 'DELETE' })
    .then(response => {
      if (response.status === 200) {
        fetchInventory();
      } else {
        console.error('Failed to delete item wqqq');
      }
    })
    .catch(error => console.error(error));
};


const handleItemClick = item => {
  fetchItem(item._id);
  setShowDialog(true);
};

  const handleDialogClose = () => {
    setShowDialog(false);
  };

  const handleDeleteAllItems = () => {
    dispatch(deleteAllItems());
  };

  return (
    <div className="App">
      <h1>Inventory Management Website</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemName">Item Name:</label>
          <input
            type="text"
            id="itemName"
            placeholder="Item Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="decsription">Description:</label>
          <input
            type="text"
            id="decsription"
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            placeholder="Stock"
            value={stock}
            onChange={e => setStock(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            placeholder="Image URL"
            value={image}
            onChange={e => setImage(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button type="submit">Add Item</button>
          <button type="button" onClick={() => { setName(''); setDescription(''); setPrice(''); setStock(0); setImage(''); }}>
            Clear
          </button>
        </div>
      </form>

      <div className="container">
        <h2>Items</h2>
      </div>
      <div className="item-list">
      {inventory.map(item => (
  <div key={item._id} className="item-card" onClick={() => handleItemClick(item)}>
    <img src={item.image} alt={item.name} width="100" />
    <span className="item-name">{item.name}</span>
    <button type="button" onClick={event => { event.stopPropagation(); handleRemove(item); }}>
      X
    </button>
  </div>
))}

      </div>


      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <ItemDetail
              name={selectedItem.name}
              description={selectedItem.description}
              price={selectedItem.price}
              stock={selectedItem.stock}
            />
            <button type="button" onClick={handleDialogClose}>
              X
            </button>
          </div>
        </div>
      )}

      <div className="delete-all-container">
        <button className="delete-all-button" type="button" onClick={handleDeleteAllItems}>
          Delete All Items
        </button>
      </div>
    </div>
  );
}

export default App;

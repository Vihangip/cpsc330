import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, selectItem, deleteAllItems } from './redux/actions';
import ItemDetail from './ItemDetail';
import './App.css';


function App() {
const inventory = useSelector(state => state.inventory);
const selectedItem = useSelector(state => state.selectedItem);
const dispatch = useDispatch();
const [name, setName] = useState('');
const [description, setDescription] = useState('');
const [price, setPrice] = useState('');
const [stock, setStock] = useState(0);
const [image, setImage] = useState('');
const [showDialog, setShowDialog] = useState(false);

const handleSubmit = e => {
  e.preventDefault();
  const newItem = {
    name,
    description,
    price,
    stock,
    image
  };
  dispatch(addItem(newItem));
  setName('');
  setDescription('');
  setPrice('');
  setStock(0);
  setImage('');
};

const handleRemove = item => {
  dispatch(removeItem(item));
};

const handleItemClick = item => {
  dispatch(selectItem(item));
  setShowDialog(true);
};

const handleDialogClose = () => {
  setShowDialog(false);
};

const handleDeleteAllItems = () => {
  dispatch(deleteAllItems());
};

return (
  <div>
    <h1>Inventory Management Website</h1>
    <form onSubmit={handleSubmit}>
    <div>
      <label id="itemName">Item Name:</label>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
    </div>
    <div>
      <label id="decsription">Description:</label>
      <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
    </div>
    <div>
      <label id="price">Price:</label>
      <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
    </div>
    <div>
      <label id="stock">Stock:</label>
      <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={e => setStock(parseInt(e.target.value))}
        />
    </div>
    <div>
      <label id="image">Image URL:</label>
      <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
    </div>
    <div className='form-buttons'>
      <button type="submit">Add Item</button>
      <button type="button" onClick={() => {setName(''); setDescription(''); setPrice(''); setStock(''); setImage('');}}>Clear</button>
    </div>
      
    </form>

    <div className="container">
      <h2>Items</h2>
    </div>
    <div className="item-list">
      {inventory.map(item => (
        <div key={item.name} className="item-card" onClick={() => handleItemClick(item)}>
          <img src={item.image} alt={item.name} width="100" />
          <span className="item-name">{item.name}</span>
          <button type="button" onClick={(event) => { event.stopPropagation(); handleRemove(item); }}>
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

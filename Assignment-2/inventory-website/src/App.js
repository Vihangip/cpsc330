import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, selectItem } from './redux/actions';
import ItemDetail from './ItemDetail';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  const inventory = useSelector(state => state.inventory);
  const selectedItem = useSelector(state => state.selectedItem);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    const newItem = {
      name,
      description,
      price,
      image
    };
    dispatch(addItem(newItem));
    setName('');
    setDescription('');
    setPrice('');
    setImage('');
  };

  const handleRemove = item => {
    dispatch(removeItem(item));
  };

  const handleItemClick = item => {
    dispatch(selectItem(item));
    setModalIsOpen(true);
  };

  return (
    <div>
      <h1>Inventory Website</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
        />
        <button type="submit">Add Item</button>
        <button type="button" onClick={() => {setName(''); setDescription(''); setPrice(''); setImage('');}}>Clear</button>
      </form>

      <h2>Items</h2>
      <ul>
        {inventory.map(item => (
          <li key={item.name} onClick={() => handleItemClick(item)}>
            <img src={item.image} alt={item.name} width="100" />
            <span>{item.name}</span>
            <button type="button" onClick={() => handleRemove(item)}>
              X
            </button>
          </li>
        ))}
      </ul>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        {selectedItem && (
          <ItemDetail
            name={selectedItem.name}
            description={selectedItem.description}
            price={selectedItem.price}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;

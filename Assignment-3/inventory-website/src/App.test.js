import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, waitFor, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import nock from 'nock';
import App from './App';
import rootReducer from './redux/reducers'; // Assuming you have a rootReducer

// Initial state for the Redux store
const initialState = {
  selectedItem: null
};

test('add a new item', async () => {
  const newItem = {
    name: 'New Item',
    description: 'Test Description',
    price: '10',
    stock: 5,
    image: 'https://image.test.com'
  };

  const serverResponse = { ...newItem, _id: '1' }; // Assuming server adds _id

  // Set up the mock server response
  nock('http://localhost')
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/items', newItem)
    .reply(201, serverResponse)
    .get('/items')
    .reply(200, [serverResponse]);

  const store = createStore(rootReducer, initialState);

  // Render the App component
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Fill out the form
  fireEvent.change(screen.getByPlaceholderText('Item Name'), {
    target: { value: newItem.name }
  });
  fireEvent.change(screen.getByPlaceholderText('Description'), {
    target: { value: newItem.description }
  });
  fireEvent.change(screen.getByPlaceholderText('Price'), {
    target: { value: newItem.price }
  });
  fireEvent.change(screen.getByPlaceholderText('Stock'), {
    target: { value: newItem.stock }
  });
  fireEvent.change(screen.getByPlaceholderText('Image URL'), {
    target: { value: newItem.image }
  });

  // Submit the form
  fireEvent.click(screen.getByText('Add Item'));

  // Check that the form is cleared
  await waitFor(() => {
    expect(screen.getByPlaceholderText('Item Name')).toHaveValue('');
  });
  await waitFor(() => {
    expect(screen.getByPlaceholderText('Description')).toHaveValue('');
  });
  await waitFor(() => {
    expect(screen.getByPlaceholderText('Price')).toHaveValue('');
  });
  await waitFor(() => {
    expect(screen.getByPlaceholderText('Stock')).toHaveValue('');
  });
  await waitFor(() => {
    expect(screen.getByPlaceholderText('Image URL')).toHaveValue('');
  });

  // Check that the new item is added to the inventory
  await waitFor(() => {
    expect(screen.getByText(newItem.name)).toBeInTheDocument();
  });
});

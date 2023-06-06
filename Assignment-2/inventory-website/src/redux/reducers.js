const initialState = {
  inventory: [
    { name: 'Item 1', description: 'Description 1', price: '$10', image: 'https://example.com/image1.jpg' },
    { name: 'Item 2', description: 'Description 2', price: '$20', image: 'https://example.com/image2.jpg' },
    { name: 'Item 3', description: 'Description 3', price: '$30', image: 'https://example.com/image3.jpg' }
  ],
  selectedItem: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        inventory: [...state.inventory, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        inventory: state.inventory.filter(item => item !== action.payload)
      };
    case 'SELECT_ITEM':
      return {
        ...state,
        selectedItem: action.payload
      };
    default:
      return state;
  }
};

export default reducer;

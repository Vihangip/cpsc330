const initialState = {
  inventory: [
    { name: 'Apple', description: 'Fruit', price: '$0.99', stock: '400', image: 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg' },
    { name: 'Froot Loops', description: 'Cereal', price: '$5.99', stock: '0', image: 'https://assets.shop.loblaws.ca/products/20591279/b2/en/front/20591279_front_a06_@2.png' },
    { name: 'Carrot', description: 'Vegetable', price: '$0.56', stock: '37', image: 'https://i5.walmartimages.ca/images/Enlarge/686/686/6000198686686.jpg' }
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
    case 'DELETE_ALL_ITEMS':
      return {
         ...state,
        inventory: []
      };
    default:
      return state;
  }
};

export default reducer;

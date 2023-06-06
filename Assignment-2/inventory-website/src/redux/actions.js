export const addItem = newItem => {
  return {
    type: 'ADD_ITEM',
    payload: newItem
  };
};

export const removeItem = item => {
  return {
    type: 'REMOVE_ITEM',
    payload: item
  };
};

export const selectItem = item => {
  return {
    type: 'SELECT_ITEM',
    payload: item
  };
};

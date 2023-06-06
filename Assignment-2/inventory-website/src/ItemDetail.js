import React from 'react';

function ItemDetail({ name, description, price }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Description: {description}</p>
      <p>Price: {price}</p>
    </div>
  );
}

export default ItemDetail;

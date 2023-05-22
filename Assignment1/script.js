// The base of the following code was generated by ChatGPT and was edited by me according to the requirements and my preferences

// Initial items stored as a JSON string
const initialItems = '[{"name":"Apple","description":"Fruit","price":0.99,"stock":10,"image":"https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg"}, {"name":"Froot Loops","description":"Cereal","price":5.99,"stock":5,"image":"https://assets.shop.loblaws.ca/products/20591279/b2/en/front/20591279_front_a06_@2.png"}, {"name":"Carrot","description":"Vegetable","price":0.56,"stock":15,"image":"https://i5.walmartimages.ca/images/Enlarge/686/686/6000198686686.jpg"}]';

// Parse the JSON string into a JS object
const items = JSON.parse(initialItems);

// Function to add an item to the list
function addItem() {
  const itemName = document.getElementById('item-name').value;
  const itemDescription = document.getElementById('item-description').value;
  const itemPrice = parseFloat(document.getElementById('item-price').value);
  const itemStock = parseInt(document.getElementById('item-stock').value);
  const itemImage = document.getElementById('item-image').value;

  const newItem = { name: itemName, description: itemDescription, price: itemPrice, stock: itemStock, image: itemImage };
  items.push(newItem);

  updateItemList();
  clearForm();
}

// Function to clear the form inputs
function clearForm() {
  document.getElementById('item-name').value = '';
  document.getElementById('item-description').value = '';
  document.getElementById('item-price').value = '';
  document.getElementById('item-stock').value = '';
  document.getElementById('item-image').value = '';
}

// Function to delete all items from the list
function deleteAllItems() {
  items.length = 0;
  updateItemList();
}

// Function to update the item list on the page
function updateItemList() {
  const itemList = document.getElementById('item-list');
  itemList.innerHTML = '';

  items.forEach((item, index) => {
    const itemCard = document.createElement('div');
    itemCard.className = 'item-card';

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;

    const itemDescription = document.createElement('p');
    itemDescription.textContent = item.description;

    const itemPrice = document.createElement('p');
    itemPrice.textContent = '$' + item.price.toFixed(2);

    const itemImage = document.createElement('img');
    itemImage.src = item.image;

    const stockContainer = document.createElement('div');
    stockContainer.className = 'stock-container';

    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    decrementButton.addEventListener('click', function() {
      decrementStock(index);
    });

    const itemStock = document.createElement('input');
    itemStock.type = 'number';
    itemStock.value = item.stock;
    itemStock.addEventListener('change', function() {
      updateStock(index, parseInt(itemStock.value));
    });

    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    incrementButton.addEventListener('click', function() {
      incrementStock(index);
    });

    stockContainer.appendChild(decrementButton);
    stockContainer.appendChild(itemStock);
    stockContainer.appendChild(incrementButton);

    itemCard.appendChild(itemName);
    itemCard.appendChild(itemDescription);
    itemCard.appendChild(itemPrice);
    itemCard.appendChild(itemImage);
    itemCard.appendChild(stockContainer);

    itemList.appendChild(itemCard);
  });
}


// Function to decrement the stock of an item
function decrementStock(index) {
  const currentStock = items[index].stock;
  if (currentStock > 0) {
    items[index].stock = currentStock - 1;
    updateItemList();
  }
}

// Function to increment the stock of an item
function incrementStock(index) {
  items[index].stock += 1;
  updateItemList();
}

// Loads the initial items to the page
updateItemList();

// Function to delete an item from the list
function deleteItem(index) {
  items.splice(index, 1);
  updateItemList();
}

// Add event listener to the form submit event
document.getElementById('item-form').addEventListener('submit', function(e) {
  e.preventDefault();
  addItem();
});

// Initial items stored as a JSON string
const initialItems = '[{"name":"Apple","description":"Fruit","price":0.99,"image":"https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg","stock":10}, {"name":"Froot Loops","description":"Cereal","price":5.99,"image":"https://assets.shop.loblaws.ca/products/20591279/b2/en/front/20591279_front_a06_@2.png","stock":5}, {"name":"Carrot","description":"Vegetable","price":0.56,"image":"https://i5.walmartimages.ca/images/Enlarge/686/686/6000198686686.jpg","stock":7}]';
// Parse the JSON string into a JS object
const items = JSON.parse(initialItems);

// Function to add an item to the list
function addItem() {
  const itemName = document.getElementById('item-name').value;
  const itemDescription = document.getElementById('item-description').value;
  const itemPrice = parseFloat(document.getElementById('item-price').value);
  const itemImage = document.getElementById('item-image').value;

  const newItem = { name: itemName, description: itemDescription, price: itemPrice, image: itemImage };
  items.push(newItem);

  updateItemList();
  clearForm();
}

// Function to clear the form inputs
function clearForm() {
  document.getElementById('item-name').value = '';
  document.getElementById('item-description').value = '';
  document.getElementById('item-price').value = '';
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

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteItem(index);
    });

    itemCard.appendChild(itemName);
    itemCard.appendChild(itemDescription);
    itemCard.appendChild(itemPrice);
    itemCard.appendChild(itemImage);
    itemCard.appendChild(deleteButton);

    itemList.appendChild(itemCard);
  });
}

// Function to delete an item from the list
function deleteItem(index) {
  items.splice(index, 1);
  updateItemList();
}

// Loads the initial items to the page
updateItemList();

// Add event listener to the form submit event
document.getElementById('item-form').addEventListener('submit', function(e) {
  e.preventDefault();
  addItem();
});
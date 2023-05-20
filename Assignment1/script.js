// Initial items stored as a JSON string
const initialItems = '[{"name":"Item 1","description":"Description 1","price":10.99,"image":"https://example.com/image1.jpg"},{"name":"Item 2","description":"Description 2","price":19.99,"image":"https://example.com/image2.jpg"}]';

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

  items.forEach(item => {
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

    itemCard.appendChild(itemName);
    itemCard.appendChild(itemDescription);
    itemCard.appendChild(itemPrice);
    itemCard.appendChild(itemImage);

    itemList.appendChild(itemCard);
  });
}

// Add event listener to the form submit event
document.getElementById('item-form').addEventListener('submit', function(e) {
  e.preventDefault();
  addItem();
});

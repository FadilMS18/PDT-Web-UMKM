// Data produk
var products = [
  {
    id: 1,
    name: "Ramen Klasik Special",
    size: "Large",
    color: "Extra Topping",
    price: 145000,
    quantity: 1,
    image: "./../assets/IMG/123c78e7-2e39-461d-80ea-be1c5ebb6dda.png",
  },
  {
    id: 2,
    name: "Burger 2 Lantai Premium",
    size: "Medium",
    color: "Extra Cheese",
    price: 180000,
    quantity: 1,
    image: "./../assets/IMG/66d86c69-d20c-4117-a72a-e1ed7481c12e.png",
  },
  {
    id: 3,
    name: "Pizza Menarik Deluxe",
    size: "Large",
    color: "All Topping",
    price: 240000,
    quantity: 1,
    image: "./../assets/IMG/6dc329a3-9645-4b52-ade7-a629cbea0d81.png",
  },
];

// Format currency
function formatCurrency(amount) {
  return "Rp " + amount.toLocaleString("id-ID");
}

// Create cart item element
function createCartItem(product) {
  const cartItem = document.createElement("div");
  cartItem.className = "cart-item";
  cartItem.setAttribute("data-id", product.id);

  // Item image
  const itemImage = document.createElement("img");
  itemImage.className = "item-image";
  itemImage.src = product.image;

  // Item details
  const itemDetails = document.createElement("div");
  itemDetails.className = "item-details";

  const itemName = document.createElement("h3");
  itemName.textContent = product.name;

  const itemSpecs = document.createElement("div");
  itemSpecs.className = "item-specs";
  itemSpecs.innerHTML =
    "<strong>Ukuran:</strong> " +
    product.size +
    "<br><strong>Varian:</strong> " +
    product.color;

  const itemPrice = document.createElement("div");
  itemPrice.className = "item-price";
  itemPrice.textContent = formatCurrency(product.price);

  itemDetails.appendChild(itemName);
  itemDetails.appendChild(itemSpecs);
  itemDetails.appendChild(itemPrice);

  // Item actions
  const itemActions = document.createElement("div");
  itemActions.className = "item-actions";

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "🗑️";
  deleteBtn.addEventListener("click", function () {
    removeItem(product.id);
  });

  const quantityControl = document.createElement("div");
  quantityControl.className = "quantity-control";

  const decreaseBtn = document.createElement("button");
  decreaseBtn.textContent = "−";
  decreaseBtn.addEventListener("click", function () {
    decreaseQuantity(product.id);
  });

  const quantityInput = document.createElement("input");
  quantityInput.type = "text";
  quantityInput.value = product.quantity;
  quantityInput.readOnly = true;

  const increaseBtn = document.createElement("button");
  increaseBtn.textContent = "+";
  increaseBtn.addEventListener("click", function () {
    increaseQuantity(product.id);
  });

  quantityControl.appendChild(decreaseBtn);
  quantityControl.appendChild(quantityInput);
  quantityControl.appendChild(increaseBtn);

  itemActions.appendChild(deleteBtn);
  itemActions.appendChild(quantityControl);

  // Append all parts
  cartItem.appendChild(itemImage);
  cartItem.appendChild(itemDetails);
  cartItem.appendChild(itemActions);

  return cartItem;
}

// Render cart items
function renderCart() {
  var cartContainer = document.getElementById("cartItems");

  // Clear existing items
  while (cartContainer.firstChild) {
    cartContainer.removeChild(cartContainer.firstChild);
  }

  // Add all products
  for (var i = 0; i < products.length; i++) {
    var cartItem = createCartItem(products[i]);
    cartContainer.appendChild(cartItem);
  }

  updateOrderSummary();
}

// Update order summary
function updateOrderSummary() {
  let subtotal = 0;
  products.forEach(function (product) {
    subtotal += product.price * product.quantity;
  });

  const discount = Math.round(subtotal * 0.2);
  const deliveryFee = 15000;
  const total = subtotal - discount + deliveryFee;

  document.getElementById("subtotal").textContent = formatCurrency(subtotal);
  document.getElementById("discount").textContent =
    "-" + formatCurrency(discount);
  document.getElementById("total").textContent = formatCurrency(total);
}

// Increase quantity
function increaseQuantity(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products[i].quantity++;
      renderCart();
      break;
    }
  }
}

// Decrease quantity
function decreaseQuantity(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      if (products[i].quantity > 1) {
        products[i].quantity--;
        renderCart();
      }
      break;
    }
  }
}

// Remove item
function removeItem(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      products.splice(i, 1);
      renderCart();
      break;
    }
  }
}

// Apply promo code
function applyPromo() {
  var promoCode = document.getElementById("promoCode").value;
  if (promoCode.trim()) {
    alert('Kode promo "' + promoCode + '" berhasil diterapkan!');
  }
}

// Initialize
renderCart();

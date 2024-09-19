let cart = [];

function addToCart(product, price) {
  cart.push({ product, price });
  updateCart();
  saveCart();
  showNotification(`${product} added to cart!`);
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  
  if (cartItems) {
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.product} - $${item.price.toFixed(2)}
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(li);
      total += item.price;
    });

    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  }
  
  updateCartIcon();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  saveCart();
  showNotification('Item removed from cart');
}

function updateCartIcon() {
  const cartIcon = document.getElementById('cart-icon');
  if (cartIcon) {
    cartIcon.textContent = cart.length;
  }
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'notification';
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add('show');
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 2000);
  }, 100);
}

function openModal(details) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close" onclick="closeModal()">&times;</button>
      <p>${details}</p>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 10);
}

function closeModal() {
  const modal = document.querySelector('.modal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

function saveCart() {
  localStorage.setItem('donutCart', JSON.stringify(cart));
}

function loadCart() {
  const savedCart = localStorage.getItem('donutCart');
  if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCart();
  }
}

// Call loadCart on page load
document.addEventListener('DOMContentLoaded', function() {
  loadCart();
});
// PRODUCTS (same)
let products = [
  { id: 1, name: "Celestial Hoop Earrings", price: 1299, category: "jewellery", img: "https://picsum.photos/id/201/600/600" },
  { id: 2, name: "Minimal Chain Necklace", price: 899, category: "jewellery", img: "https://picsum.photos/id/237/600/600" },
  { id: 3, name: "Oversized Linen Shirt", price: 2199, category: "fashion", img: "https://picsum.photos/id/1011/600/600" },
  { id: 4, name: "Wide Leg Trousers", price: 1899, category: "fashion", img: "https://picsum.photos/id/106/600/600" },
  { id: 5, name: "Gold Plated Bangle Set", price: 1499, category: "jewellery", img: "https://picsum.photos/id/180/600/600" },
  { id: 6, name: "Elegant Silk Kurta", price: 2599, category: "fashion", img: "https://picsum.photos/id/201/600/600" }
];

// STORAGE
let cart = JSON.parse(localStorage.getItem('svorq_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('svorq_wishlist')) || [];

// SAVE
function saveCart() {
  localStorage.setItem('svorq_cart', JSON.stringify(cart));
  updateCartCount();
}

function saveWishlist() {
  localStorage.setItem('svorq_wishlist', JSON.stringify(wishlist));
  updateWishlistCount();
}

// COUNTS
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('sidebar-cart-count').textContent = count;
}

function updateWishlistCount() {
  document.getElementById('wishlist-count').textContent = wishlist.length;
}

// TOAST
function showToast(message) {
  let toast = document.createElement("div");
  toast.innerText = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#000";
  toast.style.color = "#fff";
  toast.style.padding = "10px 20px";
  toast.style.borderRadius = "30px";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// PRODUCTS
function renderProducts(filteredProducts = products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  filteredProducts.forEach(product => {
    const isWishlisted = wishlist.some(w => w.id === product.id);

    grid.innerHTML += `
      <div class="product-card">
        <img src="${product.img}">
        <div class="product-info">
          <h3>${product.name}</h3>
          <p class="price">₹${product.price}</p>

          <div style="display:flex; gap:10px; justify-content:center; margin-top:12px;">
            <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            <button onclick="quickView(${product.id})">👁️</button>
            <button onclick="toggleWishlist(${product.id})" style="color:${isWishlisted ? '#e74c3c' : '#ccc'};">❤️</button>
          </div>
        </div>
      </div>
    `;
  });
}

// CART
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });

  saveCart();
  showToast(`${product.name} added to cart`);
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items');
  container.innerHTML = '';

  if (cart.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Your cart is empty 🛒</p>";
    document.getElementById('cart-total').textContent = "₹0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <div style="flex:1;">
          <h4>${item.name}</h4>
          <p>₹${item.price} × ${item.quantity}</p>
          <div>
            <button onclick="changeQuantity(${index}, -1)">–</button>
            <span style="margin:0 10px;">${item.quantity}</span>
            <button onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${index})">×</button>
      </div>
    `;
  });

  let delivery = total > 1999 ? 0 : 99;
  let finalTotal = total + delivery;

  document.getElementById('cart-total').textContent = `₹${finalTotal}`;
}

function changeQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity < 1) cart.splice(index, 1);
  saveCart();
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function clearCart() {
  if (confirm('Clear entire cart?')) {
    cart = [];
    saveCart();
    renderCart();
  }
}

// CHECKOUT
function checkout() {
  if (cart.length === 0) return showToast("Cart is empty!");

  let total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  let delivery = total > 1999 ? 0 : 99;
  let finalTotal = total + delivery;

  let message = `✨ *SVORQ ORDER* ✨\n\n`;

  cart.forEach(item => {
    message += `• ${item.name}\n  ₹${item.price} × ${item.quantity}\n`;
  });

  message += `\nSubtotal: ₹${total}`;
  message += `\nDelivery: ₹${delivery}`;
  message += `\n*Total: ₹${finalTotal}*`;

  window.open(`https://wa.me/918309304255?text=${encodeURIComponent(message)}`, '_blank');
}

// WISHLIST
function toggleWishlist(id) {
  const product = products.find(p => p.id === id);
  const index = wishlist.findIndex(w => w.id === id);

  if (index > -1) wishlist.splice(index, 1);
  else wishlist.push(product);

  saveWishlist();
  renderProducts();
}

function showWishlist() {
  if (wishlist.length === 0) return showToast("Wishlist is empty!");
  showToast("Wishlist: " + wishlist.map(w => w.name).join(", "));
}

// MODAL
function quickView(id) {
  const product = products.find(p => p.id === id);

  document.getElementById('modal-body').innerHTML = `
    <img src="${product.img}" style="width:100%; border-radius:12px;">
    <h2>${product.name}</h2>
    <p class="price">₹${product.price}</p>
    <button class="btn-primary" onclick="addToCart(${product.id}); closeModal();">Add to Cart</button>
  `;

  document.getElementById('quick-view-modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('quick-view-modal').style.display = 'none';
}

// SEARCH
function searchProducts() {
  const term = document.getElementById('search-input').value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(term)));
}

// FILTER
function filterCategory(cat) {
  if (cat === 'all') return renderProducts(products);
  renderProducts(products.filter(p => p.category === cat));
}

// 👉 PWA INSTALL (NEW)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

function installApp() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
  } else {
    showToast("Tap Share → Add to Home Screen 📱");
  }
}

// INIT
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  updateWishlistCount();
});

// PRODUCTS (UPDATED PREMIUM)
let products = [

  {
    id: 1,
    name: "Emerald Luxe Layered Necklace",
    price: 1399,
    originalPrice: 2499,
    badge: "Bestseller",
    category: "pendant",
    img: "necklace1.jpg"
  },

  {
    id: 2,
    name: "Marine Charm Statement Necklace",
    price: 1499,
    originalPrice: 2799,
    badge: "Trending",
    category: "statement",
    img: "ocean1.jpg"
  },

  {
    id: 3,
    name: "Celestial Glow Hoops",
    price: 999,
    originalPrice: 1999,
    badge: "Hot",
    category: "earrings",
    img: "star1.jpg"
  }

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
  toast.style.padding = "12px 22px";
  toast.style.borderRadius = "30px";
  toast.style.zIndex = "9999";

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}


// PRODUCTS DISPLAY (UPDATED PREMIUM)
function renderProducts(filteredProducts = products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  filteredProducts.forEach(product => {
    const isWishlisted = wishlist.some(w => w.id === product.id);

    grid.innerHTML += `
      <div class="product-card">

        ${product.badge ? `<div class="badge">${product.badge}</div>` : ""}

        <img src="${product.img}">

        <div class="product-info">
          <h3>${product.name}</h3>

          <p class="price">
            ₹${product.price}
            ${product.originalPrice ? `<span class="old-price">₹${product.originalPrice}</span>` : ""}
          </p>

          <p class="premium-line">Premium Quality • Long Lasting Shine ✨</p>

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


// FILTER (UPDATED FOR NEW CATEGORIES)
function filterCategory(cat) {
  if (cat === 'all') return renderProducts(products);
  renderProducts(products.filter(p => p.category === cat));
}


// SEARCH
function searchProducts() {
  const term = document.getElementById('search-input').value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(term)));
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


// INIT
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  updateWishlistCount();
});

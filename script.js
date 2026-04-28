// PRODUCTS
let products = [
  {
    id: 1,
    name: "Emerald Luxe Layered Necklace",
    price: 1399,
    originalPrice: 2499,
    badge: "Bestseller",
    category: "layered",
    images: ["necklace1.jpg"],
    description: "Elegant layered necklace with premium anti-tarnish finish."
  },
  {
    id: 2,
    name: "Marine Charm Statement Necklace",
    price: 1499,
    originalPrice: 2799,
    badge: "Trending",
    category: "statement",
    images: ["ocean1.jpg"],
    description: "Ocean-inspired statement necklace."
  },
  {
    id: 3,
    name: "Celestial Glow Hoops",
    price: 999,
    originalPrice: 1999,
    badge: "Hot",
    category: "earrings",
    images: ["star1.jpg"],
    description: "Minimal celestial hoops."
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
  const el = document.getElementById('cart-count');
  if (el) el.textContent = count;
}

function updateWishlistCount() {
  const el = document.getElementById('wishlist-count');
  if (el) el.textContent = wishlist.length;
}


// TOAST
function showToast(msg) {
  const t = document.createElement("div");
  t.innerText = msg;

  t.style.position = "fixed";
  t.style.bottom = "20px";
  t.style.left = "50%";
  t.style.transform = "translateX(-50%)";
  t.style.background = "#000";
  t.style.color = "#fff";
  t.style.padding = "10px 20px";
  t.style.borderRadius = "30px";
  t.style.zIndex = "9999";

  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}


// WISHLIST
function toggleWishlist(id) {
  const exists = wishlist.find(item => item.id === id);

  if (exists) {
    wishlist = wishlist.filter(item => item.id !== id);
    showToast("Removed from wishlist");
  } else {
    const product = products.find(p => p.id === id);
    wishlist.push(product);
    showToast("Added to wishlist ❤️");
  }

  saveWishlist();
  renderProducts();
}


// PRODUCT PAGE
function openProduct(id) {
  const product = products.find(p => p.id === id);
  localStorage.setItem("selected_product", JSON.stringify(product));
  window.location.href = "./product.html";
}


// RENDER PRODUCTS
function renderProducts(list = products) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = "";

  list.forEach(product => {
    const isWishlisted = wishlist.some(w => w.id === product.id);

    grid.innerHTML += `
      <div class="product-card">

        ${product.badge ? `<div class="badge">${product.badge}</div>` : ""}

        <div class="wishlist-icon ${isWishlisted ? 'active' : ''}"
          onclick="event.stopPropagation(); toggleWishlist(${product.id})">
          ♥
        </div>

        <img src="${product.images[0]}" onclick="openProduct(${product.id})">

        <div class="product-info">
          <h3>${product.name}</h3>

          <p class="price">
            ₹${product.price}
            <span class="old-price">₹${product.originalPrice}</span>
          </p>

          <button class="btn-primary"
            onclick="event.stopPropagation(); addToCart(${product.id})">
            Add to Cart
          </button>
        </div>

      </div>
    `;
  });
}


// CART
function addToCart(id) {
  const p = products.find(x => x.id === id);
  const existing = cart.find(x => x.id === id);

  if (existing) existing.quantity++;
  else cart.push({ ...p, quantity: 1 });

  saveCart();
  showToast("Added to cart 🛒");
}


// FILTER
function filterCategory(cat) {
  if (cat === 'all') renderProducts(products);
  else renderProducts(products.filter(p => p.category === cat));
}


// DROPDOWN
function toggleDropdown() {
  const menu = document.getElementById("dropdown-menu");
  if (menu) menu.classList.toggle("show");
}


// LOADER FIX
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = "none";
  }
});


// INIT
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  updateWishlistCount();
});

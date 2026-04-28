// 🔥 PRODUCTS
let products = [
  {
    id: 1,
    name: "Emerald Luxe Layered Necklace",
    price: 1399,
    originalPrice: 2499,
    badge: "Bestseller",
    category: "layered",
    images: ["necklace1.jpg", "necklace2.jpg", "necklace3.jpg", "necklace4.jpg"],
    description: "Elegant layered necklace with premium anti-tarnish finish."
  },
  {
    id: 2,
    name: "Marine Charm Statement Necklace",
    price: 1499,
    originalPrice: 2799,
    badge: "Trending",
    category: "statement",
    images: ["ocean1.jpg", "ocean2.jpg", "ocean3.jpg", "ocean4.jpg"],
    description: "Ocean-inspired statement necklace with premium shine."
  },
  {
    id: 3,
    name: "Celestial Glow Hoops",
    price: 999,
    originalPrice: 1999,
    badge: "Hot",
    category: "earrings",
    images: ["star1.jpg"],
    description: "Minimal celestial hoops with long-lasting polish."
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

  const cartEl = document.getElementById('cart-count');
  const sidebarEl = document.getElementById('sidebar-cart-count');

  if (cartEl) cartEl.textContent = count;
  if (sidebarEl) sidebarEl.textContent = count;
}

function updateWishlistCount() {
  const wishEl = document.getElementById('wishlist-count');
  if (wishEl) wishEl.textContent = wishlist.length;
}

// ✅ TOAST FIXED
function showToast(msg) {
  let t = document.createElement("div");
  t.innerText = msg;
  t.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #000;
    color: #fff;
    padding: 10px 20px;
    border-radius: 30px;
    z-index: 9999;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

// ❤️ WISHLIST
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

// 🔥 OPEN PRODUCT
function openProduct(id) {
  const product = products.find(p => p.id === id);

  if (!product) {
    alert("Product not found ❌");
    return;
  }

  localStorage.setItem("selected_product", JSON.stringify(product));
  window.location.href = "./product.html";
}

// ✅ PRODUCT DISPLAY FIXED
function renderProducts(filteredProducts = products) {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  grid.innerHTML = '';

  filteredProducts.forEach(product => {
    const isWishlisted = wishlist.some(w => w.id === product.id);

    grid.innerHTML += `
      <div class="product-card">

        ${product.badge ? `<div class="badge">${product.badge}</div>` : ""}

        <!-- ❤️ WISHLIST -->
        <div class="wishlist-icon ${isWishlisted ? 'active' : ''}"
             onclick="event.stopPropagation(); toggleWishlist(${product.id})">
          ♥
        </div>

        <!-- PRODUCT CLICK -->
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
  if (cat === 'all') return renderProducts(products);
  renderProducts(products.filter(p => p.category === cat));
}

// SEARCH
function searchProducts() {
  const input = document.getElementById('search-input');
  if (!input) return;

  const term = input.value.toLowerCase();
  renderProducts(products.filter(p =>
    p.name.toLowerCase().includes(term)
  ));
}

// DROPDOWN
function toggleDropdown() {
  const menu = document.getElementById("dropdown-menu");
  if (menu) menu.classList.toggle("show");
}

// LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (loader) {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.pointerEvents = "none";
  }
});

// INIT
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  updateWishlistCount();
});

// 🔥 PRODUCTS
let products = [

  {
    id: 1,
    name: "Emerald Luxe Layered Necklace",
    price: 1399,
    originalPrice: 2499,
    badge: "Bestseller",
    category: "layered",
    images: ["necklace1.jpg", "necklace2.jpg", "necklace3.jpg", "necklace4.jpg"]
  },

  {
    id: 2,
    name: "Marine Charm Statement Necklace",
    price: 1499,
    originalPrice: 2799,
    badge: "Trending",
    category: "statement",
    images: ["ocean1.jpg", "ocean2.jpg", "ocean3.jpg", "ocean4.jpg"]
  },

  {
    id: 3,
    name: "Celestial Glow Hoops",
    price: 999,
    originalPrice: 1999,
    badge: "Hot",
    category: "earrings",
    images: ["star1.jpg"]
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
function showToast(msg) {
  let t = document.createElement("div");
  t.innerText = msg;
  t.style.cssText = `
    position:fixed;bottom:20px;left:50%;
    transform:translateX(-50%);
    background:#000;color:#fff;
    padding:10px 20px;border-radius:30px;
    z-index:9999;
  `;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}


// ❤️ WISHLIST TOGGLE
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
  renderProducts(); // refresh UI
}


// 🔥 PRODUCT DISPLAY
function renderProducts(filteredProducts = products) {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';

  filteredProducts.forEach(product => {

    const isWishlisted = wishlist.some(w => w.id === product.id);

    grid.innerHTML += `
      <div class="product-card">

        ${product.badge ? `<div class="badge">${product.badge}</div>` : ""}

        <!-- ❤️ HEART -->
        <div onclick="toggleWishlist(${product.id})"
             style="position:absolute;top:10px;right:10px;
             font-size:18px;cursor:pointer;
             color:${isWishlisted ? 'red' : '#ccc'};">
          ♥
        </div>

        <img src="${product.images[0]}" onclick="quickView(${product.id})">

        <div class="product-info">
          <h3>${product.name}</h3>

          <p class="price">
            ₹${product.price}
            <span class="old-price">₹${product.originalPrice}</span>
          </p>

          <p class="premium-line">
            Waterproof • Anti Tarnish • Premium Finish ✨
          </p>

          <button class="btn-primary" onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
}


// 🔥 QUICK VIEW (WITH WISHLIST)
function quickView(id) {
  const product = products.find(p => p.id === id);
  const isWishlisted = wishlist.some(w => w.id === id);

  document.getElementById('modal-body').innerHTML = `
    <div class="slider">

      <button class="slider-btn left" onclick="prevSlide()">‹</button>
      <img id="slider-img" src="${product.images[0]}">
      <button class="slider-btn right" onclick="nextSlide()">›</button>

    </div>

    <div class="thumbnails">
      ${product.images.map((img, i) => `
        <img src="${img}" onclick="goSlide(${i})">
      `).join('')}
    </div>

    <h2>${product.name}</h2>

    <p class="price">
      ₹${product.price}
      <span class="old-price">₹${product.originalPrice}</span>
    </p>

    <p class="premium-line">
      ✔ Waterproof • ✔ Anti Tarnish • ✔ Premium Steel
    </p>

    <div style="display:flex;gap:10px;margin-top:15px;">
      <button class="btn-primary" onclick="addToCart(${product.id})">
        Add to Cart
      </button>

      <button onclick="toggleWishlist(${product.id})"
        style="border:none;font-size:20px;cursor:pointer;
        color:${isWishlisted ? 'red' : '#ccc'};">
        ♥
      </button>
    </div>
  `;

  window.currentProduct = product;
  window.currentIndex = 0;

  document.getElementById('quick-view-modal').style.display = 'flex';
}


// SLIDER
function nextSlide() {
  let p = window.currentProduct;
  window.currentIndex = (window.currentIndex + 1) % p.images.length;
  document.getElementById("slider-img").src = p.images[window.currentIndex];
}

function prevSlide() {
  let p = window.currentProduct;
  window.currentIndex = (window.currentIndex - 1 + p.images.length) % p.images.length;
  document.getElementById("slider-img").src = p.images[window.currentIndex];
}

function goSlide(i) {
  window.currentIndex = i;
  document.getElementById("slider-img").src = window.currentProduct.images[i];
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
  const term = document.getElementById('search-input').value.toLowerCase();
  renderProducts(products.filter(p => p.name.toLowerCase().includes(term)));
}


// MODAL CLOSE
function closeModal() {
  document.getElementById('quick-view-modal').style.display = 'none';
}


// 🔥 FIX LOADER (IMPORTANT)
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
  }, 800); // smooth delay
});


// INIT
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartCount();
  updateWishlistCount();
});

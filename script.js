/* RESET */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: #faf9f6;
  color: #222;
  -webkit-tap-highlight-color: transparent;
  overscroll-behavior: none;
}

/* CONTAINER */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* HEADER */
.header {
  background: #fff;
  box-shadow: 0 2px 15px rgba(0,0,0,0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header .container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 0;
  gap: 8px;
}

/* LOGO */
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-img {
  height: 85px;
  width: auto;
}

/* NAV */
.nav {
  display: flex;
  gap: 14px;
  justify-content: center;
}

.nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
  font-size: 14px;
}

.nav a:hover {
  color: #c3996b;
}

/* HEADER RIGHT */
.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  justify-content: center;
}

/* SEARCH */
.search-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

.search-container input {
  padding: 8px 14px;
  border: 1px solid #ddd;
  border-radius: 30px;
  width: 85%;
  max-width: 350px;
  font-size: 14px;
}

/* HERO */
.hero {
  height: 90vh;
  background: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
  url('https://images.unsplash.com/photo-1617038220319-276d3cfab638') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: 3.2rem;
}

.hero p {
  font-size: 1.1rem;
}

/* BUTTONS */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

.btn-primary {
  background: #c3996b;
  color: white;
  border: none;
  padding: 12px 26px;
  border-radius: 40px;
  cursor: pointer;
}

.btn-primary:hover {
  background: #a88252;
}

.btn-secondary {
  background: transparent;
  color: #c3996b;
  border: 2px solid #c3996b;
  padding: 12px 26px;
  border-radius: 40px;
  cursor: pointer;
}

.btn-secondary:hover {
  background: #c3996b;
  color: white;
}

/* CATEGORY BAR */
.categories {
  display: flex;
  gap: 12px;
  padding: 12px 15px;
  overflow-x: auto;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.categories button {
  border: none;
  background: transparent;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  white-space: nowrap;
  padding-bottom: 4px;
  transition: 0.2s;
}

.categories button:hover {
  color: #000;
  border-bottom: 2px solid #c3996b;
}

.categories::-webkit-scrollbar {
  display: none;
}

/* SECTION TITLE */
.section-title {
  text-align: center;
  font-family: 'Playfair Display', serif;
  font-size: 2.3rem;
  margin: 50px 0;
}

/* PRODUCTS */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.product-card {
  position: relative;
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  text-align: center;
  padding-bottom: 15px;
}

.product-card:hover {
  transform: translateY(-6px);
}

.product-card img {
  width: 100%;
  height: 240px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover img {
  transform: scale(1.05);
}

.product-info {
  padding: 15px;
}

.price {
  color: #c3996b;
  font-weight: bold;
  margin: 8px 0;
}

/* OLD PRICE */
.old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 13px;
  margin-left: 6px;
}

/* BADGE */
.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #000;
  color: #fff;
  padding: 4px 10px;
  font-size: 11px;
  border-radius: 20px;
}

/* PREMIUM TEXT */
.premium-line {
  font-size: 12px;
  color: #777;
  margin-top: 5px;
}

/* CART SIDEBAR */
.cart-sidebar {
  position: fixed;
  top: 0;
  right: -400px;
  width: 350px;
  height: 100%;
  background: white;
  box-shadow: -5px 0 20px rgba(0,0,0,0.2);
  transition: right 0.3s ease;
  z-index: 2000;
  overflow-y: auto;
}

.cart-sidebar.open {
  right: 0;
}

/* MODAL */
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  justify-content: center;
  align-items: center;
}

/* WHATSAPP */
.whatsapp-float {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #25D366;
  color: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

/* MOBILE */
@media (max-width: 768px) {

  .logo-img {
    height: 70px;
  }

  .nav a {
    font-size: 13px;
  }

  .hero h1 {
    font-size: 2.5rem;
  }

  .hero p {
    font-size: 1rem;
  }

}

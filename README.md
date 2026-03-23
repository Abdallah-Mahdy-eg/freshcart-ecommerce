# 🛒 FreshCart E-Commerce

A fully functional e-commerce web application built with React.js, featuring product browsing, cart management, and order processing.

## 🌐 Live Demo

[https://freshcart-ecommerce-nu.vercel.app/](https://freshcart-ecommerce-nu.vercel.app/)

---

## ✨ Features

- 🔐 **Authentication** — Register & Login with JWT token management
- 🏠 **Home Page** — Browse all products with category sorting
- 🛍️ **Product Details** — View detailed product information
- 🏷️ **Brands** — Browse products by brand
- 🛒 **Cart Management** — Add, remove, and update product quantities
- 💳 **Payment** — Support for Cash and Credit Card payments via Stripe
- 📦 **Order History** — View all previous orders with full details
- 👤 **User Profile** — View account information
- 🔒 **Protected Routes** — Authenticated-only pages
- 📱 **Responsive Design** — Fully responsive across all devices

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React.js | UI Framework |
| React Router DOM | Client-side routing |
| Axios | HTTP requests |
| Context API | State management (Cart) |
| Formik | Form handling |
| JWT Decode | Token decoding |
| Tailwind CSS | Styling |
| Vite | Build tool |

---

## 📁 Project Structure

```
src/
├── assets/
├── Components/
│   ├── AllOrders/
│   ├── Brands/
│   ├── BrandProducts/
│   ├── Cart/
│   ├── Home/
│   ├── Layout/
│   ├── LoadingScreen/
│   ├── Login/
│   ├── Navbar/
│   ├── Payment/
│   ├── ProductDetails/
│   ├── Profile/
│   ├── Register/
│   └── Slider/
├── Context/
│   └── CartContext.jsx
├── App.jsx
└── main.jsx
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Abdallah-Mahdy-eg/freshcart-ecommerce.git

# Navigate to the project directory
cd freshcart-ecommerce

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🔗 API

This project uses the [Route Academy E-Commerce API](https://ecommerce.routemisr.com/).

---

## 👨‍💻 Author

**Abdallah Mahdy**
- GitHub: [@Abdallah-Mahdy-eg](https://github.com/Abdallah-Mahdy-eg)
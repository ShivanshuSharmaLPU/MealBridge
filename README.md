# 🍽️ MealBridge – Online Food Ordering Platform

MealBridge is a modern **full-stack food ordering web application** that enables customers to browse restaurant menus, add food items to a cart, place orders online, and track their order status in real time.

The platform helps restaurants **digitize their food ordering operations** while providing customers with a **fast, seamless, and user-friendly experience**.

---

## 📖 Overview

MealBridge provides a complete **online food ordering ecosystem** with separate modules for **customers and administrators**.

### Customers can:
- Browse available food items
- Filter food by category
- Add food items to their cart
- Place orders online
- Track their order status

### Administrators can:
- Manage food items and categories
- Manage orders and customer activity
- Monitor platform operations through a dashboard

The system is designed to be **secure, scalable, and responsive across all devices**.

---

## ✨ Key Features

### 🍔 Menu Browsing
Users can explore food items with filtering options such as **category, price, or popularity**.

### 🛒 Cart Management
Customers can:
- Add items to cart
- Remove items
- Update quantities
- View real-time total cost

### 📦 Order Management
Users can place orders and track the current order status such as:
- Order placed
- Preparing
- Out for delivery
- Delivered

### 🔐 Authentication System
Secure login and registration system for **customers and administrators**.

### 📊 Admin Dashboard
Admins can manage:
- Food menu
- Orders
- Pricing
- Customers

### 📱 Responsive UI
The platform works smoothly on **mobile, tablet, and desktop devices**.

### 💳 Payment Integration
Supports secure online payments through **Stripe or Razorpay**.

---

## 🖥️ Frontend (Client)

The frontend provides the **user interface for customers**.

### Responsibilities
- Display food menu and categories
- Manage cart functionality
- Handle user authentication
- Place food orders
- Track order status

### Main Pages
- Home Page
- Menu Page
- Cart Page
- Order Page
- Login / Signup Page
- Order Tracking Page

### Technologies
- React.js
- Tailwind CSS / Bootstrap
- Axios for API requests
- React Router for navigation

---

## ⚙️ Backend (Server)

The backend handles the **core business logic and APIs**.

### Responsibilities
- User authentication
- Food item management
- Order processing
- Payment verification
- Database operations

### Main Components
- REST APIs
- Authentication middleware
- Order processing services
- Payment integration

### Technologies
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt password hashing

---

## 👨‍💼 Admin Panel

The **Admin Panel** allows administrators to manage the platform.

### Admin Features
- Add / update / delete food items
- Manage food categories
- View and manage orders
- Monitor customer activity
- Update order status

### Admin Dashboard Functions
- Order overview
- Food inventory management
- Customer order tracking

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS / Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Authentication
- JWT
- Bcrypt

### API Communication
- Axios

### Payment Gateway
- Stripe / Razorpay
  
📁 Project Structure

```
  MealBridge
│
├── client # Customer frontend
│ ├── components # Reusable UI components
│ ├── pages # Application pages
│ ├── context # Global state management
│ └── services # API calls
│
├── admin # Admin dashboard
│ ├── components # Admin UI components
│ ├── pages # Admin pages
│ └── services # Admin API calls
│
├── server # Backend server
│ ├── controllers # Business logic
│ ├── routes # API routes
│ ├── models # Database schemas
│ ├── middleware # Authentication middleware
│ └── config # Database and server configuration
│
└── database
├── users # User data
├── orders # Order records
└── food_items # Menu inventory
    ├── orders             # Order records
    └── food_items         # Menu inventory
```

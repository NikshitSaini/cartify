# Cartify - Full-Scale E-Commerce Platform

A modern, full-stack e-commerce platform built with the MERN stack (MongoDB, Express, React, Node.js).

[**🚀 Live Demo**](https://cartify-in.netlify.app/)

## 🚀 Features

### User Features

- ✅ User authentication (register/login with JWT)
- ✅ Product browsing with search, filters, and pagination
- ✅ Shopping cart with localStorage persistence
- ✅ Checkout with shipping address and payment validation
- ✅ Order history and tracking
- ✅ Responsive design for all devices

### Admin Features

- ✅ Product management (Create, Read, Update, Delete)
- ✅ Order management with status updates
- ✅ Role-based access control

### Technical Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ RESTful API design
- ✅ MongoDB with Mongoose ODM
- ✅ React with Vite for fast development
- ✅ Zustand for state management
- ✅ Tailwind CSS for styling
- ✅ React Hook Form + Zod for validation
- ✅ Debounced search
- ✅ Lazy loading images
- ✅ Code splitting and optimization

## 📁 Project Structure

```
e-commerce/
├── frontend/              # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Zustand stores
│   │   ├── services/     # API services
│   │   ├── routes/       # Route protection
│   │   └── utils/        # Helper functions
│   └── package.json
│
└── backend/              # Node.js + Express backend
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # MongoDB models
    │   ├── routes/       # API routes
    │   ├── middleware/   # Auth & error middleware
    │   ├── config/       # Database config
    │   └── server.js     # Entry point
    └── package.json
```

## 🛠️ Tech Stack

### Frontend

- **React** (Vite)
- **Tailwind CSS**
- **Zustand** (State Management)
- **React Router**
- **Axios**
- **React Hook Form** + **Zod**
- **React Hot Toast**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** + **Mongoose**
- **JWT** (Authentication)
- **bcrypt** (Password Hashing)

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Create `.env` file:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
```

3. Install dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

3. Install dependencies:

```bash
npm install
```

4. Start development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Products

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders

- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/status` - Update order status (admin)
- `GET /api/admin/orders` - Get all orders (admin)

## 👤 Default Admin Account

To create an admin account, manually update a user's role in MongoDB:

```javascript
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } });
```

## 🎨 UI Components

- **Button** - Multiple variants (primary, secondary, danger, outline)
- **Input** - Form input with validation
- **Card** - Product cards with hover effects
- **Loader** - Loading spinner
- **Navbar** - Responsive navigation with cart badge
- **ProductCard** - Product display with add to cart
- **ProductFilter** - Search and filter products

## 🧪 Testing

1. Start both frontend and backend servers
2. Register a new user account
3. Browse products and add to cart
4. Complete checkout process
5. View order history
6. Manually set user as admin in MongoDB
7. Access admin panel to manage products and orders

## 📄 License

MIT

## 👨‍💻 Author

Developed as a portfolio project showcasing full-stack e-commerce development skills.

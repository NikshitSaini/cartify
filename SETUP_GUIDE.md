# 🚀 Cartify - Quick Setup Guide

Follow this guide to get Cartify up and running in minutes!

## 📋 Prerequisites

Before starting, make sure you have:

- ✅ Node.js (v16 or higher) installed
- ✅ MongoDB installed locally OR a MongoDB Atlas account
- ✅ A code editor (VS Code recommended)

## 🔧 Step-by-Step Setup

### 1. MongoDB Setup

**Option A: MongoDB Atlas (Cloud - Recommended)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

**Option B: Local MongoDB**

1. Install MongoDB locally
2. Start MongoDB: `mongod`
3. Your connection string will be: `mongodb://localhost:27017/cartify`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create .env file
cat > .env << EOL
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_super_secret_key_change_this_in_production
EOL

# ⚠️ IMPORTANT: Open .env and replace with your actual MongoDB URI!

# Install dependencies
npm install

# Seed the database with sample products and admin user
npm run seed

# Start the backend server
npm run dev
```

✅ Backend should now be running on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Open a NEW terminal window
# Navigate to frontend directory
cd frontend

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api" > .env

# Install dependencies
npm install

# Start the frontend server
npm run dev
```

✅ Frontend should now be running on `http://localhost:5173`

## 🎉 You're Ready!

Open your browser and go to: **http://localhost:5173**

### 🔐 Test Accounts

**Admin Account** (Created by seed script):

- Email: `admin@cartify.com`
- Password: `admin123`
- Access: Full admin dashboard access

**Regular User**:

- Create a new account by clicking "Register"

## 🧪 Testing the Application

### As a Regular User:

1. ✅ Register a new account
2. ✅ Browse products with filters
3. ✅ Add items to cart
4. ✅ Complete checkout
5. ✅ View order history

### As an Admin:

1. ✅ Login with admin credentials
2. ✅ Click "Admin" in navigation
3. ✅ Manage products (Create, Update, Delete)
4. ✅ Navigate to "Admin > Orders"
5. ✅ Update order statuses

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"

- ✅ Check your MongoDB Atlas connection string
- ✅ Make sure IP whitelist is set to "Allow from anywhere" (0.0.0.0/0)
- ✅ Verify username/password in connection string

### "Port 5000 already in use"

- ✅ Change `PORT=5001` in backend `.env` file
- ✅ Update `VITE_API_URL=http://localhost:5001/api` in frontend `.env` file

### "Cannot GET /api/..."

- ✅ Make sure backend server is running (`npm run dev` in backend folder)
- ✅ Check console for error messages

### Seed script fails

- ✅ Make sure MongoDB is running
- ✅ Check your MONGO_URI in `.env` file
- ✅ Delete the database and try again

## 📁 Project Structure

```
e-commerce/
├── frontend/          # React + Vite
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── services/
│   └── .env
│
├── backend/           # Node.js + Express
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── routes/
│   ├── .env
│   └── seed.js
│
└── README.md
```

## 🎯 Next Steps

- 🌐 Deploy to production (Vercel + Render/Railway)
- 📸 Add Cloudinary for image uploads
- 💳 Integrate Stripe/PayPal for payments
- 📧 Add email notifications
- ⭐ Implement product reviews

## 💡 Tips

1. **Keep both servers running** - You need both frontend (5173) and backend (5000) running
2. **Use the seeder** - Run `npm run seed` anytime to reset products and recreate admin user
3. **Check console** - Open browser console (F12) to see any frontend errors
4. **Check terminal** - Monitor backend terminal for API errors

## 🆘 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review API endpoints in the implementation plan
- Check code comments for explanations

---

**Happy Coding! 🚀**

Built with ❤️ as a portfolio project showcasing full-stack e-commerce development.

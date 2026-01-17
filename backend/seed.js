import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Product from './src/models/Product.js';
import User from './src/models/User.js';
import { connectDB } from './src/config/database.js';

dotenv.config();

const sampleProducts = [
  {
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    description: 'Industry-leading noise cancellation, crystal clear hands-free calling, and 30-hour battery life. Perfect for travel and work.',
    price: 29990,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    stock: 50,
    rating: 4.8,
    numReviews: 1245,
  },
  {
    name: 'Premium Leather Laptop Backpack - 15.6 inch',
    description: 'Handcrafted genuine leather backpack with padded laptop compartment, multiple pockets, and water-resistant finish.',
    price: 4499,
    category: 'Other',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    stock: 30,
    rating: 4.5,
    numReviews: 89,
  },
  {
    name: 'Apple Watch Series 9 GPS - 41mm',
    description: 'Smarter, brighter, and mightier. Advanced health sensors, sleep tracking, and crash detection. Water resistant.',
    price: 41900,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    stock: 75,
    rating: 4.7,
    numReviews: 234,
  },
  {
    name: 'Nike Air Force 1 \'07 - White',
    description: 'The radiance lives on in the Nike Air Force 1 \'07, the b-ball icon that puts a fresh spin on what you know best.',
    price: 8495,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
    stock: 100,
    rating: 4.6,
    numReviews: 456,
  },
  {
    name: 'JavaScript: The Definitive Guide - 7th Edition',
    description: 'Master the world\'s most used programming language. Comprehensive, reliable, and clear guide for modern JavaScript.',
    price: 2450,
    category: 'Books',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    stock: 200,
    rating: 4.9,
    numReviews: 678,
  },
  {
    name: 'Philips 1000W Coffee Maker',
    description: 'Ease into your morning with fresh coffee. 1.2L capacity, drip stop, and auto shut-off features.',
    price: 3299,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500',
    stock: 40,
    rating: 4.4,
    numReviews: 145,
  },
  {
    name: 'Premium Yoga Mat with Alignment Lines',
    description: '6mm extra thick yoga mat with non-slip surface and body alignment system. Includes carrying strap.',
    price: 1299,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    stock: 85,
    rating: 4.5,
    numReviews: 92,
  },
  {
    name: 'Logitech MX Master 3S Wireless Mouse',
    description: 'Performance wireless mouse with 8K DPI tracking, quiet clicks, and ultrafast scrolling.',
    price: 9995,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
    stock: 60,
    rating: 4.8,
    numReviews: 2030,
  },
  {
    name: 'Levi\'s Men\'s Trucker Denim Jacket',
    description: 'The original jean jacket since 1967. A blank canvas for self-expression. 100% Cotton.',
    price: 3599,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500',
    stock: 45,
    rating: 4.3,
    numReviews: 178,
  },
  {
    name: 'LEGO Classic Medium Creative Brick Box',
    description: 'Designed with builders of all ages in mind, this collection of LEGO bricks in 35 different colors will encourage open-ended building play.',
    price: 2999,
    category: 'Toys',
    image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=500',
    stock: 120,
    rating: 4.8,
    numReviews: 3120,
  },
  {
    name: 'Wonderchef Granite Cookware Set - 4 Piece',
    description: 'Healthy non-stick coating suitable for use on induction, gas, electric & glass stovetops.',
    price: 5499,
    category: 'Home & Kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500',
    stock: 25,
    rating: 4.6,
    numReviews: 87,
  },
  {
    name: 'Wilson Pro Staff Team Tennis Racket',
    description: 'Ideal for intermediate players. Offers mix of power and control. Pre-strung.',
    price: 8999,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=500',
    stock: 35,
    rating: 4.7,
    numReviews: 64,
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('Clearing existing products...');
    await Product.deleteMany();

    console.log('Seeding products...');
    await Product.insertMany(sampleProducts);

    console.log('✅ Database seeded successfully!');
    console.log(`Added ${sampleProducts.length} products`);

    // Create admin user if doesn't exist
    const adminEmail = 'admin@cartify.com';
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      console.log('Creating admin user...');
      const adminPass = await bcrypt.hash('admin123', 10);
      await User.create({
        name: 'Admin User',
        email: adminEmail,
        password: adminPass, // Hash manually here since we use insertMany or create direct
        role: 'admin',
      });
      // Note: If using User.create, the pre-save hook handles hashing usually, 
      // but let's rely on the pre-save hook if we pass plain text? 
      // Actually, my previous fix had the hook. Let's just pass plaintext `password: 'admin123'` 
      // and let the model handle it, to be safe and consistent.
      // Wait, I see I imported bcrypt but let's stick to the model's logic.
      // Re-reading User.js, it has a pre-save hook.
      // So I will revert to passing 'admin123' and remove manual hash here for consistency.
    } else {
      console.log('Admin user already exists');
    }
    
    // We need to re-fetch the admin logic to be sure about the hook firing on create.
    // Actually simpler: I'll just rely on the pre-save hook as verified before.

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Re-writing the admin creation part to be robust specifically for this file run
const seedWithAdmin = async () => {
    try {
      await connectDB();
  
      console.log('Clearing existing products...');
      await Product.deleteMany();
  
      console.log('Seeding products...');
      await Product.insertMany(sampleProducts);
  
      console.log('✅ Database seeded successfully!');
  
      const adminEmail = 'admin@cartify.com';
      const existingAdmin = await User.findOne({ email: adminEmail });
  
      if (!existingAdmin) {
        console.log('Creating admin user...');
        // The pre-save hook we fixed earlier handles the hashing
        const admin = new User({
          name: 'Admin User',
          email: adminEmail,
          password: 'admin123',
          role: 'admin',
        });
        await admin.save();
        console.log(`✅ Admin user created: ${adminEmail} / admin123`);
      } else {
        console.log('Admin user already exists');
      }
  
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  };

seedWithAdmin();

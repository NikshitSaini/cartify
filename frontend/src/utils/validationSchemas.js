import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const checkoutSchema = z.object({
  street: z.string().min(5, 'Street address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zipCode: z.string().min(5, 'Valid zip code is required'),
  country: z.string().min(2, 'Country is required'),
  paymentMethod: z.enum(['Credit Card', 'Debit Card', 'PayPal'], {
    required_error: 'Payment method is required',
  }),
  cardLast4: z.string().regex(/^\d{4}$/, 'Last 4 digits required').optional(),
});

export const productSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0.01, 'Price must be greater than 0'),
  compareAtPrice: z.number().min(0).optional(),
  category: z.enum(['Electronics', 'Clothing', 'Books', 'Home & Kitchen', 'Sports', 'Toys', 'Other']),
  image: z.string().min(1, 'Image is required'),
  stock: z.number().min(0, 'Stock cannot be negative'),
});

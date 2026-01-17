import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { checkoutSchema } from '../utils/validationSchemas';
import { orderService } from '../services/orderService';
import useCartStore from '../store/cartStore';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import toast from 'react-hot-toast';

export const Checkout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);

      const orderData = {
        items: items.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shippingAddress: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country,
        },
        paymentInfo: {
          method: data.paymentMethod,
          cardLast4: data.cardLast4 || undefined,
        },
        totalAmount: getTotal(),
      };

      await orderService.createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6">
            {/* Shipping Address */}
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            
            <Input
              label="Street Address"
              placeholder="123 Main St"
              error={errors.street?.message}
              {...register('street')}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="City"
                placeholder="New York"
                error={errors.city?.message}
                {...register('city')}
              />
              <Input
                label="State"
                placeholder="NY"
                error={errors.state?.message}
                {...register('state')}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Zip Code"
                placeholder="10001"
                error={errors.zipCode?.message}
                {...register('zipCode')}
              />
              <Input
                label="Country"
                placeholder="USA"
                error={errors.country?.message}
                {...register('country')}
              />
            </div>

            {/* Payment Information */}
            <h2 className="text-xl font-bold mb-4 mt-6">Payment Information</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-semibold mb-2">
                Payment Method
              </label>
              <select
                {...register('paymentMethod')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              >
                <option value="">Select payment method</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
              )}
            </div>

            {(paymentMethod === 'Credit Card' || paymentMethod === 'Debit Card') && (
              <Input
                label="Card Last 4 Digits"
                placeholder="1234"
                maxLength={4}
                error={errors.cardLast4?.message}
                {...register('cardLast4')}
              />
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> This is a demo application. No actual payment will be processed.
              </p>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product._id} className="flex justify-between text-sm">
                  <span className="flex-1">
                    {item.product.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
              
              <div className="border-t pt-3 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-primary-600">₹{getTotal().toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

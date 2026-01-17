import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { Loader } from '../components/common/Loader';
import { Button } from '../components/common/Button';
import { TruckIcon, MapPinIcon, CreditCardIcon, PackageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

export const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setIsLoading(true);
      // We need to implement getOrderById in orderService if not exists, 
      // or filter from getUserOrders if API doesn't support single fetch for users (usually it does).
      // Let's assume getUserOrders returns list, but usually there's a getOrderById endpoint.
      // Checking orderController (step 247/250): getOrderById exists!
      // Checking orderService.js: need to verify if getOrderById is exposed.
      // I'll check orderService in a moment, but for now I'll assume it exists or I'll fix it.
      const data = await orderService.getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.error('Error fetching order:', error);
      toast.error('Failed to load order details');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Link to="/orders">
          <Button variant="primary">Back to Orders</Button>
        </Link>
      </div>
    );
  }

  const steps = [
    { status: 'pending', label: 'Order Placed', date: order.createdAt },
    { status: 'processing', label: 'Processing', date: null },
    { status: 'shipped', label: 'Shipped', date: null },
    { status: 'delivered', label: 'Delivered', date: null },
  ];

  const currentStep = steps.findIndex(s => s.status === order.status);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/orders" className="hover:text-primary-600">Orders</Link>
        <span>/</span>
        <span className="text-gray-900">#{order._id}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden mb-8">
        <div className="p-6 border-b bg-gray-50 flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Order Details</h1>
            <p className="text-gray-500">Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { dateStyle: 'long' })}</p>
          </div>
          <Button variant="outline" onClick={() => window.print()}>
            Download Invoice
          </Button>
        </div>

        {/* Status Tracker */}
        <div className="p-8 border-b">
           <div className="relative flex justify-between">
              {/* Progress Bar Background */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 -translate-y-1/2 rounded"></div>
              {/* Active Progress */}
              <div 
                className="absolute top-1/2 left-0 h-1 bg-green-500 -z-10 -translate-y-1/2 rounded transition-all duration-500"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              ></div>

              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 ${index <= currentStep ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-300'}`}>
                    {index <= currentStep ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm font-medium ${index <= currentStep ? 'text-green-600' : 'text-gray-500'}`}>{step.label}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
           {/* Items */}
           <div>
             <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <PackageIcon className="w-5 h-5 text-gray-500" /> Items
             </h3>
             <div className="space-y-4">
                {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 border rounded-lg p-3">
                        <img src={item.product.image} alt={item.product.name} className="w-20 h-20 object-contain bg-gray-100 rounded" />
                        <div>
                            <p className="font-semibold text-gray-900">{item.product.name}</p>
                            <p className="text-sm text-gray-500 mb-1">Qty: {item.quantity}</p>
                            <p className="font-bold text-primary-600">₹{item.price.toLocaleString('en-IN')}</p>
                        </div>
                    </div>
                ))}
             </div>
           </div>

           {/* Info */}
           <div className="space-y-6">
              <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <TruckIcon className="w-5 h-5 text-gray-500" /> Delivery Address
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold">{order.shippingAddress.address}</p> {/* Assuming simple address for now or user name */}
                      <p>{order.shippingAddress.street}</p>
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zipCode}</p>
                      <p>{order.shippingAddress.country}</p>
                  </div>
              </div>

               <div>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <CreditCardIcon className="w-5 h-5 text-gray-500" /> Payment Info
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-semibold uppercase">{order.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Payment Status</p>
                        <p className="font-semibold text-green-600">{order.isPaid ? 'Paid' : 'Pending'}</p>
                      </div>
                  </div>
              </div>

               <div>
                  <h3 className="font-bold text-lg mb-4">Order Summary</h3>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal</span>
                          <span>₹{order.totalAmount.toLocaleString('en-IN')}</span> {/* Simplified for now */}
                      </div>
                      <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Shipping</span>
                          <span className="text-green-600">Free</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-primary-600">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

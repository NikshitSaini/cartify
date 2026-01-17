import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../services/productService';
import useCartStore from '../store/cartStore';
import { Button } from '../components/common/Button';
import { Loader } from '../components/common/Loader';
import toast from 'react-hot-toast';

// Helper icon components
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="flex text-yellow-400">
    {[...Array(5)].map((_, i) => (
      <svg 
        key={i} 
        className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-current' : 'text-gray-300'}`} 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const data = await productService.getProductById(id);
      setProduct(data);
      
      // Fetch related products (mock logic: same category)
      try {
        const related = await productService.getAllProducts({ category: data.category, limit: 4 });
        setRelatedProducts(related.products.filter(p => p._id !== data._id));
      } catch (err) {
        console.error("Failed to load related products", err);
      }
      
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const checkDelivery = (e) => {
    e.preventDefault();
    if (pincode.length === 6) {
      // Mock delivery logic
      const date = new Date();
      date.setDate(date.getDate() + 3);
      setDeliveryDate(date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' }));
      toast.success('Delivery available!');
    } else {
      toast.error('Please enter a valid 6-digit pincode');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
        <Loader size="lg" />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-primary-600">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-primary-600">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left: Product Images */}
        <div className="lg:col-span-5">
          <div className="bg-white border rounded-xl overflow-hidden p-6 relative group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-contain aspect-square group-hover:scale-105 transition-transform duration-300"
            />
            {/* Wishlist Button Placeholder */}
            <button className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {[product.image, product.image, product.image, product.image].map((img, i) => (
              <div key={i} className={`border rounded-lg cursor-pointer overflow-hidden ${i===0 ? 'border-primary-600 ring-2 ring-primary-100' : 'hover:border-gray-400'}`}>
                <img src={img} alt="" className="w-full h-full object-cover aspect-square" />
              </div>
            ))}
          </div>
        </div>

        {/* Center: Product Details */}
        <div className="lg:col-span-4">
          <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1">
              4.5 <span className="text-[10px]">★</span>
            </span>
            <span className="text-gray-500 text-sm font-medium">2,345 Ratings & 156 Reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-3xl font-bold text-gray-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.compareAtPrice > product.price && (
                <>
                <span className="text-gray-500 line-through text-lg">
                    ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-green-600 font-bold text-lg">
                    {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% off
                </span>
                </>
            )}
          </div>

          {/* Available Offers */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary-600 rotate-45">🏷️</span> Available Offers
            </h3>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2 items-start">
                <span className="font-bold text-gray-700 whitespace-nowrap">Bank Offer</span>
                <span className="text-gray-600">5% Cashback on Flipkart Axis Bank Card</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="font-bold text-gray-700 whitespace-nowrap">Special Price</span>
                <span className="text-gray-600">Get extra 10% off (price inclusive of discount)</span>
              </li>
              <li className="flex gap-2 items-start">
                <span className="font-bold text-gray-700 whitespace-nowrap">No Cost EMI</span>
                <span className="text-gray-600">Avail No Cost EMI on select cards for orders above ₹3000</span>
              </li>
            </ul>
          </div>

          {/* Delivery Check */}
          <div className="border-t border-b py-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-500 text-sm font-semibold">Delivery</span>
              <a href="#" className="text-primary-600 text-sm font-semibold">Change</a>
            </div>
            <form onSubmit={checkDelivery} className="flex gap-2 mb-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-gray-400">📍</span>
                <input 
                  type="text" 
                  maxLength="6"
                  placeholder="Enter Pincode" 
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g,''))}
                  className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-primary-500 outline-none border-b-2 focus:border-b-primary-600"
                />
              </div>
              <button type="submit" className="text-primary-600 font-semibold text-sm px-2 hover:bg-primary-50 rounded">
                Check
              </button>
            </form>
            {deliveryDate ? (
               <div className="text-sm">
                 <p className="font-bold text-gray-900 mb-1">Get it by {deliveryDate}</p>
                 <p className="text-gray-500">Free Delivery | <span className="text-primary-600">Cash on Delivery Available</span></p>
               </div>
            ) : (
              <p className="text-xs text-gray-500">Enter pincode to check delivery date</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
          </div>

          
        </div>

        {/* Right: Payment & Cart Actions */}
        <div className="lg:col-span-3">
          <div className="border rounded-xl p-4 shadow-sm h-fit sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-gray-800">Buy it now</h3>
            
            <div className="flex items-center gap-4 mb-6">
                 {product.stock > 0 ? (
                  <span className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full text-sm">In Stock</span>
                ) : (
                  <span className="text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full text-sm">Out of Stock</span>
                )}
            </div>

            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Quantity</label>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full bg-gray-100 font-bold">-</button>
                  <span className="font-bold w-4 text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-8 h-8 rounded-full bg-gray-100 font-bold">+</button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Button 
                variant="primary" 
                className="w-full py-3 text-lg font-bold shadow-lg shadow-primary-200"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                Add to Cart
              </Button>
              <Button 
                variant="outline" 
                className="w-full py-3 text-lg font-bold"
                onClick={() => handleAddToCart()} // Mock buy now usually redirects to checkout
                disabled={product.stock === 0}
              >
                Buy Now
              </Button>
            </div>

            <div className="mt-6 text-xs text-gray-500 space-y-2">
              <p className="flex items-center gap-2"><CheckIcon /> 7 Days Replacement Policy</p>
              <p className="flex items-center gap-2"><CheckIcon /> Cash on Delivery available</p>
              <p className="flex items-center gap-2"><CheckIcon /> GST invoice available</p>
            </div>
          </div>
        </div>
      </div>

       {/* Specifications Table */}
      <div className="bg-white border rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
          <div className="border-b pb-2">
             <span className="text-gray-500 block text-sm">Brand</span>
             <span className="font-medium">Cartify Collection</span>
          </div>
          <div className="border-b pb-2">
             <span className="text-gray-500 block text-sm">Model Name</span>
             <span className="font-medium">{product.name.split(' ').slice(0, 3).join(' ')}</span>
          </div>
           <div className="border-b pb-2">
             <span className="text-gray-500 block text-sm">Category</span>
             <span className="font-medium">{product.category}</span>
          </div>
           <div className="border-b pb-2">
             <span className="text-gray-500 block text-sm">Color</span>
             <span className="font-medium">Multicolor</span>
          </div>
           <div className="border-b pb-2">
             <span className="text-gray-500 block text-sm">In The Box</span>
             <span className="font-medium">1 x {product.name}</span>
          </div>
           <div className="border-b pb-2">
             <span className="text-gray-500 block text-sm">Country of Origin</span>
             <span className="font-medium">India</span>
          </div>
        </div>
      </div>

       {/* Reviews Section */}
      <div className="bg-white border rounded-xl p-8 mb-12">
        <h2 className="text-2xl font-bold mb-6">Ratings & Reviews</h2>
        <div className="flex flex-col md:flex-row gap-12">
          {/* Summary */}
          <div className="md:w-1/3 text-center md:text-left">
            <div className="flex items-baseline gap-4 mb-2 justify-center md:justify-start">
              <span className="text-5xl font-bold text-gray-900">4.5</span>
              <span className="text-gray-500">out of 5</span>
            </div>
            <StarRating rating={4.5} />
            <p className="text-gray-500 mt-2">Based on 2,345 ratings</p>
            
            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm font-medium w-3">{star}</span>
                  <span className="text-xs">★</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ width: `${star === 5 ? 60 : star === 4 ? 25 : star === 3 ? 10 : 5}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500 w-8 text-right">
                    {star === 5 ? '60%' : star === 4 ? '25%' : star === 3 ? '10%' : '5%'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="flex-1 space-y-6">
            {[
              { name: 'Rahul Kumar', rating: 5, date: '2 days ago', text: 'Absolutely love this product! The quality is top-notch and delivery was super fast.' },
              { name: 'Priya Singh', rating: 4, date: '1 week ago', text: 'Good product for the price. Packaging could be better though.' },
              { name: 'Amit Shah', rating: 5, date: '2 weeks ago', text: 'Exactly as described. Works perfectly. Highly recommended!' },
            ].map((review, i) => (
              <div key={i} className="border-b pb-6 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-2">
                   <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                    {review.rating} ★
                  </span>
                  <p className="font-semibold text-gray-900">{review.text.substring(0, 20)}...</p>
                </div>
                <p className="text-gray-700 mb-3 text-sm">{review.text}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="font-medium text-gray-600">{review.name}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">✅ Certified Buyer</span>
                  <span>•</span>
                  <span>{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <Link to={`/products/${p._id}`} key={p._id} className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 truncate mb-1">{p.name}</h3>
                   <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-600 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      4.4 ★
                    </span>
                    <span className="text-gray-500 text-xs">(1,203)</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold text-gray-900">₹{p.price.toLocaleString('en-IN')}</span>
                    {p.compareAtPrice > p.price && (
                        <>
                        <span className="text-xs text-gray-500 line-through">₹{p.compareAtPrice.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                        <span className="text-xs text-green-600 font-bold">
                            {Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)}% off
                        </span>
                        </>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

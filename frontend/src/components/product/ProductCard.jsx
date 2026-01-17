import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { Link } from 'react-router-dom';
import useCartStore from '../../store/cartStore';
import toast from 'react-hot-toast';

export const ProductCard = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    toast.success('Added to cart!');
  };

  return (
    <Link to={`/products/${product._id}`}>
      <Card className="h-full flex flex-col">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
           {product.compareAtPrice > product.price && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded">
               {Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)}% OFF
            </span>
           )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.category}</p>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {product.description}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-2xl font-bold text-primary-600">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <Button variant="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
          {product.stock === 0 && (
            <span className="text-red-500 text-sm mt-2">Out of Stock</span>
          )}
        </div>
      </Card>
    </Link>
  );
};

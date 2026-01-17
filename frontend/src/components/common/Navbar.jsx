import { Link, useLocation } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, ShoppingBag } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';

export const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuthStore();
  const itemCount = useCartStore((state) => state.getItemCount());
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className={`relative group font-medium transition-colors ${
        isActive(to) ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
      }`}
    >
      {children}
      <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full ${isActive(to) ? 'w-full' : ''}`}></span>
    </Link>
  );

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
            <ShoppingBag className="w-8 h-8 text-primary-600" />
            Cartify
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/products">Categories</NavLink>
            <NavLink to="/contact">Contact</NavLink>

            {/* Cart Icon */}
            <Link to="/cart" className="relative group">
              <ShoppingCartIcon className="w-6 h-6 text-gray-700 group-hover:text-primary-600 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 group"
                title="Profile"
              >
                <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                    {user?.name?.charAt(0).toUpperCase() || <UserIcon className="w-5 h-5" />}
                </div>
              </Link>
            ) : (
              <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-primary-600 font-medium transition-colors">
                <UserIcon className="w-5 h-5" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

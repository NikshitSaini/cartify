import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { ShoppingBagIcon, TrendingUpIcon, ShieldCheckIcon, TruckIcon } from 'lucide-react';
// Note: We might need to install lucide-react or use existing icons. 
// For now, I'll use the existing Icons.jsx or simple placeholders if needed, 
// but to make it "stuffy" and nice, standard icons are good. 
// Let's stick to our internal Icons for consistency or placeholders.
// Actually, I'll create a quick internal icon wrapper logic or just use svgs.
// Let's use simple SVG implementation style as seen in common/Icons.jsx

const FeatureIcon = ({ path }) => (
  <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
  </svg>
);

export const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=500', link: '/shop?category=Electronics' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=500', link: '/shop?category=Clothing' },
    { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500', link: '/shop?category=Home & Kitchen' },
    { name: 'Sports', image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500', link: '/shop?category=Sports' },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white h-[500px] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
            Summer Sale is Live
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            Get up to 50% off on premium electronics, fashion, and home essentials. 
            Experience the new standard of online shopping.
          </p>
          <div className="flex gap-4">
            <Link to="/shop">
              <Button variant="primary" className="px-8 py-3 text-lg">
                Shop Now
              </Button>
            </Link>
            <Link to="/shop?sort=newest">
              <Button variant="outline" className="px-8 py-3 text-lg bg-transparent text-white border-white hover:bg-white hover:text-gray-900">
                New Arrivals
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { title: 'Free Shipping', desc: 'On all orders over ₹499', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
              { title: 'Secure Payment', desc: '100% secure payment', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { title: 'Easy Returns', desc: '30 day return policy', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
              { title: '24/7 Support', desc: 'Dedicated support', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-4 p-6 border rounded-lg hover:shadow-lg transition-shadow">
                <div className="bg-primary-50 p-3 rounded-full">
                  <FeatureIcon path={feature.icon} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <Link to={cat.link} key={cat.name} className="group overflow-hidden rounded-xl shadow-md relative h-64">
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <h3 className="text-white text-2xl font-bold">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="p-12 text-white">
                <span className="bg-white text-primary-600 px-3 py-1 rounded-full text-sm font-bold mb-4 inline-block">Deal of the Day</span>
                <h2 className="text-4xl font-bold mb-4">Save big on Apple products</h2>
                <p className="text-lg text-primary-100 mb-8">
                  Get the latest iPhone, iPad, and MacBook at unbeatable prices. Limited time offer.
                </p>
                <Link to="/shop?category=Electronics">
                  <Button className="bg-white text-primary-600 hover:bg-gray-100 z-10 relative">
                    Explore Deals
                  </Button>
                </Link>
              </div>
              <div className="h-full min-h-[300px] bg-[url('https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800')] bg-cover bg-center">
                {/* Image background */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Subscribe to our Newsletter</h2>
          <p className="text-gray-400 mb-8">
            Be the first to know about new arrivals, sales, and exclusive offers.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
            />
            <Button variant="primary" className="px-6">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

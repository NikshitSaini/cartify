import { useState } from 'react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import toast from 'react-hot-toast';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';

export const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Mock submission
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: '', email: '', message: '' });
        setIsSubmitting(false);
    };

    return (
        <div className="container mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold text-center mb-4">Get in Touch</h1>
            <p className="text-gray-500 text-center mb-16 max-w-2xl mx-auto">
                Have questions about our products or need help with your order? 
                Our team is here to assist you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary-100 p-4 rounded-lg text-primary-600">
                            <MailIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1">Email Us</h3>
                            <p className="text-gray-600 mb-1">Our friendly team is here to help.</p>
                            <a href="mailto:support@cartify.com" className="text-primary-600 font-medium">support@cartify.com</a>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-primary-100 p-4 rounded-lg text-primary-600">
                            <MapPinIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1">Office</h3>
                            <p className="text-gray-600 mb-1">Come say hello at our office headquarters.</p>
                            <p className="text-gray-900 font-medium">100 Smith Street<br/>Collingwood VIC 3066 AU</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                         <div className="bg-primary-100 p-4 rounded-lg text-primary-600">
                            <PhoneIcon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-1">Phone</h3>
                            <p className="text-gray-600 mb-1">Mon-Fri from 8am to 5pm.</p>
                            <a href="tel:+1 (555) 000-0000" className="text-primary-600 font-medium">+1 (555) 000-0000</a>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white p-8 rounded-2xl shadow-lg border">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Name"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                            required
                        />
                         <Input
                            label="Email"
                            type="email"
                            placeholder="you@company.com"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                        <div>
                             <label className="block text-gray-700 text-sm font-semibold mb-2">
                                Message
                             </label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-shadow"
                                placeholder="How can we help you?"
                                value={formData.message}
                                onChange={(e) => setFormData({...formData, message: e.target.value})}
                                required
                            ></textarea>
                        </div>
                        <Button type="submit" variant="primary" className="w-full" isLoading={isSubmitting}>
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

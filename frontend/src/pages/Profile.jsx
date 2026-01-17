import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { authService } from '../services/authService';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { UserIcon, ShoppingBagIcon, MapPinIcon, CreditCardIcon, XIcon, PlusIcon, TrashIcon, PackageIcon } from 'lucide-react';
import { orderService } from '../services/orderService';
import toast from 'react-hot-toast';

export const Profile = () => {
    const { user, logout, updateUser } = useAuthStore();
    const navigate = useNavigate();
    const [stats, setStats] = useState({ totalOrders: 0, totalSpent: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
    const [isAddingAddress, setIsAddingAddress] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [profileForm, setProfileForm] = useState({ name: '', email: '', phone: '', gender: '' });
    const [addressForm, setAddressForm] = useState({ street: '', city: '', state: '', zipCode: '', country: '' });

    const getAvatar = (user) => {
        if (user.avatar) return user.avatar;
        if (user.gender === 'male') return 'https://avatar.iran.liara.run/public/boy';
        if (user.gender === 'female') return 'https://avatar.iran.liara.run/public/girl';
        return `https://ui-avatars.com/api/?name=${user.name}&background=random`;
    };

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        
        if (user) {
            setProfileForm({
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                gender: user.gender || ''
            });
        }
        
        // Fetch basic stats from orders
        const fetchStats = async () => {
            try {
                const orders = await orderService.getUserOrders();
                const totalSpent = orders.reduce((acc, order) => acc + order.totalAmount, 0);
                setStats({
                    totalOrders: orders.length,
                    totalSpent
                });
            } catch (error) {
                console.error("Failed to fetch order stats", error);
            }
        };

        fetchStats();
    }, [user, navigate]);

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        try {
            setIsUpdatingProfile(true);
            const updated = await authService.updateProfile(profileForm);
            updateUser(updated);
            setIsEditing(false);
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setIsUpdatingProfile(false);
        }
    };

    const handleAddAddress = async (e) => {
        e.preventDefault();
        try {
            setIsAddingAddress(true);
            const updatedAddresses = [...(user.addresses || []), addressForm];
            const updated = await authService.updateProfile({ addresses: updatedAddresses });
            updateUser(updated);
            setShowAddressForm(false);
            setAddressForm({ street: '', city: '', state: '', zipCode: '', country: '' });
            toast.success('Address added successfully');
        } catch (error) {
            toast.error('Failed to add address');
        } finally {
            setIsAddingAddress(false);
        }
    };

    const handleDeleteAddress = async (index) => {
        if(!window.confirm('Are you sure you want to delete this address?')) return;
        try {
            const updatedAddresses = user.addresses.filter((_, i) => i !== index);
            const updated = await authService.updateProfile({ addresses: updatedAddresses });
            updateUser(updated);
            toast.success('Address deleted');
        } catch (error) {
             toast.error('Failed to delete address');
        }
    };

    if (!user) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">My Account</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Widget */}
                <div className="md:col-span-1">
                    <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary-50">
                             <img src={getAvatar(user)} alt={user.name} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                        <p className="text-gray-500 mb-6">{user.email}</p>
                        
                        <div className="flex flex-col gap-3">
                            <Button variant="outline" onClick={() => navigate('/orders')} className="w-full justify-start gap-3">
                                <ShoppingBagIcon className="w-5 h-5" /> Order History
                            </Button>
                             <Button variant="outline" className="w-full justify-start gap-3">
                                <MapPinIcon className="w-5 h-5" /> Saved Addresses
                            </Button>
                            <Button variant="outline" className="w-full justify-start gap-3">
                                <CreditCardIcon className="w-5 h-5" /> Payment Methods
                            </Button>
                            
                            {user.role === 'admin' && (
                                <Button 
                                    variant="outline" 
                                    onClick={() => navigate('/admin/products')} 
                                    className="w-full justify-start gap-3 text-primary-600 border-primary-200 bg-primary-50"
                                >
                                    <PackageIcon className="w-5 h-5" /> Manage Products
                                </Button>
                            )}

                            <Button variant="danger" onClick={() => { logout(); navigate('/'); }} className="w-full mt-4">
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="md:col-span-2 space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                            <p className="text-blue-600 text-sm font-semibold mb-1">Total Orders</p>
                            <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                            <p className="text-green-600 text-sm font-semibold mb-1">Total Spent</p>
                            <p className="text-3xl font-bold text-gray-900">₹{stats.totalSpent.toLocaleString('en-IN')}</p>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Personal Information</h3>
                            <button 
                                onClick={() => setIsEditing(!isEditing)} 
                                className="text-primary-600 text-sm font-semibold hover:underline"
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        
                        {isEditing ? (
                            <form onSubmit={handleProfileUpdate} className="space-y-4">
                                <Input 
                                    label="Full Name" 
                                    value={profileForm.name} 
                                    onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} 
                                />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input 
                                        label="Phone Number" 
                                        value={profileForm.phone} 
                                        placeholder="+91 0000000000"
                                        onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} 
                                    />
                                    <div>
                                        <label className="block text-gray-700 text-sm font-semibold mb-2">Gender</label>
                                        <select 
                                            value={profileForm.gender} 
                                            onChange={(e) => setProfileForm({...profileForm, gender: e.target.value})}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                     <Button type="button" variant="secondary" onClick={() => setIsEditing(false)} disabled={isUpdatingProfile}>Cancel</Button>
                                     <Button type="submit" variant="primary" isLoading={isUpdatingProfile}>Save Changes</Button>
                                </div>
                            </form>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                                    <p className="font-medium">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Phone Number</label>
                                    <p className="font-medium text-gray-900">{user.phone || <span className="text-gray-400 italic">Not set</span>}</p>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-500 mb-1">Gender</label>
                                    <p className="font-medium capitalize">{user.gender || <span className="text-gray-400 italic">Not set</span>}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Saved Addresses */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Saved Addresses</h3>
                            <button 
                                onClick={() => setShowAddressForm(!showAddressForm)}
                                className="text-primary-600 text-sm font-semibold hover:underline flex items-center gap-1"
                            >
                                <PlusIcon className="w-4 h-4" /> Add New
                            </button>
                        </div>
                        
                        {showAddressForm && (
                             <form onSubmit={handleAddAddress} className="mb-8 bg-gray-50 p-4 rounded-lg border">
                                <h4 className="font-bold mb-4 text-sm uppercase text-gray-500">New Address Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                     <Input label="Street Address" value={addressForm.street} onChange={(e) => setAddressForm({...addressForm, street: e.target.value})} required />
                                     <Input label="City" value={addressForm.city} onChange={(e) => setAddressForm({...addressForm, city: e.target.value})} required />
                                     <Input label="State" value={addressForm.state} onChange={(e) => setAddressForm({...addressForm, state: e.target.value})} required />
                                     <Input label="Zip Code" value={addressForm.zipCode} onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})} required />
                                     <Input label="Country" value={addressForm.country} onChange={(e) => setAddressForm({...addressForm, country: e.target.value})} required />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button type="button" variant="secondary" size="sm" onClick={() => setShowAddressForm(false)} disabled={isAddingAddress}>Cancel</Button>
                                    <Button type="submit" variant="primary" size="sm" isLoading={isAddingAddress}>Save Address</Button>
                                </div>
                             </form>
                        )}
                        
                        {user.addresses && user.addresses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {user.addresses.map((addr, index) => (
                                    <div key={index} className="border rounded-lg p-4 relative group hover:border-primary-300 transition-colors">
                                        <button 
                                            onClick={() => handleDeleteAddress(index)}
                                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1 bg-gray-100 p-2 rounded-full text-gray-600">
                                                <MapPinIcon className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{addr.street}</p>
                                                <p className="text-sm text-gray-500">{addr.city}, {addr.state} - {addr.zipCode}</p>
                                                <p className="text-sm text-gray-500">{addr.country}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                             <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                                <MapPinIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                <p>No saved addresses found.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Payment Methods Placeholder */}
                    <div className="bg-white rounded-xl shadow-sm border p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Payment Methods</h3>
                            <button className="text-primary-600 text-sm font-semibold hover:underline flex items-center gap-1">
                                <PlusIcon className="w-4 h-4" /> Add New
                            </button>
                        </div>
                        <div className="border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                             <CreditCardIcon className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                             <p>No saved payment methods.</p>
                             <p className="text-xs mt-1">Payment details are securely saved during checkout.</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

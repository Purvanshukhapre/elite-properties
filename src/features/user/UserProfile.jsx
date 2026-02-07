import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { updateProfileAPI } from '../../api/profile.api';

const UserProfile = () => {
  const { user, updateUserData } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNo: user?.phoneNo || '',
    address: user?.address || '',
    company: user?.company || '',
    website: user?.website || ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Update user profile via API
      const response = await updateProfileAPI(formData);
      if (response.success) {
        // Update context
        updateUserData(response.data);
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-premium-pearl py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-premium-onyx mb-2">Profile Settings</h1>
              <p className="text-xl text-premium-platinum">
                Manage your account information
              </p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-premium-sapphire to-premium-royal rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent disabled:bg-premium-pearl/50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent disabled:bg-premium-pearl/50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent disabled:bg-premium-pearl/50 disabled:cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent disabled:bg-premium-pearl/50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent disabled:bg-premium-pearl/50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-premium-onyx mb-2">
                  Website
                </label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent disabled:bg-premium-pearl/50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        name: user?.name || '',
                        email: user?.email || '',
                        phoneNo: user?.phoneNo || '',
                        address: user?.address || '',
                        company: user?.company || '',
                        website: user?.website || ''
                      });
                      setIsEditing(false);
                    }}
                    className="border border-premium-platinum/30 text-premium-onyx px-8 py-3 rounded-xl font-bold hover:bg-premium-pearl transition-all"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-premium-onyx mb-6">Security Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-premium-onyx mb-2">
                Current Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-premium-onyx mb-2">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                placeholder="Enter new password"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-premium-onyx mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-xl border border-premium-platinum/30 focus:ring-2 focus:ring-premium-sapphire focus:border-transparent"
                placeholder="Confirm new password"
              />
            </div>
          </div>
          <div className="mt-6">
            <button className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
              Change Password
            </button>
          </div>
        </div>

        {/* Account Management */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
          <h2 className="text-2xl font-bold text-premium-onyx mb-6">Account Management</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-premium-ivory/50 rounded-xl">
              <div>
                <h3 className="font-semibold text-premium-onyx">Download Your Data</h3>
                <p className="text-sm text-premium-platinum">Export your profile and property data</p>
              </div>
              <button className="bg-premium-sapphire text-white px-4 py-2 rounded-lg font-medium hover:bg-premium-royal transition-colors">
                Download
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-premium-ivory/50 rounded-xl">
              <div>
                <h3 className="font-semibold text-premium-onyx">Delete Account</h3>
                <p className="text-sm text-premium-platinum">Permanently delete your account and all data</p>
              </div>
              <button className="bg-red-100 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors">
                Delete
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-xl">
              <div>
                <h3 className="font-semibold text-red-800">Sign Out</h3>
                <p className="text-sm text-red-600">End your current session</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaLock, FaUser, FaBuilding, FaArrowRight } from 'react-icons/fa';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Mock admin login - bypass API call for demo purposes
      if (credentials.email === 'admin@eliteproperties.com' && credentials.password === 'admin123') {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Directly set admin state in localStorage
        const adminUser = {
          id: 'admin-1',
          email: credentials.email,
          firstName: 'Admin',
          lastName: 'User',
          role: 'admin'
        };
        
        localStorage.setItem('token', 'admin-token-mock');
        localStorage.setItem('user', JSON.stringify(adminUser));
        localStorage.setItem('isAdmin', 'true');
        
        // Update auth context state
        window.location.href = '/admin/dashboard';
      } else {
        setError('Invalid admin credentials');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4">
                <FaBuilding className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the Elite Properties Admin Dashboard</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-700">
                  <FaLock className="h-5 w-5 mr-2" />
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={credentials.email}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="admin@eliteproperties.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={credentials.password}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter admin password"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In to Admin</span>
                    <FaArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Back to Member Login
              </Link>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials</h3>
              <div className="text-xs text-gray-600 space-y-1">
                <div><strong>Email:</strong> admin@eliteproperties.com</div>
                <div><strong>Password:</strong> admin123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
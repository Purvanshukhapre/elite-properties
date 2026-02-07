import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PremiumHome from '../pages/PremiumHome';
import PropertySearch from '../pages/PropertySearch';
import PropertyDetails from '../pages/PropertyDetails';
import PostProperty from '../pages/PostProperty';
import PostPropertySuccess from '../pages/PostPropertySuccess';

// Protected Route component for premium experience
const PremiumRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Premium Explore Page - Rich property browsing
const PremiumExplore = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Explore Premium Properties</h1>
          <p className="text-gray-600 mb-8">Discover handpicked properties from verified owners and premium developers</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Buy Properties', count: '8,452', icon: '🏠', description: 'Ready-to-move luxury homes' },
              { title: 'Rent Properties', count: '3,241', icon: '🏢', description: 'Premium rental apartments' },
              { title: 'Commercial', count: '1,876', icon: '🏪', description: 'Business spaces & offices' }
            ].map((category, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">{category.count}</div>
                <p className="text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Advanced Search Filters</h2>
            <p className="text-blue-100 mb-6">Find exactly what you're looking for with our smart filtering system</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
              {['Location', 'Price Range', 'Property Type', 'Amenities'].map((filter, index) => (
                <div key={index} className="bg-white/20 rounded-lg p-3">
                  <div className="font-medium">{filter}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Premium My Properties Page
const PremiumMyProperties = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
            <p className="text-gray-600 mt-2">Manage your property listings and track performance</p>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all">
            + Add New Property
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { status: 'Active', count: 2, color: 'green' },
            { status: 'Under Review', count: 1, color: 'yellow' },
            { status: 'Draft', count: 3, color: 'gray' }
          ].map((item, index) => (
            <div key={index} className={`border-2 border-${item.color}-200 rounded-xl p-6 text-center`}>
              <div className={`text-3xl font-bold text-${item.color}-600 mb-2`}>{item.count}</div>
              <div className="text-lg font-medium text-gray-900">{item.status}</div>
              <div className="text-sm text-gray-600 mt-2">Properties</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Premium Saved Properties Page
const PremiumSaved = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Saved Properties</h1>
          <p className="text-gray-600 mb-8">Your personalized collection of favorite properties</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Property Image {item}</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Property Title {item}</h3>
                  <p className="text-gray-600 text-sm mb-3">Location, Price details</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium">View Details</span>
                    <button className="text-red-500 hover:text-red-700">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Premium Post Property Page
const PremiumPostProperty = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
            <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Why Post on Elite Properties?
          </h1>
          <p className="text-gray-600">Reach verified buyers and get the best price for your property</p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <svg className="h-6 w-6 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Why Post on Elite Properties?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                'Verified Buyers Only',
                'Higher Sale Price',
                'Faster Transactions',
                'Professional Support',
                'Market Insights',
                'Secure Process'
              ].map((benefit, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Get Started in 3 Simple Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '1', title: 'Property Details', desc: 'Add photos, description, and pricing' },
                { step: '2', title: 'Verification', desc: 'Our team verifies your property' },
                { step: '3', title: 'Go Live', desc: 'Your property reaches premium buyers' }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                    {step.step}
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all">
                Start Posting Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Premium Messages Page
const PremiumMessages = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Messages</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 cursor-pointer">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                      U{item}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">User {item}</div>
                      <div className="text-sm text-gray-600 truncate">Last message preview...</div>
                    </div>
                    <div className="text-xs text-gray-500">2h</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="md:w-2/3 bg-gray-50 rounded-xl p-6">
            <div className="text-center text-gray-500 py-12">
              <svg className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PremiumRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PremiumRoute>
            <PremiumHome />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/explore" 
        element={
          <PremiumRoute>
            <PropertySearch />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/buy" 
        element={
          <PremiumRoute>
            <PropertySearch />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/rent" 
        element={
          <PremiumRoute>
            <PropertySearch />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/commercial" 
        element={
          <PremiumRoute>
            <PropertySearch />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/property/:id" 
        element={
          <PremiumRoute>
            <PropertyDetails />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/my-properties" 
        element={
          <PremiumRoute>
            <PremiumMyProperties />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/saved" 
        element={
          <PremiumRoute>
            <PremiumSaved />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/post" 
        element={
          <PremiumRoute>
            <PostProperty />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/post/success" 
        element={
          <PremiumRoute>
            <PostPropertySuccess />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/messages" 
        element={
          <PremiumRoute>
            <PremiumMessages />
          </PremiumRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <PremiumRoute>
            <div className="min-h-screen bg-gray-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-4">Premium Member Benefits</h2>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Priority customer support
                        </li>
                        <li className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Exclusive property previews
                        </li>
                        <li className="flex items-center">
                          <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Advanced search filters
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PremiumRoute>
        } 
      />
      <Route 
        path="/alerts" 
        element={
          <PremiumRoute>
            <div className="min-h-screen bg-gray-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">Property Alerts</h1>
                  <div className="text-center py-12">
                    <svg className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <p className="text-gray-600">Set up alerts to get notified about properties matching your criteria</p>
                  </div>
                </div>
              </div>
            </div>
          </PremiumRoute>
        } 
      />
      <Route 
        path="/help" 
        element={
          <PremiumRoute>
            <div className="min-h-screen bg-gray-50">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      { title: 'Getting Started', desc: 'Learn how to use Elite Properties', icon: '🚀' },
                      { title: 'Property Listings', desc: 'Guides for posting properties', icon: '🏠' },
                      { title: 'Account Settings', desc: 'Manage your profile and preferences', icon: '⚙️' },
                      { title: 'Premium Features', desc: 'Understanding member benefits', icon: '⭐' }
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="text-3xl mb-3">{item.icon}</div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </PremiumRoute>
        } 
      />
      <Route 
        path="*" 
        element={<Navigate to="/premium" replace />} 
      />
    </Routes>
  );
};

export default PremiumRoutes;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserProperties = () => {
  const [properties] = useState([
    {
      id: 1,
      title: 'Luxury Villa in Beverly Hills',
      price: '₹15 Cr',
      location: 'Beverly Hills, CA',
      image: '/api/placeholder/300/200',
      status: 'approved',
      postedDate: '2024-01-15',
      views: 1247
    },
    {
      id: 2,
      title: 'Modern Apartment in Manhattan',
      price: '₹8 Cr',
      location: 'Manhattan, NY',
      image: '/api/placeholder/300/200',
      status: 'pending',
      postedDate: '2024-01-20',
      views: 892
    },
    {
      id: 3,
      title: 'Penthouse in Dubai Marina',
      price: '₹20 Cr',
      location: 'Dubai Marina, UAE',
      image: '/api/placeholder/300/200',
      status: 'rejected',
      postedDate: '2024-01-25',
      views: 2156
    },
    {
      id: 4,
      title: 'Seaside Mansion in Malibu',
      price: '₹25 Cr',
      location: 'Malibu, CA',
      image: '/api/placeholder/300/200',
      status: 'approved',
      postedDate: '2024-01-30',
      views: 3421
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-premium-pearl py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-premium-onyx mb-2">My Properties</h1>
              <p className="text-xl text-premium-platinum">
                Manage your property listings and track performance
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/user/post-property"
                className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                + Post New Property
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-premium-sapphire mb-2">
              {properties.length}
            </div>
            <div className="text-premium-onyx font-medium">Total Listings</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {properties.filter(p => p.status === 'approved').length}
            </div>
            <div className="text-premium-onyx font-medium">Approved</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {properties.filter(p => p.status === 'pending').length}
            </div>
            <div className="text-premium-onyx font-medium">Pending Review</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-emerald-500 mb-2">
              {properties.reduce((sum, prop) => sum + prop.views, 0)}
            </div>
            <div className="text-premium-onyx font-medium">Total Views</div>
          </div>
        </div>

        {/* Properties Table */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-premium-platinum/30">
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Property</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Price</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Location</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Status</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Posted</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Views</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(property => (
                  <tr key={property.id} className="border-b border-premium-platinum/20 hover:bg-premium-ivory/10 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-16 h-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-premium-onyx">{property.title}</h3>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 font-bold text-premium-sapphire">{property.price}</td>
                    <td className="py-4 px-4 text-premium-onyx">{property.location}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                        {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-premium-onyx">{formatDate(property.postedDate)}</td>
                    <td className="py-4 px-4 text-premium-onyx">{property.views.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Link
                          to={`/properties/${property.id}`}
                          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          to={`/user/properties/${property.id}/edit`}
                          className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-yellow-200 transition-colors"
                        >
                          Edit
                        </Link>
                        <button className="bg-red-100 text-red-600 px-3 py-1 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {properties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-premium-onyx mb-2">No properties yet</h3>
              <p className="text-premium-platinum mb-6">Start by posting your first property listing</p>
              <Link
                to="/user/post-property"
                className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                Post Your First Property
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProperties;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getUserViewedProperties } from '../../../api/property.api';
import { EmptyState } from '../../../components/common';

const ViewedProperties = () => {
  const { isAuthenticated } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchViewedProperties = async () => {
      try {
        setLoading(true);
        const response = await getUserViewedProperties();
        if (response.success) {
          setProperties(response.data.properties || []);
        } else {
          setError(response.message || 'Failed to load viewed properties');
        }
      } catch (err) {
        setError(err.message || 'Error loading viewed properties');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchViewedProperties();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view your viewed properties.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Recently Viewed Properties</h1>
          <p className="text-gray-600 mt-2">Properties you've recently viewed</p>
        </div>

        {properties.length === 0 ? (
          <EmptyState
            title="No Viewed Properties Yet"
            description="Properties you view will appear here for easy access."
            icon="👁️"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{property.title || 'Property'}</h3>
                  <p className="text-gray-600 mb-2">{property.location || property.locality}, {property.city}</p>
                  <p className="text-lg font-bold text-blue-600">{property.priceTag || `₹${property.price}`}</p>
                  <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>{property.bhk} BHK</span>
                    <span>{property.propertyType}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewedProperties;
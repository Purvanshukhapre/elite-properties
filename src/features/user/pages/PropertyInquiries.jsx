import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { getReceivedEnquiries, getMyProperties } from '../../../api/property.api';
import { EmptyState } from '../../../components/common';

const PropertyInquiries = () => {
  const { isAuthenticated } = useAuth();
  const [enquiries, setEnquiries] = useState([]);
  const [hasProperties, setHasProperties] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // First check if user has properties
        const propertiesResponse = await getMyProperties();
        if (propertiesResponse.success) {
          const userProperties = propertiesResponse.data.properties || [];
          setHasProperties(userProperties.length > 0);
          
          // If user has properties, fetch their inquiries
          if (userProperties.length > 0) {
            const inquiriesResponse = await getReceivedEnquiries();
            if (inquiriesResponse.success) {
              setEnquiries(inquiriesResponse.data.enquiries || []);
            } else {
              setError(inquiriesResponse.message || 'Failed to load inquiries');
            }
          } else {
            // User doesn't have properties, so no inquiries to show
            setEnquiries([]);
          }
        } else {
          setError(propertiesResponse.message || 'Failed to load properties');
        }
      } catch (err) {
        setError(err.message || 'Error loading data');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Log In</h2>
          <p className="text-gray-600">You need to be logged in to view property inquiries.</p>
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
          <h1 className="text-3xl font-bold text-gray-900">Property Inquiries</h1>
          <p className="text-gray-600 mt-2">Inquiries received for your properties</p>
        </div>

        {!hasProperties ? (
          <EmptyState
            title="No Properties Listed"
            description="You don't have any properties listed yet. Once you list a property, inquiries will appear here."
            icon="🏠"
          />
        ) : enquiries.length === 0 ? (
          <EmptyState
            title="No Property Inquiries"
            description="When you receive inquiries for your properties, they will appear here."
            icon="📧"
          />
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inquirer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{inquiry.propertyTitle || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{inquiry.propertyLocation || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{inquiry.inquirerName || 'N/A'}</div>
                      <div className="text-sm text-gray-500">{inquiry.inquirerEmail || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        inquiry.status === 'responded' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inquiry.status || 'New'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {inquiry.message || 'No message'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyInquiries;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHome, FaShareAlt, FaStar } from 'react-icons/fa';
import PremiumNavbar from '../components/PremiumNavbar';

const generatePropertyId = () => `PROP-${Math.floor(Math.random() * 10000)}`;

const PostPropertySuccess = () => {
  const navigate = useNavigate();
  const propertyId = generatePropertyId();

  return (
    <div className="min-h-screen bg-gray-50">
      <PremiumNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <FaCheckCircle className="h-16 w-16 text-green-600" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Property Listed Successfully!</h1>
          <p className="text-xl text-gray-600 mb-8">
            Your property has been submitted for review and will be published shortly.
          </p>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHome className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Property ID</h3>
                <p className="text-gray-600">{propertyId}</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStar className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Status</h3>
                <p className="text-gray-600">Under Review</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaCheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Expected Publish</h3>
                <p className="text-gray-600">Within 24 hours</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">What happens next?</h3>
              <ul className="text-left text-blue-700 space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Our team will review your property listing
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  We'll verify the details and photos
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Your property will be published within 24 hours
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  You'll receive a notification when published
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/premium/my-properties')}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 flex items-center justify-center"
            >
              <FaHome className="mr-2" />
              View My Properties
            </button>
            
            <button
              onClick={() => navigate('/premium')}
              className="px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center"
            >
              <FaShareAlt className="mr-2" />
              Share Property
            </button>
            
            <button
              onClick={() => navigate('/premium/post')}
              className="px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center"
            >
              <FaHome className="mr-2" />
              Post Another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPropertySuccess;
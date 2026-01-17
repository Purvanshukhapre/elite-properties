import React from 'react';
import { FaHome, FaGem, FaBriefcase, FaBuilding } from 'react-icons/fa';

const BuyerCategories = () => {
  const categories = [
    {
      id: 'first-time',
      title: 'First-Time Buyers',
      subtitle: 'Your first home',
      description: 'Expert guidance for your first property purchase with special financing options and market insights.',
      icon: <FaHome className="text-4xl" />,
      stats: { buyers: '15,000+', success: '98%' }
    },
    {
      id: 'luxury',
      title: 'Luxury Seekers',
      subtitle: 'Premium properties',
      description: 'Access to exclusive luxury properties with unparalleled amenities and services for the discerning buyer.',
      icon: <FaGem className="text-4xl" />,
      stats: { properties: '2,500+', value: '$15B+' }
    },
    {
      id: 'investors',
      title: 'Investors',
      subtitle: 'Portfolio growth',
      description: 'Strategic investment opportunities with high ROI potential and comprehensive market analysis.',
      icon: <FaBriefcase className="text-4xl" />,
      stats: { deals: '8,000+', roi: '12% avg' }
    },
    {
      id: 'commercial',
      title: 'Commercial',
      subtitle: 'Business ventures',
      description: 'Prime commercial real estate opportunities for business expansion and investment diversification.',
      icon: <FaBuilding className="text-4xl" />,
      stats: { spaces: '1,200+', area: '2M+ sqft' }
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            For Every Buyer
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tailored services for every stage of your real estate journey
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group relative overflow-hidden rounded-2xl bg-white border border-gray-200 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 transform transition-all duration-300 hover:-translate-y-2 ${
                category.id === 'luxury' || category.id === 'first-time' ? 'lg:col-span-1' : 'lg:col-span-1'
              }`}
            >
              {/* 3D Effect Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 p-8 h-full">
                <div className="flex flex-col md:flex-row items-start">
                  {/* Icon Container */}
                  <div className="p-4 rounded-xl bg-blue-600 text-white mb-6 md:mb-0 md:mr-6 shadow-md group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-gray-600 text-sm font-medium uppercase tracking-wide">
                          {category.subtitle}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.title}
                        </h3>
                      </div>
                      
                      {/* Stats */}
                      <div className="hidden md:block text-right">
                        <div className="text-2xl font-bold text-blue-600">{Object.values(category.stats)[0]}</div>
                        <div className="text-xs text-gray-600">{Object.keys(category.stats)[0].replace(/([A-Z])/g, ' $1').trim()}</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* Stats Mobile */}
                    <div className="md:hidden grid grid-cols-2 gap-4 mb-6">
                      {Object.entries(category.stats).map(([key, value]) => (
                        <div 
                          key={key}
                          className="text-center p-3 bg-gray-50 rounded-lg hover:-translate-y-1 transition-transform group-hover:shadow-md"
                        >
                          <div className="text-lg font-bold text-blue-600">{value}</div>
                          <div className="text-xs text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        </div>
                      ))}
                    </div>
                    
                    <button className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 px-6 rounded-lg hover:shadow-md transition-all hover:scale-105 transform">
                      Explore Options
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-16 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gray-50 text-gray-600 font-medium">
              Our Expertise
            </span>
          </div>
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Market Analysis', desc: 'In-depth research and trends', icon: '📊' },
            { title: 'Financing Support', desc: 'Partnerships with top lenders', icon: '💰' },
            { title: 'Legal Guidance', desc: 'Expert legal consultation', icon: '⚖️' }
          ].map((service, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-xl border border-gray-200 text-center hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2"
            >
              {/* 3D Effect Layer */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full mb-4 text-white text-2xl hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h4>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerCategories;
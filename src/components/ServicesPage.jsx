import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMoneyCheckAlt, FaLandmark, FaCalculator, FaFileContract, FaHandshake } from 'react-icons/fa';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Property Buying",
      description: "Find and acquire your dream property with our expert guidance and market analysis.",
      icon: <FaHome className="w-8 h-8" />,
      features: ["Market Research", "Property Tours", "Negotiation", "Closing Support"],
      color: "from-blue-600 to-blue-700"
    },
    {
      id: 2,
      title: "Property Selling",
      description: "Maximize your property value with our comprehensive selling services and marketing strategy.",
      icon: <FaMoneyCheckAlt className="w-8 h-8" />,
      features: ["Free Valuation", "Marketing Strategy", "Showings", "Negotiation"],
      color: "from-green-600 to-green-700"
    },
    {
      id: 3,
      title: "Investment Consulting",
      description: "Expert advice on real estate investments and portfolio management strategies.",
      icon: <FaLandmark className="w-8 h-8" />,
      features: ["Market Analysis", "ROI Projections", "Risk Assessment", "Portfolio Review"],
      color: "from-purple-600 to-purple-700"
    },
    {
      id: 4,
      title: "Mortgage Assistance",
      description: "Navigate the mortgage process with our financial experts and lender connections.",
      icon: <FaCalculator className="w-8 h-8" />,
      features: ["Rate Comparison", "Application Support", "Documentation", "Approval Guidance"],
      color: "from-orange-600 to-orange-700"
    },
    {
      id: 5,
      title: "Legal Services",
      description: "Comprehensive legal support for all your real estate transactions and contracts.",
      icon: <FaFileContract className="w-8 h-8" />,
      features: ["Contract Review", "Title Search", "Closing Documents", "Legal Advice"],
      color: "from-red-600 to-red-700"
    },
    {
      id: 6,
      title: "Property Management",
      description: "End-to-end property management services for landlords and investors.",
      icon: <FaHandshake className="w-8 h-8" />,
      features: ["Tenant Screening", "Maintenance", "Rent Collection", "Financial Reporting"],
      color: "from-teal-600 to-teal-700"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Same as Homepage */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source
              src="/14576713_3840_2160_25fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Comprehensive Real Estate
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Services
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
              End-to-end solutions for all your real estate needs and goals
            </p>
            
            {/* Trust Badge */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 inline-block">
              <p className="text-base">
                <span className="font-bold text-yellow-400">Trusted by 15,000+</span> clients
                <span className="mx-2">•</span>
                Complete Real Estate Solutions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Listings */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive real estate solutions tailored to your specific needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 transform transition-all duration-300 hover:-translate-y-2 relative overflow-hidden group"
              >
                {/* 3D Effect Layer */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="mb-8">
                      <p className="font-semibold text-gray-800 mb-3">Key Features:</p>
                      <ul className="space-y-2">
                        {service.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-600">
                            <div className={`w-2 h-2 bg-gradient-to-r ${service.color} rounded-full mr-3`}></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link
                      to={`/contact`}
                      className={`block w-full bg-gradient-to-r ${service.color} text-white text-center py-4 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all`}
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
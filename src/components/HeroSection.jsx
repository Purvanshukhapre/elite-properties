import React from 'react';
import { FaSearch, FaMapMarkerAlt, FaHome, FaBuilding, FaLandmark, FaArrowRight } from 'react-icons/fa';
import { RevealOnScroll } from './ScrollAwareComponent';
import { BRAND } from '../constants/brand';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white to-gray-100">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover hero-image-scale opacity-90 brightness-[0.7] saturate-[0.85]"
          poster="" // Optional: fallback image
        >
          <source src="/6026355_People_Person_3840x2160.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Enhanced cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="text-center max-w-5xl mx-auto">
            {/* Trust Badge - More Subtle */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/15">
              <svg className="w-3 h-3 mr-2 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-white/80 text-xs font-medium">
                Trusted by 15,000+ buyers
              </span>
            </div>
            
            {/* Main Title - Split into 2 visual lines */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight text-white max-w-4xl text-center mx-auto">
              <span className="block text-white">
                Find Homes That
              </span>
              <span className="block font-extrabold mt-2 text-white">
                Match Your Life
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl font-normal text-center mx-auto">
              Buy, sell, or invest with confidence
            </p>

            {/* Search Card - Statement Piece */}
            <div className="bg-white/20 backdrop-blur-xl rounded-2xl p-7 shadow-2xl max-w-4xl mx-auto mb-10 relative overflow-hidden border border-white/30">
              
              {/* Integrated Segmented Control */}
              <div className="flex justify-center mb-6">
                <div className="inline-flex bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20">
                  <button className="px-6 py-3 text-sm font-medium text-white bg-white/20 rounded-lg transition-all duration-300 shadow-sm border border-white/30">
                    Buy
                  </button>
                  <button className="px-6 py-3 text-sm font-medium text-white/80 hover:text-white transition-all duration-300">
                    Rent
                  </button>
                  <button className="px-6 py-3 text-sm font-medium text-white/80 hover:text-white transition-all duration-300">
                    Sell
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-2 relative z-10">
                <div className="flex-1 relative">
                  <FaMapMarkerAlt className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70" />
                  <input
                    type="text"
                    placeholder="Search by location, property type, or keyword..."
                    className="w-full pl-12 pr-4 py-5 bg-white/10 border border-white/20 rounded-xl outline-none text-white placeholder-white/60 transition-all duration-500 focus:border-white/40 focus:ring-4 focus:ring-white/10 backdrop-blur-sm"
                  />
                </div>
                <button 
                  className="bg-white/20 backdrop-blur-lg text-white font-medium py-4 px-8 rounded-xl transition-all duration-500 flex items-center justify-center group relative overflow-hidden shadow-lg hover:shadow-2xl border border-white/30 hover:bg-white/30"
                >
                  <span className="relative z-10">Search Properties</span>
                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
};

export default HeroSection;
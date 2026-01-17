import React, { useState } from 'react';
import { FaQuoteLeft, FaStar, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { RevealOnScroll } from './ScrollAwareComponent';

const BlogInsights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Home Buyer',
      content: 'The team helped us find our dream home in record time. Their attention to detail and market knowledge was exceptional.',
      rating: 5,
      date: 'March 2024',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Property Investor',
      content: 'Outstanding service for our investment portfolio. They provided valuable insights that led to successful acquisitions.',
      rating: 5,
      date: 'February 2024',
      avatar: 'https://randomuser.me/api/portraits/men/44.jpg'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Luxury Property Owner',
      content: 'From marketing to sale, the process was seamless. They achieved a price above our expectations.',
      rating: 5,
      date: 'January 2024',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Understanding Current Market Trends',
      excerpt: 'Analysis of the current real estate market and what it means for buyers and sellers.',
      date: 'March 15, 2024',
      readTime: '5 min read',
      category: 'Market Insights'
    },
    {
      id: 2,
      title: 'First-Time Home Buyer Guide',
      excerpt: 'Essential tips and advice for first-time home buyers in today\'s market.',
      date: 'March 10, 2024',
      readTime: '7 min read',
      category: 'Buying Guide'
    },
    {
      id: 3,
      title: 'Investment Property Strategies',
      excerpt: 'Effective strategies for selecting and managing investment properties.',
      date: 'March 5, 2024',
      readTime: '6 min read',
      category: 'Investing'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="py-16 px-4 bg-white">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto">
          {/* Testimonials Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Client Testimonials
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Hear from our satisfied clients
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm">
                <FaQuoteLeft className="text-blue-600 text-4xl mb-6 mx-auto" />
                
                <div key={currentIndex} className="mb-8 transition-all duration-500">
                  <p className="text-xl text-gray-900 mb-6 leading-relaxed">
                    "{testimonials[currentIndex].content}"
                  </p>
                  
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 text-lg mr-1" />
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
                      <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {testimonials[currentIndex].date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-3 rounded-full border border-gray-200 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <div className="flex justify-center mt-6 space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Market Insights
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Latest news and analysis from the real estate market
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 text-sm rounded-full font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-600">
                        <FaCalendarAlt className="mr-1" />
                        {post.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors relative">
                      {post.title}
                      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <FaUser className="mr-2" />
                      {post.readTime}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default BlogInsights;
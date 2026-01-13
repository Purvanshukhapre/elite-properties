import React, { useState } from 'react';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { FaQuoteLeft, FaStar, FaCalendarAlt, FaUser } from 'react-icons/fa';
import { RevealOnScroll } from './ScrollAwareComponent';
import { COLORS } from '../constants/brand';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-16 px-4 bg-gradient-to-b from-gray-50 to-soft-gray">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto">
          {/* Testimonials Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Client Testimonials
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                Hear from our satisfied clients
              </p>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <motion.div
                className="bg-soft-gray rounded-2xl p-8 md:p-12 text-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <FaQuoteLeft className="text-primary-blue text-4xl mb-6 mx-auto" />
                
                <motion.div
                  key={currentIndex}
                  variants={itemVariants}
                  className="mb-8"
                >
                  <p className="text-xl text-text-primary mb-6 leading-relaxed">
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
                      <h4 className="font-bold text-text-primary">{testimonials[currentIndex].name}</h4>
                      <p className="text-text-secondary">{testimonials[currentIndex].role}</p>
                      <p className="text-sm text-text-secondary flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {testimonials[currentIndex].date}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={prevTestimonial}
                    className="p-3 rounded-full border border-border-color hover:bg-primary-blue hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-3 rounded-full border border-border-color hover:bg-primary-blue hover:text-white transition-colors"
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
                        index === currentIndex ? 'bg-primary-blue' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Blog Posts Section */}
          <div>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                Market Insights
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto text-lg">
                Latest news and analysis from the real estate market
              </p>
            </div>

            <motion.div
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {blogPosts.map((post) => (
                <motion.article
                  key={post.id}
                  variants={itemVariants}
                  className="bg-white rounded-xl border border-border-color overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
                  whileHover={{ y: -5 }}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-primary-blue/10 text-primary-blue text-sm rounded-full font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center text-sm text-text-secondary">
                        <FaCalendarAlt className="mr-1" />
                        {post.date}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary-blue transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-text-secondary mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm text-text-secondary">
                      <FaUser className="mr-2" />
                      {post.readTime}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default BlogInsights;
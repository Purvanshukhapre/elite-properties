import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaGem, FaBriefcase, FaBuilding } from 'react-icons/fa';
import { fadeInUp, staggerContainer } from '../../design-system/motion';

const BuyerCategories = () => {
  const categories = [
    {
      id: 'first-time',
      title: 'First-Time Buyers',
      subtitle: 'Your first home',
      description: 'Expert guidance for your first property purchase with special financing options and market insights.',
      icon: <FaHome className="text-3xl" />,
      color: "from-blue-600 to-blue-500",
      link: '/buy'
    },
    {
      id: 'luxury',
      title: 'Luxury Seekers',
      subtitle: 'Premium properties',
      description: 'Access to exclusive luxury properties with unparalleled amenities and services for the discerning buyer.',
      icon: <FaGem className="text-3xl" />,
      color: "from-purple-600 to-purple-500",
      link: '/buy'
    },
    {
      id: 'investors',
      title: 'Investors',
      subtitle: 'Portfolio growth',
      description: 'Strategic investment opportunities with high ROI potential and comprehensive market analysis.',
      icon: <FaBriefcase className="text-3xl" />,
      color: "from-emerald-600 to-emerald-500",
      link: '/rent'
    },
    {
      id: 'commercial',
      title: 'Commercial',
      subtitle: 'Business ventures',
      description: 'Prime commercial real estate opportunities for business expansion and investment diversification.',
      icon: <FaBuilding className="text-3xl" />,
      color: "from-gray-700 to-gray-600",
      link: '/commercial'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-20"
        >
          <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-medium text-gray-900 mb-6">
            Curated For Every Goal
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
            Whether buying your first home or expanding a portfolio, our specialized teams are ready to serve.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {categories.map((category) => (
            <Link key={category.id} to={category.link} className="block h-full">
              <motion.div
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group bg-gray-50 rounded-3xl p-8 hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-gray-100 h-full cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  {category.icon}
                </div>

                <div className="mb-4">
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{category.subtitle}</span>
                  <h3 className="text-2xl font-display font-medium text-gray-900 mt-2 group-hover:text-premium-sapphire transition-colors">{category.title}</h3>
                </div>

                <p className="text-gray-500 font-light leading-relaxed mb-8">
                  {category.description}
                </p>

                <span className="text-premium-gold font-bold text-sm uppercase tracking-wider flex items-center group-hover:translate-x-2 transition-transform">
                  Explore
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BuyerCategories;
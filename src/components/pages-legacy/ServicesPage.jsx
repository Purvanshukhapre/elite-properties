import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaMoneyCheckAlt, FaLandmark, FaCalculator, FaFileContract, FaHandshake } from 'react-icons/fa';
import PageHeader from '../common/PageHeader';
import { fadeInUp, staggerContainer } from '../../design-system/motion';

const ServicesPage = () => {
  const services = [
    {
      id: 1,
      title: "Buying",
      description: "Access exclusive off-market listings and expert guidance to find your perfect property.",
      icon: <FaHome className="w-8 h-8" />,
      features: ["Market Analysis", "Private Tours", "Negotiation", "Closing Support"],
      color: "bg-blue-50 text-blue-600"
    },
    {
      id: 2,
      title: "Selling",
      description: "Maximize your returns with our strategic marketing and global network of high-net-worth buyers.",
      icon: <FaMoneyCheckAlt className="w-8 h-8" />,
      features: ["Asset Valuation", "Global Marketing", "Staging", "Deal Structure"],
      color: "bg-emerald-50 text-emerald-600"
    },
    {
      id: 3,
      title: "Consulting",
      description: "Data-driven insights to build and manage a high-performance real estate portfolio.",
      icon: <FaLandmark className="w-8 h-8" />,
      features: ["ROI Projections", "Risk Assessment", "Portfolio Review", "Tax Planning"],
      color: "bg-purple-50 text-purple-600"
    },
    {
      id: 4,
      title: "Financing",
      description: "Tailored financial solutions through our network of private banks and lending institutions.",
      icon: <FaCalculator className="w-8 h-8" />,
      features: ["Bridge Loans", "Jumbo Mortgages", "Equity Release", "Private Lending"],
      color: "bg-orange-50 text-orange-600"
    },
    {
      id: 5,
      title: "Legal",
      description: "Comprehensive legal oversight ensuring airtight contracts and smooth transactions.",
      icon: <FaFileContract className="w-8 h-8" />,
      features: ["Title Search", "Contract Review", "Due Diligence", "Compliance"],
      color: "bg-red-50 text-red-600"
    },
    {
      id: 6,
      title: "Management",
      description: "White-glove property management to protect and enhance your asset's value.",
      icon: <FaHandshake className="w-8 h-8" />,
      features: ["Tenant Relations", "Maintenance", "Reporting", "Concierge"],
      color: "bg-teal-50 text-teal-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Bespoke Services"
        subtitle="A comprehensive suite of real estate solutions tailored to the unique needs of the global elite."
        backgroundImage="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&h=900&fit=crop"
      />

      {/* Intro Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeInUp} className="text-4xl font-display font-medium text-gray-900 mb-6">
              Beyond the Transaction
            </motion.h2>
            <div className="w-24 h-px bg-premium-gold mx-auto mb-8"></div>
            <motion.p variants={fadeInUp} className="text-xl text-gray-500 font-light leading-relaxed">
              At Elite Properties, we understand that luxury real estate is about more than just buying and selling. It is about wealth preservation, lifestyle curation, and legacy building. Our vertically integrated services ensure every aspect of your real estate journey is managed with precision and discretion.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>

                <h3 className="text-2xl font-display text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed mb-8 h-20">
                  {service.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-gray-50">
                  {service.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-center text-sm font-medium text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mr-3 group-hover:bg-premium-gold transition-colors"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concierge CTA */}
      <section className="py-32 relative overflow-hidden bg-premium-onyx">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1551000673-c155d9d72477?w=1600&h=900&fit=crop"
            alt="Concierge"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-premium-onyx via-transparent to-premium-onyx"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-6">Private Client Concierge</h2>
          <p className="text-xl text-gray-300 font-light mb-10">
            For ultra-high-net-worth individuals, we offer a dedicated Private Client Group providing 24/7 access to our senior leadership and global partners.
          </p>
          <a href="/contact" className="inline-block bg-white text-premium-onyx px-10 py-5 rounded-none uppercase tracking-[0.2em] text-xs font-bold hover:bg-premium-gold hover:text-white transition-colors duration-300">
            Request Access
          </a>
        </div>
      </section>

    </div>
  );
};

export default ServicesPage;
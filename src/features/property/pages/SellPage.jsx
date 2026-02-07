import { useNavigate, Link } from 'react-router-dom';
import { FaCalendarAlt, FaMoneyBillWave, FaHeart } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import PageHeader from '../../../components/common/PageHeader';
import FeaturedPropertyCard from '../../../components/cards/FeaturedPropertyCard';
import { fadeInUp, staggerContainer } from '../../../design-system/motion';
import propertyAPI from '../../../api/property.api';
import React, { useState, useEffect } from 'react';

const SellPage = () => {
  const { isAuthenticated } = useAuth();
  // Selling Process Steps
  const steps = [
    {
      icon: <FaCalendarAlt className="w-8 h-8 text-white" />,
      title: "Valuation & Strategy",
      desc: "We begin with a comprehensive analysis of your property's value and market position, crafting a bespoke strategy to target the right buyers.",
      color: "from-blue-600 to-blue-700"
    },
    {
      icon: <FaMoneyBillWave className="w-8 h-8 text-white" />,
      title: "Global Marketing",
      desc: "Your property is showcased to our proprietary network of high-net-worth individuals and through premium global media channels.",
      color: "from-emerald-600 to-emerald-700"
    },
    {
      icon: <FaHeart className="w-8 h-8 text-white" />,
      title: "Seamless Execution",
      desc: "From viewings to negotiation and closing, our white-glove service handles every detail, ensuring a stress-free transaction.",
      color: "from-purple-600 to-purple-700"
    }
  ];

  const [showcaseProperties, setShowcaseProperties] = useState([]);

  useEffect(() => {
    const fetchShowcase = async () => {
      try {
        const res = await propertyAPI.getAllProperties({ limit: 3 });
        const list = res?.data?.posts || res?.data || [];
        setShowcaseProperties(list);
      } catch (err) {
        console.error('SellPage showcase fetch error:', err);
        setShowcaseProperties([]);
      }
    };

    fetchShowcase();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Sell With Confidence"
        subtitle="Unlocking the true value of your asset through world-class marketing and negotiation."
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&h=900&fit=crop"
      />

      {/* Process Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-premium-gold font-bold tracking-widest text-xs uppercase mb-4 block">The Process</span>
            <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">Mastering the Sale</h2>
            <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
              Our proven methodology combines art and science to achieve exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform`}>
                  {step.icon}
                </div>
                <h3 className="text-2xl font-display text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories / Active Listings */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-display font-medium text-gray-900 mb-2">Recent Success</h2>
              <p className="text-gray-500 font-light">A track record of excellence across global markets.</p>
            </div>
            <Link
              to={isAuthenticated ? "/user/seller/post-property" : "/login?redirect=/user/seller/post-property"}
              className="inline-block bg-premium-onyx text-white px-8 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-premium-gold transition-colors duration-300"
            >
              List Your Property
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseProperties.map((property, idx) => (
              <div key={property.id} className="h-[520px]">
                <FeaturedPropertyCard property={property} index={idx} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SellPage;
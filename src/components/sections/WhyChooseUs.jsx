import React from 'react';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaMapMarkedAlt, FaCheckCircle, FaAward, FaUserTie, FaClock } from 'react-icons/fa';
import { fadeInUp, staggerContainer } from '../../design-system/motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Trusted Legacy",
      description: "Over two decades of excellence in the luxury real estate market."
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Local Expertise",
      description: "Deep, data-driven knowledge of the most sought-after neighborhoods."
    },
    {
      icon: <FaCheckCircle />,
      title: "Verified Listings",
      description: "Every property is rigorously vetted for quality and authenticity."
    },
    {
      icon: <FaAward />,
      title: "Award Winning",
      description: "Recognized globally for outstanding service and results."
    },
    {
      icon: <FaUserTie />,
      title: "Dedicated Agents",
      description: "A team of top-tier professionals committed to your success."
    },
    {
      icon: <FaClock />,
      title: "24/7 Support",
      description: "Round-the-clock availability for our global clientele."
    }
  ];

  return (
    <section className="py-24 bg-premium-onyx text-white relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-premium-sapphire/20 blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-full bg-premium-gold/10 blur-[100px]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Header Content */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.span variants={fadeInUp} className="text-premium-gold font-bold tracking-widest text-xs uppercase mb-4 block">
              Why Elite Properties
            </motion.span>
            <motion.h2 variants={fadeInUp} className="text-4xl md:text-5xl font-display font-medium mb-6 leading-tight text-white">
              Redefining the Standard <br /> of Luxury Real Estate
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-gray-300 text-lg font-light leading-relaxed mb-8 max-w-lg">
              We combine traditional white-glove service with modern technology to deliver an unmatched experience for buyers, sellers, and investors.
            </motion.p>
            <motion.button variants={fadeInUp} className="bg-white text-premium-onyx px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-premium-gold hover:text-white transition-all duration-300">
              Get to Know Us
            </motion.button>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-premium-gold text-2xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-display font-medium mb-2">{feature.title}</h3>
                <p className="text-gray-400 font-light text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
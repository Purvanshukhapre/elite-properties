import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop"
          alt="Luxury Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-premium-onyx/80"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-medium mb-6"
        >
          Ready to Find Your Sanctuary?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-200 font-light mb-10 max-w-2xl mx-auto"
        >
          Begin your journey with Elite Properties. Our portfolio of exclusive homes waits for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link to="/properties" className="px-10 py-4 bg-premium-gold text-premium-onyx font-bold uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white transition-all duration-300">
            Browse Listings
          </Link>
          <Link to="/contact" className="px-10 py-4 bg-transparent border border-white text-white font-bold uppercase tracking-[0.2em] text-xs rounded-full hover:bg-white hover:text-black transition-all duration-300">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

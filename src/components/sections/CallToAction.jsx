import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="relative py-36 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop"
          alt="Luxury Interior"
          className="w-full h-full object-cover brightness-[0.75] contrast-110"
        />
        <div className="absolute inset-0 bg-gray-900/80"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display font-normal mb-6"
        >
          Your Sanctuary Awaits.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-200 font-light mb-10 max-w-2xl mx-auto"
        >
          Begin your journey with Elite Properties. Our portfolio of exclusive homes waits for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link to="/properties" className="px-8 py-3.5 bg-amber-600/80 text-premium-onyx font-medium text-sm rounded-lg hover:bg-amber-600 transition-all duration-300">
            Explore Our Collection
          </Link>
          <Link to="/contact" className="text-gray-300/70 font-medium text-sm hover:text-white transition-all duration-300 underline-offset-4 hover:underline">
            Contact Us
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;

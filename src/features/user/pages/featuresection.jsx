import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const AnimatedFeaturedProperties = ({ properties }) => {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % properties.length);
    }, 6000); // slow & premium
    return () => clearInterval(interval);
  }, [properties.length]);

  const property = properties[active];

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-24 items-center min-h-[600px]">

      <AnimatePresence mode="wait">

        {/* IMAGE */}
        <motion.div
          key={property.id + "-image"}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative"
        >
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-[520px] object-cover rounded-3xl shadow-2xl"
          />

          {/* Price pill */}
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur px-6 py-3 rounded-full text-lg font-semibold shadow-lg">
            {property.price}
          </div>
        </motion.div>

      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* CONTENT */}
        <motion.div
          key={property.id + "-content"}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <p className="text-sm uppercase tracking-widest text-gray-400 mb-4">
            {property.type}
          </p>

          <h3 className="text-4xl font-bold mb-6">
            {property.title}
          </h3>

          <p className="text-lg text-gray-600 leading-relaxed mb-10">
            {property.description}
          </p>

          <div className="flex gap-12 mb-12">
            <div>
              <p className="text-sm text-gray-400 mb-1">Annual Return</p>
              <p className="text-2xl font-bold">
                {property.annualReturn}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400 mb-1">Appreciation</p>
              <p className="text-2xl font-bold">
                {property.appreciation}
              </p>
            </div>
          </div>

          <div className="flex gap-8">
            <Link
              to={`/property/${property.id}`}
              className="px-10 py-4 bg-gray-900 text-white rounded-xl text-lg font-semibold hover:bg-gray-800 transition"
            >
              Explore Property
            </Link>

            <Link
              to="/user/buy"
              className="text-lg font-semibold border-b-2 border-gray-900 pb-1"
            >
              View all →
            </Link>
          </div>
        </motion.div>

      </AnimatePresence>

      {/* PROGRESS INDICATOR */}
      <div className="absolute bottom-[-60px] left-0 flex gap-3">
        {properties.map((_, i) => (
          <div
            key={i}
            className={`h-[3px] rounded-full transition-all duration-500 ${
              i === active ? "w-12 bg-gray-900" : "w-6 bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
export default AnimatedFeaturedProperties;
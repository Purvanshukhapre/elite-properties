import React from 'react';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Luxury Home Buyer",
      content: "The attention to detail and personalized service was unlike anything I've experienced. They found us an off-market gem that exceeded all expectations.",
      location: "Beverly Hills, CA",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Property Investor",
      content: "Their market analysis is second to none. The team helped me identify high-yield opportunities that perfectly matched my investment strategy.",
      location: "New York, NY",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Emily Rodriguez",
      role: "Seller",
      content: "Professional, discreet, and incredibly effective. They managed the sale of our estate with absolute precision and achieved a record price.",
      location: "Miami, FL",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-premium-gold font-bold tracking-widest text-xs uppercase mb-4 block">Testimonials</span>
          <h2 className="text-4xl font-display font-medium text-gray-900">Client Stories</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar key={s} className="text-premium-gold w-4 h-4" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-8 text-base">
                "{testimonial.content}"
              </p>

              {/* Client Info */}
              <div className="flex items-center pt-6 border-t border-gray-100">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 shadow-md"
                />
                <div>
                  <h4 className="text-base font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                  <p className="text-xs text-gray-400">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
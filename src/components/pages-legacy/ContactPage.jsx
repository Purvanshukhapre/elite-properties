import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import PageHeader from '../common/PageHeader';
import { fadeInUp, staggerContainer } from '../../design-system/motion';

const ContactPage = () => {
  const [focusedField, setFocusedField] = useState(null);

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      title: "Global Headquarters",
      details: ["1920 Wilshire Blvd, Suite 500", "Beverly Hills, CA 90210"]
    },
    {
      icon: <FaPhone className="text-xl" />,
      title: "Direct Line",
      details: ["+1 (310) 555-0123", "+1 (800) 555-0199"]
    },
    {
      icon: <FaEnvelope className="text-xl" />,
      title: "Email",
      details: ["private@eliteproperties.com", "press@eliteproperties.com"]
    },
    {
      icon: <FaClock className="text-xl" />,
      title: "Concierge Hours",
      details: ["Mon - Fri: 8am - 8pm PST", "Sat - Sun: By Appointment"]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Get in Touch"
        subtitle="For inquiries regarding our exclusive listings or to discuss listing your own property, please contact our team."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=900&fit=crop"
      />

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20">

            {/* Contact Info Side */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-12"
            >
              <div>
                <span className="text-premium-gold font-bold tracking-widest text-xs uppercase mb-4 block">Connect</span>
                <h2 className="text-4xl font-display font-medium text-gray-900 mb-6">Let's Discuss Your Vision</h2>
                <p className="text-gray-500 font-light leading-relaxed text-lg">
                  Whether you are looking to acquire a trophy asset or discreetly sell a significant property, our team is ready to provide the expert guidance you deserve.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-10">
                {contactInfo.map((item, idx) => (
                  <motion.div key={idx} variants={fadeInUp}>
                    <div className="w-12 h-12 bg-premium-onyx text-premium-gold rounded-full flex items-center justify-center mb-4">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">{item.title}</h3>
                    {item.details.map((line, lIdx) => (
                      <p key={lIdx} className="text-gray-500 font-light">{line}</p>
                    ))}
                  </motion.div>
                ))}
              </div>

              {/* Static Map Visual */}
              <div className="mt-12 h-64 bg-gray-100 rounded-none overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop"
                  alt="Map Location"
                  className="w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white px-4 py-2 shadow-xl flex items-center gap-2">
                    <div className="w-2 h-2 bg-premium-gold rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider text-premium-onyx">Beverly Hills HQ</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form Side */}
            <div className="bg-gray-50 p-10 lg:p-14 border border-gray-100 h-fit">
              <h3 className="text-2xl font-display font-medium text-gray-900 mb-8">Send a Message</h3>
              <form className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* First Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-premium-gold transition-colors text-gray-900 font-medium pt-5"
                      placeholder=" "
                      onFocus={() => setFocusedField('firstName')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${focusedField === 'firstName' ? '-top-1 text-xs text-premium-gold' : 'top-4 text-gray-400'}`}>
                      First Name
                    </label>
                  </div>

                  {/* Last Name */}
                  <div className="relative group">
                    <input
                      type="text"
                      className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-premium-gold transition-colors text-gray-900 font-medium pt-5"
                      placeholder=" "
                      onFocus={() => setFocusedField('lastName')}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label className="absolute left-0 top-4 text-gray-400 pointer-events-none transition-all duration-300 group-focus-within:-top-1 group-focus-within:text-xs group-focus-within:text-premium-gold">
                      Last Name
                    </label>
                  </div>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-premium-gold transition-colors text-gray-900 font-medium pt-5"
                    placeholder=" "
                  />
                  <label className="absolute left-0 top-4 text-gray-400 pointer-events-none transition-all duration-300 group-focus-within:-top-1 group-focus-within:text-xs group-focus-within:text-premium-gold">
                    Email Address
                  </label>
                </div>

                {/* Subject */}
                <div className="relative group">
                  <select
                    className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-premium-gold transition-colors text-gray-700 font-medium pt-5 appearance-none rounded-none"
                  >
                    <option value="" disabled selected>Select Inquiry Type</option>
                    <option value="buying">Buying a Property</option>
                    <option value="selling">Selling a Property</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div className="relative group">
                  <textarea
                    rows="4"
                    className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-premium-gold transition-colors text-gray-900 font-medium pt-5 resize-none"
                    placeholder=" "
                  ></textarea>
                  <label className="absolute left-0 top-4 text-gray-400 pointer-events-none transition-all duration-300 group-focus-within:-top-1 group-focus-within:text-xs group-focus-within:text-premium-gold">
                    Message details...
                  </label>
                </div>

                <button className="w-full bg-premium-onyx text-white py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-premium-gold transition-colors duration-500 shadow-lg mt-4">
                  Submit Inquiry
                </button>

                <p className="text-xs text-gray-400 text-center font-light pt-4">
                  Your information is kept strictly confidential in accordance with our <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
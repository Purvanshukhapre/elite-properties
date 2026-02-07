import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaChartLine, FaAward, FaHandshake } from 'react-icons/fa';
import PageHeader from '../common/PageHeader';
import { fadeInUp, staggerContainer } from '../../design-system/motion';

const AboutPage = () => {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "$2.5B", label: "Volume Sold" },
    { number: "350+", label: "Exclusive Listings" },
    { number: "Global", label: "Presence" }
  ];

  const values = [
    {
      title: "Integrity First",
      desc: "We believe in absolute transparency and ethical conduct in every transaction, ensuring your peace of mind."
    },
    {
      title: "Market Mastery",
      desc: "Deep local knowledge combined with global market insights allows us to position your assets perfectly."
    },
    {
      title: "Client Obsession",
      desc: "Your goals become our goals. We provide a bespoke concierge experience tailored to your unique lifestyle."
    },
    {
      title: "Architectural Curation",
      desc: "We don't just sell houses; we curate architectural masterpieces that define luxury living."
    }
  ];

  const team = [
    { name: "Alexandra Sterling", role: "Founder & Principal", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1000&fit=crop" },
    { name: "Julian Thorne", role: "Head of Sales", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=1000&fit=crop" },
    { name: "Elena Vatore", role: "Design Director", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=1000&fit=crop" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeader
        title="Our Layout Legacy"
        subtitle="Redefining the art of real estate through integrity, market mastery, and an unwavering commitment to excellence."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=900&fit=crop"
      />

      {/* Introduction / Mission */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 transform translate-x-1/2 z-0"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Text Content */}
            <motion.div
              animate="show"
              variants={staggerContainer}
              className="space-y-8"
            >
              <div>
                <h2 className="text-4xl md:text-5xl font-display font-medium text-gray-900 mb-6 leading-tight">
                  Excellence is not an act, <br />
                  <span className="text-gray-400 italic font-serif">it's a standard.</span>
                </h2>
                <div className="w-20 h-1 bg-premium-gold/30"></div>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Founded in 2008, Elite Properties began with a singular vision: to elevate the real estate experience for the world's most discerning clients. We recognized that luxury is not just a price point—it's an experience, a feeling, and a standard of care.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Today, we stand as a beacon of trust in the global market, connecting exceptional people with extraordinary properties. Our approach combines traditional white-glove service with cutting-edge data analytics, ensuring every decision is informed and every interaction feels effortless.
              </p>
            </motion.div>

            {/* Image Composition */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="aspect-[4/5] rounded-none overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=1000&fit=crop"
                  alt="Minimalist Architecture"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              {/* Overlapping Element */}
              <div className="absolute -bottom-10 -left-10 bg-premium-onyx p-8 text-white max-w-xs shadow-2xl hidden md:block">
                <p className="font-serif italic text-xl leading-relaxed opacity-90">
                  "We don't just facilitate transactions; we curate lifestyles."
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section - Clean & Minimal */}
      <section className="py-20 bg-premium-onyx text-white border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-white/10">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="px-4"
              >
                <div className="text-4xl md:text-5xl font-display font-light text-premium-gold mb-2">{stat.number}</div>
                <div className="text-sm uppercase tracking-[0.2em] opacity-60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-premium-gold font-bold tracking-widest text-xs uppercase mb-4 block">Our Philosophy</span>
            <h2 className="text-4xl font-display text-gray-900">Guiding Principles</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-10 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-premium-gold/10 transition-colors">
                  <div className="w-2 h-2 bg-premium-gold rounded-full"></div>
                </div>
                <h3 className="text-xl font-display text-gray-900 mb-4">{val.title}</h3>
                <p className="text-gray-500 font-light leading-relaxed text-sm">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl font-display text-gray-900 mb-2">Leadership</h2>
              <p className="text-gray-500 font-light">The visionaries behind Elite Properties.</p>
            </div>
            <a href="/contact" className="hidden md:inline-flex items-center text-premium-gold uppercase tracking-widest text-sm hover:text-premium-onyx transition-colors font-medium">
              Join our team <span className="ml-2">→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                viewport={{ once: true }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: idx * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-6 aspect-[3/4] bg-gray-100">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-display text-gray-900">{member.name}</h3>
                <p className="text-premium-gold uppercase tracking-widest text-xs mt-1">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
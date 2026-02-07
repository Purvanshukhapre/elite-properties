import React from 'react';
import { RevealOnScroll } from '../widgets/ScrollAwareComponent';

const LuxuryHighlights = () => {
  const highlights = [
    {
      id: 1,
      title: 'Exclusive Listings',
      description: 'Access to off-market properties and exclusive listings not available elsewhere',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop',
      stats: '500+ Properties'
    },
    {
      id: 2,
      title: 'Global Network',
      description: 'Connections with top agents worldwide for international investments',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      stats: '50+ Countries'
    },
    {
      id: 3,
      title: 'White-Glove Service',
      description: 'Personal concierge service for all your real estate needs',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop',
      stats: '24/7 Support'
    }
  ];

  return (
    <div className="py-16 px-4 bg-gray-50">
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Luxury Highlights
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our premium services that set us apart in the luxury market
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {highlights.map((highlight) => (
              <div
                key={highlight.id}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                
                <div className="p-6">
                  <div className="text-sm font-semibold text-blue-600 mb-2">
                    {highlight.stats}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default LuxuryHighlights;
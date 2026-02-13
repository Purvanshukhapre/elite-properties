import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined } from 'react-icons/fa';
import { motion } from 'framer-motion';


import { fadeInUp, staggerContainer } from '../../design-system/motion';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (isFeatured) => {
  // Just return the div icon without using canvas
  
  
  return L.divIcon({
    html: `<div class="marker-circle ${isFeatured ? 'featured' : 'standard'}" style="background: ${isFeatured ? '#FBBF24' : '#6B7280'}; border: 2px solid #1F2937; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.3);${isFeatured ? 'box-shadow: 0 0 10px rgba(251, 191, 36, 0.5);' : ''}"></div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
  });
};

const PropertyMap = () => {
  const navigate = useNavigate();

  // Real property data with actual California coordinates
  const properties = [
    {
      id: 1,
      title: "Luxury Beachfront Villa",
      price: "$2,450,000",
      address: "Malibu, CA",
      beds: 5,
      baths: 4,
      sqft: 4200,
      lat: 34.0259, // Malibu
      lng: -118.7798,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Modern Downtown Condo",
      price: "$895,000",
      address: "Los Angeles, CA",
      beds: 2,
      baths: 2,
      sqft: 1200,
      lat: 34.0522, // Downtown LA
      lng: -118.2437,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Hillside Luxury Estate",
      price: "$3,750,000",
      address: "Beverly Hills, CA",
      beds: 6,
      baths: 5,
      sqft: 5800,
      lat: 34.0736, // Beverly Hills
      lng: -118.4004,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop",
      featured: true
    },
    {
      id: 4,
      title: "Charming Suburban Home",
      price: "$650,000",
      address: "Santa Monica, CA",
      beds: 3,
      baths: 2,
      sqft: 1800,
      lat: 34.0195, // Santa Monica
      lng: -118.4912,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      featured: false
    }
  ];

  return (
    <section className="py-24 bg-neutral-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.span variants={fadeInUp} className="text-premium-gold font-bold tracking-widest text-xs uppercase mb-4 block">
            Locations
          </motion.span>
          <motion.h2 variants={fadeInUp} className="text-4xl font-display font-medium text-gray-900 mb-6">
            Prime Properties Map
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-xl text-gray-500 font-light max-w-2xl mx-auto">
            Discover our curated selection in the most coveted neighborhoods.
          </motion.p>
        </motion.div>

        <div className="relative rounded-[2.5rem] overflow-hidden shadow-xl bg-white/30 backdrop-blur-sm h-[600px] border border-black/5">
          <MapContainer
            center={[34.0522, -118.3437]}
            zoom={10}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map((property) => (
              <Marker
                key={property.id}
                position={[property.lat, property.lng]}
                icon={createCustomIcon(property.featured)}
              >
                <Popup className="custom-popup" minWidth={280}>
                  <div className="p-4 rounded-xl bg-white shadow-lg">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    <h4 className="font-bold text-gray-900 mb-1">{property.title}</h4>
                    <p className="text-premium-gold font-bold mb-2">{property.price}</p>
                    <div className="flex items-center text-xs text-gray-600 gap-3 mb-3">
                      <span className="flex items-center"><FaBed className="mr-1" /> {property.beds}</span>
                      <span className="flex items-center"><FaBath className="mr-1" /> {property.baths}</span>
                      <span className="flex items-center"><FaRulerCombined className="mr-1" /> {property.sqft}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/properties/${property.id}`)}
                        className="flex-1 bg-white text-premium-onyx py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-premium-gold hover:text-white transition-all duration-250 shadow-sm hover:shadow-md"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate('/contact')}
                        className="flex-1 bg-white/10 backdrop-blur-md text-white border border-white/30 py-2 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-white/20 hover:text-white transition-all duration-250"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default PropertyMap;
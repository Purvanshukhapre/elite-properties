import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaHeart, FaShare, FaExpand, FaBuilding } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';
import { fadeInUp, staggerContainer } from '../../../design-system/motion';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { getPropertyById } from '../../../api/property.api';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [favorites, setFavorites] = useState({});
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { ref, controls } = useScrollReveal();

  useEffect(() => {
    const fetchProperty = async () => {
      setLoading(true);
      try {
        const res = await getPropertyById(id);
        if (res.success && res.data?.propertyPost) {
          setProperty(res.data.propertyPost);
        } else {
          setError(res.message || 'Property not found');
        }
      } catch (err) {
        console.error('Fetch property error:', err);
        setError('Failed to load property details');
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleAction = (action) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    action();
  };

  const toggleFavorite = () => {
    handleAction(() => {
      setFavorites(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-premium-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium animate-pulse uppercase tracking-widest text-xs">Synchronizing Asset Data...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-xl text-center border border-gray-100">
          <div className="text-red-500 text-6xl mb-6">⚠️</div>
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-4 italic">Registry Error</h2>
          <p className="text-gray-500 mb-8 font-medium">{error || 'The requested asset could not be located in our registry.'}</p>
          <button
            onClick={() => navigate('/properties')}
            className="w-full py-4 bg-premium-sapphire text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-900 transition-all shadow-lg"
          >
            Return to Portfolio
          </button>
        </div>
      </div>
    );
  }

  // Mandatory Data Mapping (Strict API Contract)
  const images = property.propertyPics || [];
  const propertyTitle = `${property.bhk} BHK ${property.propertyCategory} in ${property.locality}`;
  const price = property.priceTag || (property.price ? `₹${property.price.toLocaleString()}` : 'Price on Request');
  const address = `${property.locality || ''}, ${property.city}, ${property.state} ${property.pincode || ''}`;

  const specs = [
    { icon: FaBed, label: "Configuration", value: `${property.bhk} BHK` },
    { icon: FaBath, label: "Age", value: `${property.propertyAge} Years` },
    { icon: FaRulerCombined, label: "Build Area", value: property.buildArea ? `${property.buildArea} sqft` : 'N/A' },
    { icon: FaBuilding, label: "Floor", value: property.floor || 'N/A' }
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb - Minimalist */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="text-sm font-medium text-gray-500">
            <ol className="flex items-center space-x-2">
              <li><button onClick={() => navigate('/')} className="hover:text-premium-gold transition-colors">Home</button></li>
              <li><span>/</span></li>
              <li><button onClick={() => navigate('/properties')} className="hover:text-premium-gold transition-colors">Properties</button></li>
              <li><span>/</span></li>
              <li><span className="text-gray-900 line-clamp-1">{propertyTitle}</span></li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Property Header */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="bg-white py-12 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <motion.div variants={fadeInUp}>
              <h1 className="text-3xl md:text-5xl font-display font-bold text-gray-900 mb-3">{propertyTitle}</h1>
              <div className="flex items-center text-gray-600 mb-6 text-lg">
                <FaMapMarkerAlt className="mr-2 text-premium-gold flex-shrink-0" />
                <span>{address}</span>
              </div>
              <div className="text-4xl font-black text-premium-sapphire italic tracking-tight">{price}</div>
            </motion.div>

            <motion.div variants={fadeInUp} className="flex space-x-4 mt-6 md:mt-0">
              <button
                onClick={toggleFavorite}
                className="p-4 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md hover:bg-white transition-all border border-gray-200 group"
              >
                <FaHeart
                  className={`w-6 h-6 transition-colors ${favorites[id]
                    ? 'text-red-500 fill-current'
                    : 'text-gray-400 group-hover:text-red-400'
                    }`}
                />
              </button>
              <button className="p-4 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md hover:bg-white transition-all border border-gray-200">
                <FaShare className="w-6 h-6 text-gray-600" />
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Property Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-7xl mx-auto px-6 py-8"
      >
        <div className="bg-black rounded-[2.5rem] overflow-hidden shadow-2xl relative h-[60vh] border-8 border-white">
          <img
            src={images[currentImageIndex]}
            alt={`${propertyTitle} - View ${currentImageIndex + 1}`}
            className="w-full h-full object-cover opacity-90"
          />
          {/* Gallery Navigation */}
          {images.length > 1 && (
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end">
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${index === currentImageIndex ? 'w-10 bg-premium-gold' : 'w-4 bg-white/50 hover:bg-white/80'
                      }`}
                  />
                ))}
              </div>
              <div className="flex gap-4">
                <button onClick={prevImage} className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10">←</button>
                <button onClick={nextImage} className="p-4 bg-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-white/20 transition-all border border-white/10">→</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Property Details Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">

            {/* Specs */}
            <motion.div
              ref={ref}
              animate={controls}
              variants={staggerContainer}
              initial="hidden"
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {specs.map((spec, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeInUp}
                  className="p-8 bg-white rounded-[2rem] border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center transition-transform hover:scale-105"
                >
                  <spec.icon className="text-3xl text-premium-gold mb-4" />
                  <div className="text-xl font-black text-gray-900 uppercase tracking-tight mb-1 italic">{spec.value}</div>
                  <div className="text-gray-400 uppercase text-[9px] font-black tracking-[0.2em]">{spec.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Description */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6">Asset Intelligence</h3>
              <p className="text-gray-700 text-lg leading-relaxed font-medium">{property.propertyDetails || 'Secure data transmission pending. Contact custodian for intelligence.'}</p>
            </div>

            {/* Features */}
            {property.amenities?.length > 0 && (
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Infrastructure Nodes</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.amenities.map((feature, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-1.5 h-1.5 bg-premium-gold rounded-full mr-3"></div>
                      <span className="text-gray-900 font-bold text-xs uppercase italic tracking-wide">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby */}
            {property.nearbyPlaces?.length > 0 && (
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Proximity Matrix</h3>
                <div className="flex flex-wrap gap-3">
                  {property.nearbyPlaces.map((place, index) => (
                    <span key={index} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-indigo-100">
                      {place}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Videos */}
            {property.propertyVideos?.length > 0 && (
              <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] mb-8">Cinematic Artifacts</h3>
                <div className="grid grid-cols-1 gap-6">
                  {property.propertyVideos.map((url, idx) => (
                    <div key={idx} className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl">
                      <video src={url} controls className="w-full h-full" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Custody Card */}
            <div className="bg-white rounded-[3rem] p-10 shadow-2xl border border-gray-100 sticky top-24">
              <div className="flex items-center mb-10">
                <div className="w-20 h-20 bg-premium-sapphire rounded-3xl flex items-center justify-center text-white text-3xl font-black italic shadow-xl">
                  {property.contactInfo?.[0] || 'E'}
                </div>
                <div className="ml-5">
                  <div className="font-black text-xl text-gray-900 uppercase tracking-tighter italic">Custodian</div>
                  <div className="text-[9px] text-premium-gold font-black uppercase tracking-[0.3em] px-2 py-1 bg-premium-gold/5 rounded-full mt-1">Direct Access</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Verified Transmission</p>
                  <p className="font-black text-xl text-gray-900 tracking-tight">{property.contactInfo}</p>
                </div>

                <button
                  onClick={() => handleAction(() => console.log('Initiating Secure Channel'))}
                  className="w-full py-5 bg-premium-sapphire text-white rounded-[2rem] font-black uppercase tracking-[0.15em] text-xs hover:bg-blue-900 transition-all shadow-xl hover:-translate-y-1"
                >
                  Contact Custodian
                </button>
                <button
                  onClick={() => handleAction(() => console.log('Requesting Intelligence Brief'))}
                  className="w-full py-5 bg-white border-2 border-premium-sapphire text-premium-sapphire rounded-[2rem] font-black uppercase tracking-[0.15em] text-xs hover:bg-blue-50 transition-all"
                >
                  Request Briefing
                </button>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-50 flex justify-between items-center px-2">
                <div className="text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Status</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase text-gray-900">Active</span>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Facing</p>
                  <span className="text-[10px] font-black uppercase text-gray-900 italic">{property.facing}</span>
                </div>
                <div className="text-center">
                  <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Category</p>
                  <span className="text-[10px] font-black uppercase text-gray-900 italic">{property.propertyCategory}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineOfficeBuilding,
  HiOutlineMap,
  HiOutlineCurrencyRupee,
  HiOutlineInformationCircle,
  HiOutlinePlus,
  HiOutlineX,
  HiOutlineArrowRight,
  HiOutlineArrowLeft,
  HiOutlineCheckCircle,
  HiOutlinePhotograph
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { createProperty, uploadPropertyPictures, uploadPropertyVideos } from '../../api/property.api';

const PostProperty = () => {
  const navigate = useNavigate();
  const { setLoginIntent } = useAuth();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    propertyType: 'owner', // owner | lease
    priceTag: '',
    price: '',
    propertyDetails: '',
    contactInfo: '',
    isFurnished: false,
    hasParking: false,
    propertyCategory: 'sale', // sale | rental | commercial_sale | pg | hostel | flatmates | land | plot
    bhk: '',
    floor: '',
    propertyAge: '',
    facing: 'east', // east | west | north | south
    buildArea: '',
    carpetArea: '',
    locality: '',
    city: '',
    state: '',
    pincode: '',
    landmark: '',
    amenities: [],
    nearbyPlaces: []
  });

  const [tempAmenity, setTempAmenity] = useState('');
  const [tempNearby, setTempNearby] = useState('');

  const [createdPropertyId, setCreatedPropertyId] = useState(null);
  const [mediaStep, setMediaStep] = useState(false); // false: form, true: media
  const [uploading, setUploading] = useState({ images: false, videos: false });
  const [mediaFiles, setMediaFiles] = useState({ images: [], videos: [] });
  const [mediaUrls, setMediaUrls] = useState({ images: [], videos: [] });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    const limit = type === 'images' ? 10 : 5;
    if (files.length > limit) {
      setError(`Maximum ${limit} ${type} allowed.`);
      return;
    }
    setMediaFiles(prev => ({ ...prev, [type]: files }));
  };

  const handleArrayAdd = (field, value, setTemp) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setTemp('');
    }
  };

  const handleArrayRemove = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const validateStep = (s) => {
    switch (s) {
      case 1:
        return formData.propertyType && formData.propertyCategory && formData.price && formData.priceTag;
      case 2:
        return formData.bhk !== '' && formData.floor !== '' && formData.propertyAge !== '';
      case 3:
        return formData.buildArea && formData.carpetArea && formData.propertyDetails;
      case 4:
        return formData.locality && formData.city && formData.state && formData.pincode;
      case 5:
        return formData.contactInfo;
      default:
        return true;
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    // Convert numbers
    const payload = {
      ...formData,
      price: Number(formData.price),
      bhk: Number(formData.bhk),
      floor: Number(formData.floor),
      propertyAge: Number(formData.propertyAge),
      buildArea: Number(formData.buildArea),
      carpetArea: Number(formData.carpetArea)
    };

    try {
      const response = await createProperty(payload);
      if (response.success) {
        // Handle BOTH _id and id
        const id = response.data?.propertyPost?._id || response.data?.propertyPost?.id;
        if (id) {
          setCreatedPropertyId(id);
          setMediaStep(true);
        } else {
          setError('Property created but no ID returned from registry.');
        }
      } else {
        setError(response.message || 'Failed to initialize property exhibition.');
      }
    } catch (err) {
      setError('A system synchronization error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (type) => {
    if (!createdPropertyId) {
      setError('Integrity Error: Property ID missing for media synchronization.');
      return;
    }
    if (mediaFiles[type].length === 0) return;

    setUploading(prev => ({ ...prev, [type]: true }));
    setError(null);

    try {
      const apiFunc = type === 'images' ? uploadPropertyPictures : uploadPropertyVideos;
      const response = await apiFunc(createdPropertyId, mediaFiles[type]);

      if (response.success && response.data?.propertyPost) {
        setMediaUrls(prev => ({
          ...prev,
          [type]: type === 'images'
            ? (response.data.propertyPost.propertyPics || [])
            : (response.data.propertyPost.propertyVideos || [])
        }));
      } else {
        setError(response.message || `Upload failed for ${type}`);
      }
    } catch (err) {
      console.error(`Media upload error (${type}):`, err);
      setError(`System error during ${type} synchronization.`);
    } finally {
      setUploading(prev => ({ ...prev, [type]: false }));
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 rounded-[3rem] shadow-2xl text-center max-w-lg w-full border border-slate-100"
        >
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <HiOutlineCheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight mb-4">Exhibition Online</h2>
          <p className="text-slate-500 mb-12 font-medium">Your asset and media have been successfully synchronized with our global marketplace.</p>
          <button
            onClick={() => {
              setLoginIntent(null);
              navigate('/');
            }}
            className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10"
          >
            Return to Nexus
          </button>
        </motion.div>
      </div>
    );
  }

  // MEDIA UPLOAD UI
  if (mediaStep) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-950">
        <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
          <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center font-black italic text-xl shadow-lg">E</div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Creation Studio</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Media Synchronization Phase</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow pt-32 pb-40 px-6">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900 text-center">Visual Intelligence</h2>

            {error && (
              <div className="p-6 bg-red-50 border border-red-100 text-red-600 rounded-3xl font-bold text-sm uppercase tracking-widest">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* IMAGES */}
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-6">Asset Photography (MAX 10)</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'images')}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="w-full aspect-square border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-600 transition-colors bg-slate-50/50"
                  >
                    <HiOutlinePhotograph size={32} className="text-slate-300 mb-2" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Visuals</span>
                    {mediaFiles.images.length > 0 && (
                      <span className="mt-2 text-[9px] font-bold text-indigo-600">{mediaFiles.images.length} files selected</span>
                    )}
                  </label>
                  <button
                    onClick={() => handleMediaUpload('images')}
                    disabled={uploading.images || mediaFiles.images.length === 0}
                    className="w-full mt-6 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30 flex items-center justify-center gap-2"
                  >
                    {uploading.images ? 'Transmitting...' : mediaUrls.images.length > 0 ? 'Resync Images' : 'Synchronize Images'}
                  </button>
                  {mediaUrls.images.length > 0 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                      {mediaUrls.images.map((url, i) => (
                        <div key={i} className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 border border-slate-100">
                          <img src={url} className="w-full h-full object-cover" alt="" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* VIDEOS */}
              <div className="space-y-6">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 block mb-6">Asset Cinematics (MAX 5)</label>
                  <input
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={(e) => handleFileChange(e, 'videos')}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="w-full aspect-square border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-600 transition-colors bg-slate-50/50"
                  >
                    <HiOutlineOfficeBuilding size={32} className="text-slate-300 mb-2" />
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Motion</span>
                    {mediaFiles.videos.length > 0 && (
                      <span className="mt-2 text-[9px] font-bold text-indigo-600">{mediaFiles.videos.length} files selected</span>
                    )}
                  </label>
                  <button
                    onClick={() => handleMediaUpload('videos')}
                    disabled={uploading.videos || mediaFiles.videos.length === 0}
                    className="w-full mt-6 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest disabled:opacity-30"
                  >
                    {uploading.videos ? 'Transmitting...' : mediaUrls.videos.length > 0 ? 'Resync Videos' : 'Synchronize Videos'}
                  </button>
                  {mediaUrls.videos.length > 0 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                      {mediaUrls.videos.map((url, i) => (
                        <div key={i} className="w-12 h-12 bg-slate-900 rounded-lg flex-shrink-0 flex items-center justify-center text-[8px] font-bold text-white text-center p-1">
                          VIDEO_{i + 1}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-8 z-50">
          <div className="max-w-5xl mx-auto flex justify-center">
            <button
              onClick={() => setSuccess(true)}
              className="px-24 py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-[0.4em] text-xs shadow-xl hover:bg-emerald-600 transition-all flex items-center gap-4"
            >
              Complete Exhibition
              <HiOutlineCheckCircle size={20} />
            </button>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-950">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-950 text-white rounded-xl flex items-center justify-center font-black italic text-xl shadow-lg">E</div>
            <div className="hidden sm:block">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Creation Studio</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Property Registration Phase</p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-1.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <div
                  key={s}
                  className={`h-1 rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-indigo-600' : 'w-4 bg-slate-200'}`}
                />
              ))}
            </div>
            <button
              onClick={() => {
                setLoginIntent(null);
                navigate('/');
              }}
              className="text-slate-400 hover:text-slate-950 transition-colors"
            >
              <HiOutlineX size={24} />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow pt-32 pb-40 px-6">
        <div className="max-w-3xl mx-auto">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-red-50 border border-red-100 text-red-600 rounded-3xl flex items-center gap-4 font-bold text-sm uppercase tracking-widest"
            >
              <HiOutlineX className="flex-shrink-0" size={20} />
              {error}
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <form className="space-y-12" onSubmit={(e) => e.preventDefault()}>

                {/* STEP 1: BASIC INFO */}
                {step === 1 && (
                  <div className="space-y-8">
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Foundational Data</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Ownership Model</label>
                        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-1">
                          {['owner', 'lease'].map(t => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setFormData({ ...formData, propertyType: t })}
                              className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${formData.propertyType === t ? 'bg-white text-slate-950 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category Selection</label>
                        <select
                          name="propertyCategory"
                          value={formData.propertyCategory}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors uppercase tracking-widest h-[52px]"
                        >
                          {['sale', 'rental', 'commercial_sale', 'pg', 'hostel', 'flatmates', 'land', 'plot'].map(c => (
                            <option key={c} value={c}>{c.replace('_', ' ')}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Valuation String (priceTag)</label>
                        <input
                          type="text"
                          name="priceTag"
                          placeholder="e.g. ₹50 Lac"
                          value={formData.priceTag}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Numeric Value (price)</label>
                        <input
                          type="number"
                          name="price"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: DETAILS */}
                {step === 2 && (
                  <div className="space-y-8">
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Spatial Calibration</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">BHK Configuration</label>
                        <input
                          type="number"
                          name="bhk"
                          placeholder="Rooms"
                          value={formData.bhk}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Verticality (Floor)</label>
                        <input
                          type="number"
                          name="floor"
                          placeholder="Floor No"
                          value={formData.floor}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Temporal Maturity (Age)</label>
                        <input
                          type="number"
                          name="propertyAge"
                          placeholder="Years"
                          value={formData.propertyAge}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Directional Alignment (Facing)</label>
                        <select
                          name="facing"
                          value={formData.facing}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors uppercase tracking-widest h-[52px]"
                        >
                          {['east', 'west', 'north', 'south'].map(f => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center gap-12 pt-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="isFurnished"
                            checked={formData.isFurnished}
                            onChange={handleChange}
                            className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-slate-200"
                          />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-950">Furnished Status</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="checkbox"
                            name="hasParking"
                            checked={formData.hasParking}
                            onChange={handleChange}
                            className="w-5 h-5 rounded-lg border-slate-300 text-indigo-600 focus:ring-slate-200"
                          />
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-950">Modular Parking</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: AREA & SPECS */}
                {step === 3 && (
                  <div className="space-y-8">
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Physical Parameters</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Build-up Area (SQFT)</label>
                        <input
                          type="number"
                          name="buildArea"
                          placeholder="e.g. 1200"
                          value={formData.buildArea}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Carpet Area (SQFT)</label>
                        <input
                          type="number"
                          name="carpetArea"
                          placeholder="e.g. 900"
                          value={formData.carpetArea}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-slate-300"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Technical Specifications (Details)</label>
                      <textarea
                        name="propertyDetails"
                        rows="6"
                        placeholder="Detail the composite structure and technical features..."
                        value={formData.propertyDetails}
                        onChange={handleChange}
                        className="w-full p-6 bg-white border border-slate-200 rounded-[2.5rem] text-[13px] font-medium text-slate-600 focus:outline-none focus:border-indigo-600 transition-colors placeholder:text-slate-300 resize-none leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: GEOGRAPHY */}
                {step === 4 && (
                  <div className="space-y-8">
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Geographic Positioning</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Specific Locality</label>
                        <input
                          type="text"
                          name="locality"
                          placeholder="e.g. Bandra West"
                          value={formData.locality}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Strategic Landmark</label>
                        <input
                          type="text"
                          name="landmark"
                          placeholder="e.g. Near Taj Hotel"
                          value={formData.landmark}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">City Hub</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Mumbai"
                          value={formData.city}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Primary State</label>
                        <input
                          type="text"
                          name="state"
                          placeholder="Maharashtra"
                          value={formData.state}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Zone Code (Pincode)</label>
                        <input
                          type="text"
                          name="pincode"
                          placeholder="400050"
                          value={formData.pincode}
                          onChange={handleChange}
                          className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 5: AMENITIES & COMM */}
                {step === 5 && (
                  <div className="space-y-12">
                    <h2 className="text-4xl font-black uppercase tracking-tight text-slate-900">Ecosystem Assets</h2>

                    {/* AMENITIES */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Structural Amenities (Array)</label>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="e.g. Helipad, Home Theater..."
                          value={tempAmenity}
                          onChange={(e) => setTempAmenity(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleArrayAdd('amenities', tempAmenity, setTempAmenity)}
                          className="flex-grow p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayAdd('amenities', tempAmenity, setTempAmenity)}
                          className="w-[52px] h-[52px] bg-slate-950 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg"
                        >
                          <HiOutlinePlus size={20} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.amenities.map((item, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-3">
                            {item}
                            <button onClick={() => handleArrayRemove('amenities', idx)} className="text-slate-400 hover:text-red-500">
                              <HiOutlineX size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* NEARBY PLACES */}
                    <div className="space-y-4">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Proximity Artifacts (Nearby Places)</label>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="e.g. Metro Station, Park..."
                          value={tempNearby}
                          onChange={(e) => setTempNearby(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleArrayAdd('nearbyPlaces', tempNearby, setTempNearby)}
                          className="flex-grow p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => handleArrayAdd('nearbyPlaces', tempNearby, setTempNearby)}
                          className="w-[52px] h-[52px] bg-slate-950 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg"
                        >
                          <HiOutlinePlus size={20} />
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {formData.nearbyPlaces.map((item, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-3">
                            {item}
                            <button onClick={() => handleArrayRemove('nearbyPlaces', idx)} className="text-slate-400 hover:text-red-500">
                              <HiOutlineX size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CONTACT */}
                    <div className="space-y-3 pt-6">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Communication Interface (Contact Info)</label>
                      <input
                        type="text"
                        name="contactInfo"
                        placeholder="Owner Mobile / Email"
                        value={formData.contactInfo}
                        onChange={handleChange}
                        className="w-full p-4 bg-white border border-slate-200 rounded-2xl text-[13px] font-bold text-slate-900 focus:outline-none focus:border-indigo-600 transition-colors"
                      />
                    </div>
                  </div>
                )}
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* FOOTER CONTROLS */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-8 z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="hidden sm:flex gap-12">
            {[
              { icon: <HiOutlineOfficeBuilding />, label: "Structure" },
              { icon: <HiOutlineMap />, label: "Layout" },
              { icon: <HiOutlineCurrencyRupee />, label: "Valuation" },
              { icon: <HiOutlineInformationCircle />, label: "Meta" }
            ].map((tool, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 bg-slate-50 text-slate-300 rounded-xl flex items-center justify-center">
                  {tool.icon}
                </div>
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">{tool.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-8 w-full sm:w-auto">
            {step > 1 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-950 transition-colors px-6"
              >
                Reverse
              </button>
            )}

            {step < 5 ? (
              <button
                onClick={() => validateStep(step) && setStep(s => s + 1)}
                disabled={!validateStep(step)}
                className="flex-grow sm:flex-none px-12 py-5 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-indigo-600 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-30"
              >
                Integrate Details
                <HiOutlineArrowRight size={18} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading || !validateStep(5)}
                className="flex-grow sm:flex-none px-12 py-5 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] shadow-xl hover:bg-emerald-600 active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-30"
              >
                {loading ? 'Synchronizing...' : 'Finalize Exhibition'}
                <HiOutlineCheckCircle size={18} />
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PostProperty;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPropertyById } from '../../api/property.api';
import {
    HiOutlineArrowLeft,
    HiOutlineChevronLeft,
    HiOutlineLocationMarker,
    HiOutlineCurrencyRupee,
    HiOutlineCheckCircle,
    HiOutlineClock,
    HiOutlineOfficeBuilding,
    HiOutlineFingerPrint,
    HiOutlinePhotograph,
    HiOutlineVideoCamera,
    HiOutlineXCircle,
    HiOutlineClipboardList
} from 'react-icons/hi';
import { motion } from 'framer-motion';

const AdminPropertyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            try {
                const response = await getPropertyById(id);
                if (response.success && response.data?.propertyPost) {
                    setProperty(response.data.propertyPost);
                } else {
                    setError(response.message || 'Asset not found in registry.');
                }
            } catch (err) {
                setError('Registry synchronization failure.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Accessing Secure API...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="p-12 text-center">
                <div className="p-8 bg-red-50 border border-red-100 text-red-600 rounded-3xl inline-block font-black uppercase tracking-widest">
                    {error || 'Critical error during data retrieval.'}
                </div>
                <button
                    onClick={() => navigate('/admin/properties')}
                    className="block mx-auto mt-8 text-indigo-600 font-bold uppercase tracking-widest text-xs"
                >
                    Return to Registry
                </button>
            </div>
        );
    }

    return (
        <div className="animate-fade-in pb-20">
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/admin/properties')}
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm transition-all"
                >
                    <HiOutlineChevronLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight italic">Asset Details</h1>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Registry ID: {id}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Metadata & Specs */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Visual Media */}
                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                            Visual Artifacts
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            {property.propertyPics && property.propertyPics.length > 0 ? (
                                property.propertyPics.map((url, i) => (
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        key={i}
                                        className="aspect-video bg-slate-50 rounded-2xl overflow-hidden border border-slate-100"
                                    >
                                        <img src={url} className="w-full h-full object-cover" alt="" />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-2 p-12 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-center">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Photography Available</p>
                                </div>
                            )}
                        </div>

                        {property.propertyVideos && property.propertyVideos.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Cinematic Records</h3>
                                <div className="grid grid-cols-1 gap-4">
                                    {property.propertyVideos.map((url, i) => (
                                        <div key={i} className="aspect-video bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                                            <video src={url} controls className="w-full h-full" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* Full Description / Details */}
                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Asset Intelligence</h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-600 leading-relaxed font-medium">{property.propertyDetails}</p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-8 pt-10 border-t border-slate-50">
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Structure Age</p>
                                <p className="text-sm font-bold text-slate-900">{property.propertyAge} Years</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Facing Orientation</p>
                                <p className="text-sm font-bold text-slate-900 uppercase tracking-wide">{property.facing}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Elevation (Floor)</p>
                                <p className="text-sm font-bold text-slate-900">{property.floor}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Furnished State</p>
                                <p className="text-sm font-bold text-slate-900">{property.isFurnished ? 'Fully Sync' : 'None'}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Logistical Parking</p>
                                <p className="text-sm font-bold text-slate-900">{property.hasParking ? 'Secured' : 'None'}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase mb-2">BHK Configuration</p>
                                <p className="text-sm font-bold text-slate-900">{property.bhk} Units</p>
                            </div>
                        </div>
                    </section>

                    {/* Amenities & Nearby */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Infrastructure Units</h2>
                            <div className="flex flex-wrap gap-2">
                                {property.amenities?.map((item, i) => (
                                    <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-600 uppercase italic">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </section>
                        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                            <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Proximity Nodes</h2>
                            <div className="flex flex-wrap gap-2">
                                {property.nearbyPlaces?.map((item, i) => (
                                    <span key={i} className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-[10px] font-bold text-indigo-600 uppercase italic">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Right: Core Meta Card */}
                <div className="space-y-8">
                    <section className="bg-slate-950 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-10">
                                <span className="px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">
                                    {property.propertyCategory}
                                </span>
                                <div className={`w-3 h-3 rounded-full ${property.isActive ? 'bg-emerald-400 border-[3px] border-emerald-400/30' : 'bg-red-400 border-[3px] border-red-400/30'}`}></div>
                            </div>

                            <h3 className="text-4xl font-black mb-1 uppercase tracking-tight italic">{property.propertyType}</h3>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-12">Asset Valuation Matrix</p>

                            <div className="text-5xl font-black text-indigo-400 mb-12 tracking-tighter">
                                ₹{property.price?.toLocaleString()}
                            </div>

                            <div className="space-y-6 pt-10 border-t border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                                        <HiOutlineLocationMarker size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Primary Node</p>
                                        <p className="font-bold text-sm uppercase italic">{property.city}, {property.state}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-slate-400">
                                        <HiOutlineOfficeBuilding size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Spatial Volume</p>
                                        <p className="font-bold text-sm">{property.buildArea} SQFT (Build)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-600/10 rounded-full blur-[80px]"></div>
                    </section>

                    <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Custody Access</h2>
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Direct Intelligence</p>
                            <p className="text-xl font-black text-slate-900 tracking-tight">{property.contactInfo}</p>
                        </div>
                        <div className="mt-6 flex flex-col gap-2">
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Pincode</span>
                                <span className="text-sm font-black text-slate-900">{property.pincode}</span>
                            </div>
                            <div className="flex justify-between items-center px-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Locality</span>
                                <span className="text-sm font-black text-slate-900 uppercase italic">{property.locality}</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AdminPropertyDetails;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineShieldCheck, 
  HiOutlinePhone, 
  HiOutlineMail, 
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineDocumentText,
  HiOutlineChatAlt2,
  HiOutlineStar
} from 'react-icons/hi';

const AuthFooter = ({ role = 'user' }) => {
    const navigate = useNavigate();

    const contactInfo = [
        {
            icon: <HiOutlinePhone className="w-5 h-5" />,
            title: "Phone",
            info: "+91 98765 43210",
            description: "Mon-Fri 9:00 AM - 6:00 PM"
        },
        {
            icon: <HiOutlineMail className="w-5 h-5" />,
            title: "Email",
            info: "support@eliteproperties.com",
            description: "24/7 Customer Support"
        },
        {
            icon: <HiOutlineLocationMarker className="w-5 h-5" />,
            title: "Office",
            info: "Mumbai, India",
            description: "Global Headquarters"
        }
    ];

    const services = [
        { name: "Property Search", description: "Advanced listing discovery" },
        { name: "Market Analysis", description: "Real-time insights & trends" },
        { name: "Investment Advisory", description: "Expert portfolio guidance" },
        { name: "Legal Support", description: "Documentation & compliance" }
    ];

    const companyInfo = [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Blog", path: "/blog" }
    ];

    const legalInfo = [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Security", path: "/security" }
    ];

    return (
        <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white border-t border-slate-700 pt-20 pb-12 relative overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(99,102,241,0.15)_0%,transparent_50%)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.15)_0%,transparent_50%)]"></div>
            </div>
            
            {/* Ambient Glow Effects */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-500/20 to-pink-600/20 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 lg:px-24 relative z-10">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand & Mission */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-4 mb-8 cursor-pointer group" onClick={() => navigate('/user/home')}>
                            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-serif-display text-3xl italic text-white group-hover:from-indigo-600 group-hover:to-purple-600 transition-all shadow-2xl">
                                E
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Elite Properties</h3>
                                <p className="text-slate-400 text-sm">Global Real Estate</p>
                            </div>
                        </div>
                        <p className="text-slate-300 text-lg leading-relaxed mb-8">
                            Curators of architectural rarity. Experience the pinnacle of sovereign real estate within our registry.
                        </p>
                        
                        {/* Social Proof */}
                        <div className="flex items-center gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <HiOutlineShieldCheck className="w-5 h-5 text-emerald-400" />
                                <span className="text-sm text-slate-400">Verified</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <HiOutlineStar key={i} className="w-4 h-4 text-amber-400 fill-current" />
                                ))}
                                <span className="text-sm text-slate-400 ml-2">4.9/5</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <HiOutlineChatAlt2 className="w-6 h-6 text-blue-400" />
                            Contact Us
                        </h4>
                        <div className="space-y-6">
                            {contactInfo.map((contact, idx) => (
                                <div key={idx} className="flex items-start gap-4 group">
                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500/20 transition-all">
                                        {contact.icon}
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-white">{contact.title}</h5>
                                        <p className="text-blue-300 font-medium">{contact.info}</p>
                                        <p className="text-slate-400 text-sm">{contact.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <HiOutlineHome className="w-6 h-6 text-purple-400" />
                            Our Services
                        </h4>
                        <ul className="space-y-4">
                            {services.map((service, idx) => (
                                <li key={idx} className="group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full group-hover:scale-150 transition-transform"></div>
                                        <div>
                                            <h5 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                                                {service.name}
                                            </h5>
                                            <p className="text-slate-400 text-sm">{service.description}</p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company Info */}
                    <div>
                        <h4 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <HiOutlineDocumentText className="w-6 h-6 text-emerald-400" />
                            Company
                        </h4>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <h5 className="font-semibold text-slate-300 mb-4 uppercase text-sm tracking-wider">Company</h5>
                                <ul className="space-y-3">
                                    {companyInfo.map((item, idx) => (
                                        <li key={idx}>
                                            <a 
                                                href={item.path} 
                                                className="text-slate-400 hover:text-white transition-colors text-sm"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h5 className="font-semibold text-slate-300 mb-4 uppercase text-sm tracking-wider">Legal</h5>
                                <ul className="space-y-3">
                                    {legalInfo.map((item, idx) => (
                                        <li key={idx}>
                                            <a 
                                                href={item.path} 
                                                className="text-slate-400 hover:text-white transition-colors text-sm"
                                            >
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-slate-700">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="text-center md:text-left">
                            <p className="text-slate-400 text-sm mb-2">
                                © 2026 Elite Properties Global Registry. All rights reserved.
                            </p>
                            <div className="flex items-center gap-6 text-xs text-slate-500">
                                <span>Licensed Real Estate Broker</span>
                                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                <span>RERA Registered</span>
                                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                <span>ISO 27001 Certified</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-8">
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <HiOutlineClock className="w-4 h-4" />
                                <span>24/7 Support Available</span>
                            </div>
                            <div className="flex items-center gap-3 text-slate-400 text-sm">
                                <HiOutlineUserGroup className="w-4 h-4" />
                                <span>10,000+ Happy Clients</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default AuthFooter;
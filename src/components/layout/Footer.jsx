import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { BRAND } from '../../constants/brand';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook />, url: '#', label: 'Facebook' },
    { icon: <FaTwitter />, url: '#', label: 'Twitter' },
    { icon: <FaInstagram />, url: '#', label: 'Instagram' },
    { icon: <FaLinkedin />, url: '#', label: 'LinkedIn' }
  ];

  const quickLinks = [
    {
      title: 'Properties',
      links: [
        { name: 'Luxury Homes', href: '/buy' },
        { name: 'Commercial', href: '/services' },
        { name: 'Investment', href: '/services' },
        { name: 'Off-Market', href: '/contact' }
      ]
    },
    {
      title: 'Services',
      links: [
        { name: 'Buying', href: '/buy' },
        { name: 'Investing', href: '/services' },
        { name: 'Consulting', href: '/services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Our Team', href: '/agents' },
        { name: 'Careers', href: '/contact' },
        { name: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Market Reports', href: '/services' },
        { name: 'Blog', href: '/services' },
        { name: 'Guides', href: '/services' },
        { name: 'FAQs', href: '/contact' }
      ]
    }
  ];

  const certifications = [
    { name: 'Luxury Estate Certified', year: '2024' },
    { name: 'Top Agent Award', year: '2023' },
    { name: 'Five Star Professional', year: '2022-2024' },
    { name: 'REALTOR International', year: 'Member' }
  ];

  return (
    <footer className="bg-gradient-to-t from-gray-900 to-black text-gray-300 py-20 px-4 border-t border-gray-800">
      {/* Top Section - Brand Info */}
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">{BRAND.name}</h3>
            <p className="text-gray-400 mb-6 text-lg leading-relaxed">
              {BRAND.description}
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="p-3 bg-gradient-to-r from-gray-800 to-gray-700 rounded-full text-gray-300 hover:from-blue-600 hover:to-blue-700 hover:text-white transition-all border border-gray-700 shadow-lg hover:shadow-xl flex items-center justify-center group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>

            {/* Certifications */}
            <div className="grid grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-700/30 p-4 rounded-xl border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-50"></div>
                  <div className="relative z-10">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mr-2">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="text-xs text-blue-400 font-semibold uppercase tracking-wide">{cert.year}</div>
                    </div>
                    <div className="text-sm text-white font-medium">{cert.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-10">
            {quickLinks.map((section, index) => (
              <div key={index}>
                <h4 className="font-bold text-white mb-5 text-lg relative inline-block">
                  {section.title}
                </h4>
                <ul className="space-y-4 mt-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-base flex items-center group"
                      >
                        <span className="mr-3 text-blue-500 group-hover:translate-x-1 transition-transform duration-300">•</span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-5 text-lg relative inline-block">
              Contact Info
            </h4>
            <div className="space-y-5 mt-2">
              <div className="flex items-start">
                <div className="p-3 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl mr-4 mt-1 border border-blue-600/20">
                  <FaMapMarkerAlt className="text-blue-400 w-5 h-5" />
                </div>
                <span className="text-gray-400 text-base">123 Luxury Ave, Beverly Hills, CA 90210</span>
              </div>
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl mr-4 border border-blue-600/20">
                  <FaPhone className="text-blue-400 w-5 h-5" />
                </div>
                <span className="text-gray-400 text-base">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-blue-600/10 to-blue-700/10 rounded-xl mr-4 border border-blue-600/20">
                  <FaEnvelope className="text-blue-400 w-5 h-5" />
                </div>
                <span className="text-gray-400 text-base">info@premierestates.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="border-t border-gray-800"></div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <div className="text-gray-500 text-base">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved. Crafting exceptional experiences for discerning clients worldwide.
            </div>
          </div>

          <div className="flex space-x-8">
            <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-base">Privacy Policy</Link>
            <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-base">Terms of Service</Link>
            <Link to="/services" className="text-gray-400 hover:text-white transition-colors text-base">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
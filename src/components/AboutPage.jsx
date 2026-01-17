import React from 'react';
import { FaUsers, FaChartLine, FaAward, FaHandshake } from 'react-icons/fa';

const AboutPage = () => {
  const stats = [
    { number: "15+", label: "Years Experience" },
    { number: "2500+", label: "Happy Clients" },
    { number: "$150M+", label: "Properties Sold" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  const teamMembers = [
    {
      name: "John Smith",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Sarah Johnson",
      role: "Senior Agent",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Page Header */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Our Company</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We're passionate about helping people find their perfect homes and make smart real estate investments.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2008, we started with a simple mission: to make real estate transactions 
                stress-free and successful for everyone involved. What began as a small local agency 
                has grown into a trusted name in the industry.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Today, we combine traditional real estate expertise with cutting-edge technology 
                to provide unparalleled service to our clients. Our team of experienced agents 
                brings passion, dedication, and local market knowledge to every transaction.
              </p>
              <div className="flex space-x-4">
                <FaUsers className="text-blue-600 text-2xl" />
                <FaChartLine className="text-blue-600 text-2xl" />
                <FaAward className="text-blue-600 text-2xl" />
                <FaHandshake className="text-blue-600 text-2xl" />
              </div>
            </div>
            <div className="bg-gray-200 rounded-xl h-96 flex items-center justify-center">
              <span className="text-gray-500">Company Image</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our experienced professionals are dedicated to your success
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600">
              Principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Integrity", desc: "Honest and transparent in all dealings" },
              { title: "Excellence", desc: "Striving for the highest quality service" },
              { title: "Community", desc: "Building lasting relationships" },
              { title: "Innovation", desc: "Embracing technology and new ideas" }
            ].map((value, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Real Estate Journey?</h2>
          <p className="text-xl mb-8 text-blue-100">Contact us today to learn how we can help you achieve your real estate goals.</p>
          <a 
            href="/contact"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
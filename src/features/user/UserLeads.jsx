import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLeads = () => {
  const [leads] = useState([
    {
      id: 1,
      property: {
        id: 1,
        title: 'Luxury Villa in Beverly Hills',
        price: '₹15 Cr',
        location: 'Beverly Hills, CA'
      },
      buyer: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        message: 'Interested in viewing this property next week.'
      },
      date: '2024-01-20',
      status: 'pending',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      property: {
        id: 2,
        title: 'Modern Apartment in Manhattan',
        price: '₹8 Cr',
        location: 'Manhattan, NY'
      },
      buyer: {
        name: 'Sarah Johnson',
        email: 'sarah.j@outlook.com',
        phone: '+1 (555) 987-6543',
        message: 'Looking for properties in this price range for investment.'
      },
      date: '2024-01-19',
      status: 'contacted',
      timestamp: '1 day ago'
    },
    {
      id: 3,
      property: {
        id: 4,
        title: 'Seaside Mansion in Malibu',
        price: '₹25 Cr',
        location: 'Malibu, CA'
      },
      buyer: {
        name: 'Robert Chen',
        email: 'robert.chen@gmail.com',
        phone: '+1 (555) 456-7890',
        message: 'Would like to schedule a viewing for this weekend.'
      },
      date: '2024-01-18',
      status: 'follow-up',
      timestamp: '2 days ago'
    },
    {
      id: 4,
      property: {
        id: 3,
        title: 'Penthouse in Dubai Marina',
        price: '₹20 Cr',
        location: 'Dubai Marina, UAE'
      },
      buyer: {
        name: 'Emma Wilson',
        email: 'emma.w@protonmail.com',
        phone: '+971 50 123 4567',
        message: 'Serious buyer interested in making an offer.'
      },
      date: '2024-01-17',
      status: 'closed',
      timestamp: '3 days ago'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'follow-up':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-premium-pearl py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-premium-onyx mb-2">My Leads</h1>
              <p className="text-xl text-premium-platinum">
                Track inquiries and manage potential buyers
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="text-3xl font-bold text-premium-sapphire">
                {leads.length} Leads
              </div>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {leads.filter(l => l.status === 'pending').length}
            </div>
            <div className="text-premium-onyx font-medium">Pending</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {leads.filter(l => l.status === 'contacted').length}
            </div>
            <div className="text-premium-onyx font-medium">Contacted</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {leads.filter(l => l.status === 'follow-up').length}
            </div>
            <div className="text-premium-onyx font-medium">Follow-up</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {leads.filter(l => l.status === 'closed').length}
            </div>
            <div className="text-premium-onyx font-medium">Closed Deals</div>
          </div>
        </div>

        {/* Leads List */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="space-y-6">
            {leads.map(lead => (
              <div key={lead.id} className="border border-premium-platinum/30 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-bold text-premium-onyx mr-4">
                        {lead.buyer.name}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                      <span className="ml-3 text-sm text-premium-platinum">{lead.timestamp}</span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-premium-sapphire font-semibold">{lead.property.title}</p>
                      <p className="text-premium-onyx">{lead.property.location}</p>
                      <p className="text-premium-sapphire font-bold">{lead.property.price}</p>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-premium-onyx font-medium">Message:</p>
                      <p className="text-premium-platinum ml-2">{lead.buyer.message}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/properties/${lead.property.id}`}
                        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                      >
                        View Property
                      </Link>
                      <a
                        href={`mailto:${lead.buyer.email}`}
                        className="bg-green-100 text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors"
                      >
                        Email
                      </a>
                      <a
                        href={`tel:${lead.buyer.phone}`}
                        className="bg-orange-100 text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-orange-200 transition-colors"
                      >
                        Call
                      </a>
                      <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-200 transition-colors">
                        Update Status
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center text-sm text-premium-platinum border-t border-premium-platinum/20 pt-4">
                  <span>Enquired on: {formatDate(lead.date)}</span>
                  <span className="mx-2">•</span>
                  <span>Email: {lead.buyer.email}</span>
                  <span className="mx-2">•</span>
                  <span>Phone: {lead.buyer.phone}</span>
                </div>
              </div>
            ))}
          </div>

          {leads.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-premium-onyx mb-2">No leads yet</h3>
              <p className="text-premium-platinum mb-6">Your property listings will start attracting leads soon</p>
              <Link
                to="/user/properties"
                className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
              >
                View My Properties
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserLeads;
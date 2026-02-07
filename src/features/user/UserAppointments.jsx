import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserAppointments = () => {
  const [appointments] = useState([
    {
      id: 1,
      property: {
        id: 1,
        title: 'Luxury Villa in Beverly Hills',
        price: '₹15 Cr',
        location: 'Beverly Hills, CA'
      },
      date: '2024-02-15',
      time: '10:00 AM',
      type: 'Viewing',
      status: 'confirmed',
      agent: 'Michael Thompson',
      contact: '+1 (555) 123-4567'
    },
    {
      id: 2,
      property: {
        id: 2,
        title: 'Modern Apartment in Manhattan',
        price: '₹8 Cr',
        location: 'Manhattan, NY'
      },
      date: '2024-02-16',
      time: '2:00 PM',
      type: 'Meeting',
      status: 'pending',
      agent: 'Sarah Johnson',
      contact: '+1 (555) 987-6543'
    },
    {
      id: 3,
      property: {
        id: 4,
        title: 'Seaside Mansion in Malibu',
        price: '₹25 Cr',
        location: 'Malibu, CA'
      },
      date: '2024-02-18',
      time: '11:00 AM',
      type: 'Negotiation',
      status: 'scheduled',
      agent: 'Robert Chen',
      contact: '+1 (555) 456-7890'
    },
    {
      id: 4,
      property: {
        id: 3,
        title: 'Penthouse in Dubai Marina',
        price: '₹20 Cr',
        location: 'Dubai Marina, UAE'
      },
      date: '2024-02-10',
      time: '3:00 PM',
      type: 'Viewing',
      status: 'completed',
      agent: 'Emma Wilson',
      contact: '+971 50 123 4567'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
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

  const getAppointmentsByStatus = (status) => {
    return appointments.filter(app => app.status === status);
  };

  return (
    <div className="min-h-screen bg-premium-pearl py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-premium-onyx mb-2">My Appointments</h1>
              <p className="text-xl text-premium-platinum">
                Schedule and manage your property visits
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                + Schedule Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-500 mb-2">
              {getAppointmentsByStatus('scheduled').length}
            </div>
            <div className="text-premium-onyx font-medium">Scheduled</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">
              {getAppointmentsByStatus('confirmed').length}
            </div>
            <div className="text-premium-onyx font-medium">Confirmed</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {getAppointmentsByStatus('pending').length}
            </div>
            <div className="text-premium-onyx font-medium">Pending</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-500 mb-2">
              {getAppointmentsByStatus('completed').length}
            </div>
            <div className="text-premium-onyx font-medium">Completed</div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="space-y-6">
            {appointments.map(appointment => (
              <div key={appointment.id} className="border border-premium-platinum/30 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <h3 className="text-xl font-bold text-premium-onyx mr-4">
                        {appointment.property.title}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-premium-onyx">{appointment.property.location}</p>
                      <p className="text-premium-sapphire font-bold">{appointment.property.price}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-premium-sapphire" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-premium-onyx">{formatDate(appointment.date)}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-premium-sapphire" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-premium-onyx">{appointment.time}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-premium-sapphire" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                        </svg>
                        <span className="text-premium-onyx">{appointment.agent}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/properties/${appointment.property.id}`}
                        className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition-colors"
                      >
                        View Property
                      </Link>
                      <a
                        href={`tel:${appointment.contact}`}
                        className="bg-green-100 text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition-colors"
                      >
                        Call Agent
                      </a>
                      <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-premium-onyx mb-2">No appointments scheduled</h3>
              <p className="text-premium-platinum mb-6">Schedule your first property visit</p>
              <button className="bg-gradient-to-r from-premium-sapphire to-premium-royal text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                Schedule Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAppointments;
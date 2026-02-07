import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserPayments = () => {
  const [currentPlan] = useState({
    name: 'Premium Plus',
    price: '₹2,999',
    period: 'per year',
    features: [
      'Unlimited property listings',
      'Priority customer support',
      'Advanced analytics dashboard',
      'Lead generation tools',
      'Marketing assistance',
      'Virtual tour integration'
    ],
    renewalDate: '2025-01-15'
  });

  const [paymentHistory] = useState([
    {
      id: 1,
      date: '2024-01-15',
      amount: '₹2,999',
      plan: 'Premium Plus Annual',
      method: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN-2024-001'
    },
    {
      id: 2,
      date: '2023-01-15',
      amount: '₹2,999',
      plan: 'Premium Plus Annual',
      method: 'Credit Card',
      status: 'Completed',
      transactionId: 'TXN-2023-001'
    },
    {
      id: 3,
      date: '2022-01-15',
      amount: '₹1,999',
      plan: 'Premium Monthly',
      method: 'Debit Card',
      status: 'Completed',
      transactionId: 'TXN-2022-001'
    }
  ]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-premium-pearl py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-premium-onyx mb-2">Payments & Subscriptions</h1>
              <p className="text-xl text-premium-platinum">
                Manage your subscription and payment history
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-2xl font-bold text-premium-sapphire">
                {currentPlan.name} Plan
              </span>
            </div>
          </div>
        </div>

        {/* Current Plan */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-premium-onyx mb-4">{currentPlan.name} Plan</h2>
              <div className="text-4xl font-bold text-premium-sapphire mb-2">
                {currentPlan.price} <span className="text-xl text-premium-platinum">{currentPlan.period}</span>
              </div>
              <p className="text-premium-platinum mb-6">
                Next renewal: {formatDate(currentPlan.renewalDate)}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {currentPlan.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-premium-onyx">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 lg:mt-0 lg:ml-8">
              <div className="bg-premium-ivory rounded-2xl p-6">
                <h3 className="text-xl font-bold text-premium-onyx mb-4">Renew Subscription</h3>
                <p className="text-premium-platinum mb-4">
                  Renew before {formatDate(currentPlan.renewalDate)} to continue enjoying premium features.
                </p>
                <button className="w-full bg-gradient-to-r from-premium-sapphire to-premium-royal text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                  Renew Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Options */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-premium-onyx mb-6">Upgrade Your Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-premium-platinum/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-premium-onyx mb-2">Basic</h3>
              <div className="text-2xl font-bold text-premium-sapphire mb-4">₹999<span className="text-sm text-premium-platinum">/year</span></div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx">5 property listings</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx">Basic support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-gray-300 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx text-gray-400">No analytics</span>
                </li>
              </ul>
              <button className="w-full border border-premium-sapphire text-premium-sapphire py-2 rounded-xl font-bold hover:bg-premium-sapphire hover:text-white transition-colors">
                Select
              </button>
            </div>
            
            <div className="border-2 border-premium-sapphire rounded-2xl p-6 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-premium-sapphire text-white px-4 py-1 rounded-full text-sm font-bold">
                RECOMMENDED
              </div>
              <h3 className="text-xl font-bold text-premium-onyx mb-2">Premium Plus</h3>
              <div className="text-2xl font-bold text-premium-sapphire mb-4">₹2,999<span className="text-sm text-premium-platinum">/year</span></div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx">Unlimited listings</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx">Priority support</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx">Advanced analytics</span>
                </li>
              </ul>
              <button className="w-full bg-premium-sapphire text-white py-2 rounded-xl font-bold hover:bg-premium-royal transition-colors">
                Current Plan
              </button>
            </div>
            
            <div className="border border-premium-platinum/30 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-premium-onyx mb-2">Enterprise</h3>
              <div className="text-2xl font-bold text-premium-sapphire mb-4">Custom<span className="text-sm text-premium-platinum">/negotiated</span></div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx">Unlimited everything</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx">Dedicated manager</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-premium-onyx">White-label solution</span>
                </li>
              </ul>
              <button className="w-full border border-premium-sapphire text-premium-sapphire py-2 rounded-xl font-bold hover:bg-premium-sapphire hover:text-white transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-premium-onyx mb-6">Payment History</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-premium-platinum/30">
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Date</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Plan</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Amount</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Method</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Status</th>
                  <th className="text-left py-4 px-4 font-bold text-premium-onyx">Transaction ID</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map(payment => (
                  <tr key={payment.id} className="border-b border-premium-platinum/20 hover:bg-premium-ivory/10 transition-colors">
                    <td className="py-4 px-4 text-premium-onyx">{formatDate(payment.date)}</td>
                    <td className="py-4 px-4 text-premium-onyx">{payment.plan}</td>
                    <td className="py-4 px-4 font-bold text-premium-sapphire">{payment.amount}</td>
                    <td className="py-4 px-4 text-premium-onyx">{payment.method}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-premium-platinum">{payment.transactionId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPayments;
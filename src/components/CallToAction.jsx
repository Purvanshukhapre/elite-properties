import React from 'react';

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Find Your Dream Home?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of satisfied clients who have found their perfect property with our expert guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg">
            Start Your Search
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors">
            Contact an Agent
          </button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;

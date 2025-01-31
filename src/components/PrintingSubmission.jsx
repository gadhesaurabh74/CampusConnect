import React from 'react';
import PaymentOptions from './PaymentOptions'; // Import the PaymentOptions component

export default function PrintSubmission({ onNavigateToHome }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Submit Your Print Job
        </h2>

        {/* Directly render the PaymentOptions component */}
        <PaymentOptions onNavigateToHome={onNavigateToHome} />
      </div>
    </div>
  );
}
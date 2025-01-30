import React, { useState } from 'react';

export default function PrintSubmission({ onNavigateToHome }) {
  const [isPrintSubmitted, setIsPrintSubmitted] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handlePrintSubmit = () => {
    setIsPrintSubmitted(true); // Show the payment section
  };

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method); // Set the selected payment method
  };

  const handlePaymentSubmit = () => {
    if (selectedPayment) {
      alert('Payment successful! Returning to home...');
      onNavigateToHome();  // Navigate back to the home page
    } else {
      alert('Please select a payment method');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Submit Your Print Job</h2>

        {/* If print job is not submitted yet */}
        {!isPrintSubmitted ? (
          <button
            onClick={handlePrintSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
          >
            Submit Print Job
          </button>
        ) : (
          <div className="mt-6">
            {/* Payment Mode Selection */}
            <h3 className="text-xl font-semibold text-center mb-4">Choose Your Payment Method</h3>
            <div className="space-y-4">
              <button
                onClick={() => handlePaymentSelection('UPI')}
                className={`w-full py-3 rounded-lg ${selectedPayment === 'UPI' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-600 transition-all`}
              >
                UPI
              </button>
              <button
                onClick={() => handlePaymentSelection('Cash')}
                className={`w-full py-3 rounded-lg ${selectedPayment === 'Cash' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-600 transition-all`}
              >
                Cash
              </button>
              <button
                onClick={() => handlePaymentSelection('Credit Card')}
                className={`w-full py-3 rounded-lg ${selectedPayment === 'Credit Card' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} hover:bg-blue-600 transition-all`}
              >
                Credit Card
              </button>
            </div>

            <button
              onClick={handlePaymentSubmit}
              className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-all"
            >
              Confirm Payment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
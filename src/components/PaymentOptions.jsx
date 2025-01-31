import React, { useState } from 'react';

export default function PaymentOptions({ onNavigateToHome }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedUPI, setSelectedUPI] = useState(null);

  const handlePaymentSelection = (method) => {
    setSelectedPayment(method); // Set the selected payment method
    setSelectedUPI(null); // Reset UPI selection when changing payment method
  };

  const handleUPISelection = (upiMethod) => {
    setSelectedUPI(upiMethod); // Set the selected UPI method
  };

  const handlePaymentSubmit = () => {
    if (selectedPayment === 'UPI' && !selectedUPI) {
      alert('Please select a UPI method');
    } else if (!selectedPayment) {
      alert('Please select a payment method');
    } else {
      alert('Payment successful! Returning to home...');
      onNavigateToHome(); // Navigate back to the home page
    }
  };

  return (
    <div className="mt-6">
      {/* Payment Mode Selection */}
      <h3 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Choose Your Payment Method
      </h3>
      <div className="space-y-6">
        {/* UPI Option */}
        <div
          onClick={() => handlePaymentSelection('UPI')}
          className={`w-full p-6 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
            selectedPayment === 'UPI'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md'
          }`}
        >
          <span className="font-semibold text-lg">UPI</span>
          {selectedPayment === 'UPI' && (
            <div className="mt-4 space-y-3">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleUPISelection('Google Pay');
                }}
                className={`p-4 rounded-lg flex items-center space-x-4 transition-all transform hover:scale-105 ${
                  selectedUPI === 'Google Pay'
                    ? 'bg-blue-400 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 shadow-sm'
                }`}
              >
                <img
                  src="https://tse4.mm.bing.net/th?id=OIP.SbYKtgvH7NaOaewb8X8FrQHaDa&pid=Api&P=0&h=180" // Replace with your Google Pay logo path
                  alt="Google Pay"
                  className="h-8 w-8"
                />
                <span>Google Pay</span>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleUPISelection('PhonePe');
                }}
                className={`p-4 rounded-lg flex items-center space-x-4 transition-all transform hover:scale-105 ${
                  selectedUPI === 'PhonePe'
                    ? 'bg-blue-400 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 shadow-sm'
                }`}
              >
                <img
                  src="https://d3pc1xvrcw35tl.cloudfront.net/images/1200x900/payment-app-phone-pay-has-launched-an-aggregator-service-know-here-everything_2023061030257.jpg" // Replace with your PhonePe logo path
                  alt="PhonePe"
                  className="h-8 w-8"
                />
                <span>PhonePe</span>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleUPISelection('Paytm');
                }}
                className={`p-4 rounded-lg flex items-center space-x-4 transition-all transform hover:scale-105 ${
                  selectedUPI === 'Paytm'
                    ? 'bg-blue-400 text-white shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 shadow-sm'
                }`}
              >
                <img
                  src="https://cdn-1.webcatalog.io/catalog/paytm/paytm-icon.png" // Replace with your Paytm logo path
                  alt="Paytm"
                  className="h-8 w-8"
                />
                <span>Paytm</span>
              </div>
            </div>
          )}
        </div>

        {/* Cash Option */}
        <div
          onClick={() => handlePaymentSelection('Cash')}
          className={`w-full p-6 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
            selectedPayment === 'Cash'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md'
          }`}
        >
          <span className="font-semibold text-lg">Cash</span>
        </div>

        {/* Credit Card Option */}
        <div
          onClick={() => handlePaymentSelection('Credit Card')}
          className={`w-full p-6 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
            selectedPayment === 'Credit Card'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-2xl'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-md'
          }`}
        >
          <span className="font-semibold text-lg">Credit Card</span>
          {selectedPayment === 'Credit Card' && (
            <div className="mt-4 flex justify-center">
              <img
                src="https://worldfinancialreview.com/wp-content/uploads/2020/03/Credit-Card-Visa-Master-Card.jpg" // Replace with your Credit Card logo path
                alt="Credit Card"
                className="h-12"
              />
            </div>
          )}
        </div>
      </div>

      <button
        onClick={handlePaymentSubmit}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl mt-8 hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
      >
        Confirm Payment
      </button>
    </div>
  );
}
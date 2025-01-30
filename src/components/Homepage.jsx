import React from 'react';
import Navbar from './Navbar';
import PrintingService from './PrintingServices';
import CanteenService from './CanteenServices';
import { Printer, Coffee, CreditCard, Bell } from 'lucide-react';

const App=()=> {
    const [activeService, setActiveService] = React.useState('printing');
    const [balance, setBalance] = React.useState(100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar  />
      
      {(
        <div className="fixed top-20 right-4 max-w-md transform transition-all duration-500 ease-in-out animate-slide-in">
          <div className="bg-white p-4 rounded-lg shadow-lg border-l-4 border-blue-500 flex items-center">
            <Bell className="h-5 w-5 text-blue-500 mr-2" />
            
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8 flex justify-between items-center ">
          <div className="flex space-x-4 cursor-pointer">
            <button
              onClick={() => setActiveService('printing')}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                activeService === 'printing'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Printer className="h-5 w-5 mr-2" />
              Printing Service
            </button>
            <button
              onClick={() => setActiveService('canteen')}
              className={`flex items-center px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 cursor-pointer${
                activeService === 'canteen'
                  ? 'bg-orange-600 text-black shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Coffee className="h-5 w-5 mr-2" />
              Canteen Service
            </button>
          </div>

          <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-md">
            <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-gray-700 font-medium">Balance:</span>
            <span className="ml-2 text-green-600 font-bold">${balance.toFixed(2)}</span>
          </div>
        </div>

        <div className="transition-all duration-500 ease-in-out transform ">
          {activeService === 'printing' ? <PrintingService /> : <CanteenService />}
        </div>
      </main>
    </div>
  );
}

export default App;
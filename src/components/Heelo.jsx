import React from 'react';
import PrintingService from './PrintingServices'; // Import the PrintingService component
import CanteenService from './CanteenServices';

const Heelo = () => {
  return (
    <div>
      
      <PrintingService /> {/* This renders the PrintingService component */}
      <CanteenService /> 
    </div>
  );
};

export default Heelo;

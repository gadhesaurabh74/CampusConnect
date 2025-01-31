import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import React from 'react';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import PrintingService from './components/PrintingServices'; // Import the PrintingService component
import CanteenServices from './components/CanteenServices'; // Import the CanteenServices component
import PrintSubmission from './components/PrintingSubmission';
import CustomerLogin from './components/authentication/CustomerLogin';
import CustomerRegister from './components/authentication/CustomerRegister';
import AdminLogin from './components/authentication/OwnerSignIn';
import AdminRegister from './components/authentication/OwnerRegister'
import Homepage from './components/Homepage';
import Dashboard from './components/owner/dashboard';
import Canteen from './components/owner/Canteen/Canteen';
import CC from './components/owner/CC/CC';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* for all paths starting with / */}
      <Route index element={<LandingPage />} />

      <Route path="printing-service" element={<PrintingService />} /> {/* Add this route */}
      <Route path="canteen-services" element={<CanteenServices />} /> {/* Added CanteenServices route */}
      <Route path="*" element={<NotFound />} /> {/* for all unknown paths */}


      <Route path="userlogin" element={<CustomerLogin />} />
      <Route path="userregister" element={<CustomerRegister />} />
      <Route path="adminlogin" element={<AdminLogin />} />
      <Route path="adminregister" element={<AdminRegister />} />

      <Route path="homepage" element={<Homepage />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="canteen" element={<Canteen />} />
      <Route path="cc" element={<CC />} />

      <Route path="print" element={<PrintingService />} />
      <Route path="print-submission" element={<PrintSubmission />} />
      <Route path="*" element={<NotFound />} />
      {/* for all unknown paths  */}
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

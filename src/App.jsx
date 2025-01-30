import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import React from 'react'
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import PrintingService from './components/PrintingServices';
import PrintSubmission from './components/PrintingSubmission';
import CustomerLogin from './components/authentication/CustomerLogin';
import AdminLogin from './components/authentication/OwnerSignIn'

import Homepage from './components/Homepage';




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* for all paths starting with / */}
      <Route index element={<LandingPage />} />

      <Route path="userlogin" element={<CustomerLogin />} />
      <Route path="adminlogin" element={<AdminLogin />} />

      <Route path="homepage" element={<Homepage />} />

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
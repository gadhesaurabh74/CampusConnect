import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import RootLayout from './RootLayout';
import React from 'react';
import NotFound from './components/NotFound';
import LandingPage from './components/LandingPage';
import PrintingService from './components/PrintingServices'; // Import the PrintingService component
import Heelo from './components/Heelo';
import CanteenServices from './components/CanteenServices'; // Import the CanteenServices component

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* for all paths starting with / */}
      <Route index element={<LandingPage />} />
      <Route path="printing-service" element={<PrintingService />} /> {/* Add this route */}
      <Route path="heelo" element={<Heelo />} />
      <Route path="canteen-services" element={<CanteenServices />} /> {/* Added CanteenServices route */}
      <Route path="*" element={<NotFound />} /> {/* for all unknown paths */}
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

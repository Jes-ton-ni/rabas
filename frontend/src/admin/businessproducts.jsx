import React, { useState, useEffect } from 'react';
import Sidebar from '../components/sidebar';
import { Switch } from "@nextui-org/react";
import ActivitySections from './AddProductsComponent/ActivitySections';
import AccommodationSection from './AddProductsComponent/AccommodationSection';
import RestaurantServicesSection from './AddProductsComponent/RestaurantServicesSection';
import ShopSections from './AddProductsComponent/ShopSections';

const BusinessProducts = () => {
  const [showActivities, setShowActivities] = useState(false);
  const [showAccommodation, setShowAccommodation] = useState(false);
  const [showRestaurantServices, setShowRestaurantServices] = useState(false);
  const [showShop, setShowShop] = useState(false);
    // Title Tab
    useEffect(() => {
      document.title = 'BusinessName | Admin products';
      });


  return (
    <div className="flex flex-col lg:flex-row bg-light font-sans min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 lg:p-8 max-h-screen overflow-y-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-0">
            Manage Products and Services
          </h1>
         
        </div>

        {/* Sections Toggle */}
        <div className="mb-6">
          <h2 className="text-md font-semibold text-gray-700 mb-4">Switch on Sections to Add Products and Services:</h2>
          <div className='flex flex-col sm:flex-row gap-4'>
            <Switch
              color='success'
              isSelected={showActivities}
              onChange={(e) => setShowActivities(e.target.checked)}
            >
              <span className='font-semibold text-md'>Activities</span>
            </Switch>

            <Switch
              color='success'
              isSelected={showAccommodation}
              onChange={(e) => setShowAccommodation(e.target.checked)}
            >
              <span className='font-semibold text-md'>Accommodation</span>
            </Switch>

            <Switch
              color='success'
              isSelected={showRestaurantServices}
              onChange={(e) => setShowRestaurantServices(e.target.checked)}
            >
              <span className='font-semibold text-md'>Restaurant Services</span>
            </Switch>

            <Switch
              color='success'
              isSelected={showShop}
              onChange={(e) => setShowShop(e.target.checked)}
            >
              <span className='font-semibold text-md'>Shop</span>
            </Switch>
          </div>
        </div>

        {/* Sections of business products and services */}
        <div className='w-full flex flex-wrap gap-6'>
          {/* Conditionally render sections based on toggles */}
          {showActivities && <ActivitySections />}
          {showAccommodation && <AccommodationSection />}
          {showRestaurantServices && <RestaurantServicesSection />}
          {showShop && <ShopSections />}
        </div>

      </div>
    </div>
  );
};

export default BusinessProducts;

import React, { createContext, useState, useContext } from 'react';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState({
    businessName: '',
    businessLogo: null,
    socialLinks: [],
    heroImages: [],
    aboutUs: '',
    facilities: [],
    policies: [],
    contactInfo: [],
    openingHours: [
      { day: 'Monday', open: '', close: '' },
      { day: 'Tuesday', open: '', close: '' },
      { day: 'Wednesday', open: '', close: '' },
      { day: 'Thursday', open: '', close: '' },
      { day: 'Friday', open: '', close: '' },
      { day: 'Saturday', open: '', close: '' },
      { day: 'Sunday', open: '', close: '' },
    ],
    nearbyPlaces: [],
  });

  const updateBusinessData = (newData) => {
    setBusinessData(prevData => ({ ...prevData, ...newData }));
  };

  return (
    <BusinessContext.Provider value={{ businessData, updateBusinessData }}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessContext = () => {
    const context = useContext(BusinessContext);
    if (context === undefined) {
      throw new Error('useBusinessContext must be used within a BusinessProvider');
    }
    return context;
  };
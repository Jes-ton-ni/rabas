import { configureStore } from '@reduxjs/toolkit';
import businessReducer from './businessSlice';
import activitiesReducer from './activitiesSlice';
import accommodationReducer from './accomodationSlice';
import restaurantServicesReducer from './restaurantServicesSlice';
import shopReducer from './shopSlice'
import activitydealSliceReducer from './activitydealSlice';
import applicationSliceReducer from  './applicationSlice' 





const store = configureStore({
  reducer: {
    business: businessReducer,  // Existing business reducer
    activities: activitiesReducer,
    accommodations: accommodationReducer, 
    restaurantServices : restaurantServicesReducer,
    shop: shopReducer,
    activitydeals: activitydealSliceReducer, 
    application: applicationSliceReducer

  
  },
});

export default store;

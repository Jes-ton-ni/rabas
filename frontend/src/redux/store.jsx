import { configureStore } from '@reduxjs/toolkit';
import businessReducer from './businessSlice';




const store = configureStore({
  reducer: {
    business: businessReducer,  // Existing business reducer
  
  },
});

export default store;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch deals (restaurant)
export const fetchDeals = createAsyncThunk(
  'restaurantDeals/fetchRestaurantDeals',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/getDeals', {
        params: { category: 'restaurant' },
        withCredentials: true,
      });
      // console.log('response', response.data.deals);
      return response.data.deals || [];
    } catch (error) {
      console.error('Error fetching deals:', error);
      return [];
    }
  }
);

export const addRestaurantDeals = createAsyncThunk(
  'restaurantDeals/addRestaurantDeals',
  async (dealData, { dispatch }) => {
    try {
      // Log the data being sent for verification
      // console.log('Sending deal data:', dealData);

      const response = await axios.post('http://localhost:5000/add-deals', dealData, {
        withCredentials: true,
      });

      const deals = response.data;
      if (!deals || !deals.deal_id) {
        throw new Error('Invalid deal data received from the server');
      }

      const dealsData = {
        id: deals.deal_id,
        category: 'activity',
        productId: deals.productId,
        discount: deals.discount,
        expirationDate: new Date(deals.expirationDate).getTime(), // Ensure expirationDate is a timestamp
      };

      dispatch(addDeal(dealsData)); // Dispatching the action to add the deal to the state
      return dealsData;
    } catch (error) {
      console.error('Error adding deal:', error);
      throw error;
    }
  }
);

export const updateRestaurantDeals = createAsyncThunk(
  'restaurantActivity/updatedRestaurantDeals', 
  async (dealData, { dispatch }) => {
    try {
      const response = await axios.put('http://localhost:5000/update-deal', dealData, {
        withCredentials: true,
      });

      const deals = response.data;
      if (!deals || !deals.dealId) {
        throw new Error('Invalid deal data received from the server');
      }

      const dealsData = {
        id: deals.dealId, // Ensure this matches what your server returns
        discount: deals.discount,
        expirationDate: new Date(deals.expirationDate).getTime(), // Convert to timestamp if necessary
      };

      dispatch(updateDeal(dealsData)); // Dispatch the updateDeal action

      return dealsData; // Return the updated deal data
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error; // Allow error to be handled in the component
    }
  }
);

const restaurantDealsSlice = createSlice({
  name: 'restaurantDeals',
  initialState: {
    deals: [],
    status: 'ide',
    error: null,
  },
  reducers: {
    addDeal: (state, action) => {
      const newDeal = action.payload;
      state.deals.push({
        id: newDeal.id,
        productId: newDeal.productId,
        discount: newDeal.discount,
        expirationDate: newDeal.expirationDate,
      });
    },
    deleteDeal(state, action) {
      const dealId = action.payload;
      state.deals = state.deals.filter((deal) => deal.id !== dealId); // Remove the deal with the specified ID
    },    
    updateDeal(state, action) {
      const updatedDeal = action.payload; // Get the updated deal data from the action

      // Find the index of the deal that needs to be updated
      const index = state.deals.findIndex(deal => deal.id === updatedDeal.id);
      
      // If the deal is found, update it
      if (index !== -1) {
        state.deals[index] = {
          ...state.deals[index], // Retain other properties
          discount: updatedDeal.discount,
          expirationDate: updatedDeal.expirationDate, // Update expiration date
        };
      } else {
        console.warn(`Deal with id ${updatedDeal.id} not found for update.`);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDeals.pending, (state) => {
        state.status = 'loading';
      })
     .addCase(fetchDeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.deals = action.payload.map((deal) => ({
          id: deal.deal_id,
          productId: deal.product_id,
          discount: deal.discount,
          expirationDate: new Date(deal.expirationDate).getTime(),
        }));
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fectch deals' ;
      })
     .addCase(addRestaurantDeals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addRestaurantDeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(addRestaurantDeals.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add deal';
      })
      .addCase(updateRestaurantDeals.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRestaurantDeals.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(updateRestaurantDeals.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || 'Failed to update deal';
      });
  }
});

export const { addDeal, deleteDeal, updateDeal } = restaurantDealsSlice.actions;
export default restaurantDealsSlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   activeDeals: [],
//   expiredDeals: [],
// };

// const restaurantDealsSlice = createSlice({
//   name: 'restaurantDeals',
//   initialState,
//   reducers: {
//     deleteRestaurantDeal(state, action) {
//       const { dealId, isExpired } = action.payload;
//       if (isExpired) {
//         state.expiredDeals = state.expiredDeals.filter(deal => deal.id !== dealId);
//       } else {
//         state.activeDeals = state.activeDeals.filter(deal => deal.id !== dealId);
//       }
//     },
//     updateRestaurantDeal(state, action) {
//       const { dealId, discount, expirationDate, isExpired } = action.payload;
//       const dealList = isExpired ? state.expiredDeals : state.activeDeals;
//       const dealIndex = dealList.findIndex(deal => deal.id === dealId);
//       if (dealIndex !== -1) {
//         dealList[dealIndex] = {
//           ...dealList[dealIndex],
//           discount,
//           expirationDate: new Date(expirationDate),
//         };
//       }
//     },
//   },
// });

// export const { deleteRestaurantDeal, updateRestaurantDeal } = restaurantDealsSlice.actions;
// export default restaurantDealsSlice.reducer;
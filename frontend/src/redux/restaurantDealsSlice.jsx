import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  activeDeals: [],
  expiredDeals: [],
};

const restaurantDealsSlice = createSlice({
  name: 'restaurantDeals',
  initialState,
  reducers: {
    addRestaurantDeal: {
      reducer(state, action) {
        const today = new Date();
        const newDeal = action.payload;
        if (newDeal.expirationDate > today) {
          state.activeDeals.push(newDeal);
        } else {
          state.expiredDeals.push(newDeal);
        }
      },
      prepare(serviceId, discount, expirationDate, hasBookingOption) {
        return {
          payload: {
            id: nanoid(),
            serviceId,
            discount,
            expirationDate: new Date(expirationDate),
            hasBookingOption,
          },
        };
      },
    },
    deleteRestaurantDeal(state, action) {
      const { dealId, isExpired } = action.payload;
      if (isExpired) {
        state.expiredDeals = state.expiredDeals.filter(deal => deal.id !== dealId);
      } else {
        state.activeDeals = state.activeDeals.filter(deal => deal.id !== dealId);
      }
    },
    updateRestaurantDeal(state, action) {
      const { dealId, discount, expirationDate, isExpired, hasBookingOption } = action.payload;
      const dealList = isExpired ? state.expiredDeals : state.activeDeals;
      const dealIndex = dealList.findIndex(deal => deal.id === dealId);
      if (dealIndex !== -1) {
        dealList[dealIndex] = {
          ...dealList[dealIndex],
          discount,
          expirationDate: new Date(expirationDate),
          hasBookingOption,
        };
      }
    },
  },
});

export const { addRestaurantDeal, deleteRestaurantDeal, updateRestaurantDeal } = restaurantDealsSlice.actions;
export default restaurantDealsSlice.reducer;
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  activeDeals: [],
  expiredDeals: [],
};

const restaurantDealsSlice = createSlice({
  name: 'restaurantDeals',
  initialState,
  reducers: {
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

export const { deleteRestaurantDeal, updateRestaurantDeal } = restaurantDealsSlice.actions;
export default restaurantDealsSlice.reducer;
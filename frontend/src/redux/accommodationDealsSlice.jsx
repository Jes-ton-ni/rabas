import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  activeDeals: [],
  expiredDeals: [],
};

const accommodationDealsSlice = createSlice({
  name: 'accommodationDeals',
  initialState,
  reducers: {
    deleteAccommodationDeal(state, action) {
      const { dealId, isExpired } = action.payload;
      if (isExpired) {
        state.expiredDeals = state.expiredDeals.filter(deal => deal.id !== dealId);
      } else {
        state.activeDeals = state.activeDeals.filter(deal => deal.id !== dealId);
      }
    },
    updateAccommodationDeal(state, action) {
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

export const { deleteAccommodationDeal, updateAccommodationDeal } = accommodationDealsSlice.actions;
export default accommodationDealsSlice.reducer;
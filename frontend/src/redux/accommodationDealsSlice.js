import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeDeals: [
    { id: '1', accommodationId: '201', discount: 25, expirationDate: '2023-12-31' },
  ],
  expiredDeals: [
    { id: '2', accommodationId: '202', discount: 10, expirationDate: '2023-01-01' },
  ],
};

const accommodationDealsSlice = createSlice({
  name: 'accommodationDeals',
  initialState,
  reducers: {
    updateAccommodationDeal(state, action) {
      const { dealId, discount, expirationDate, isExpired } = action.payload;
      const dealList = isExpired ? state.expiredDeals : state.activeDeals;
      const dealIndex = dealList.findIndex(deal => deal.id === dealId);
      if (dealIndex !== -1) {
        dealList[dealIndex] = {
          ...dealList[dealIndex],
          discount,
          expirationDate: new Date(expirationDate).toISOString().split('T')[0],
        };
      }
    },
    deleteAccommodationDeal(state, action) {
      const { dealId, isExpired } = action.payload;
      if (isExpired) {
        state.expiredDeals = state.expiredDeals.filter(deal => deal.id !== dealId);
      } else {
        state.activeDeals = state.activeDeals.filter(deal => deal.id !== dealId);
      }
    },
  },
});

export const { updateAccommodationDeal, deleteAccommodationDeal } = accommodationDealsSlice.actions;
export default accommodationDealsSlice.reducer;
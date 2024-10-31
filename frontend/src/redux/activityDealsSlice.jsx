import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  activeDeals: [],
  expiredDeals: [],
};

const activityDealsSlice = createSlice({
  name: 'activityDeals',
  initialState,
  reducers: {
    deleteDeal(state, action) {
      const { dealId, isExpired } = action.payload;
      if (isExpired) {
        state.expiredDeals = state.expiredDeals.filter(deal => deal.id !== dealId);
      } else {
        state.activeDeals = state.activeDeals.filter(deal => deal.id !== dealId);
      }
    },
    updateDeal(state, action) {
      const { dealId, discount, expirationDate, isExpired } = action.payload;
      const dealList = isExpired ? state.expiredDeals : state.activeDeals;
      const dealIndex = dealList.findIndex(deal => deal.id === dealId);
      if (dealIndex !== -1) {
        dealList[dealIndex] = {
          ...dealList[dealIndex],
          discount,
          expirationDate: new Date(expirationDate),
        };
      }
    },
  },
});

export const { deleteDeal, updateDeal } = activityDealsSlice.actions;
export default activityDealsSlice.reducer;
import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  activeDeals: [],
  expiredDeals: [],
};

const activityDealsSlice = createSlice({
  name: 'activityDeals',
  initialState,
  reducers: {
    addDeal: {
      reducer(state, action) {
        const today = new Date();
        const newDeal = action.payload;
        if (newDeal.expirationDate > today) {
          state.activeDeals.push(newDeal);
        } else {
          state.expiredDeals.push(newDeal);
        }
      },
      prepare(activityId, discount, expirationDate) {
        return {
          payload: {
            id: nanoid(),
            activityId,
            discount,
            expirationDate: new Date(expirationDate),
          },
        };
      },
    },
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

export const { addDeal, deleteDeal, updateDeal } = activityDealsSlice.actions;
export default activityDealsSlice.reducer;
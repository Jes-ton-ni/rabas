import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  activeDeals: [],
  expiredDeals: [],
};

const activitydealSlice = createSlice({
  name: 'activitydeals',
  initialState,
  reducers: {
    addNewDeal: (state, action) => {
      const newDeal = { ...action.payload, id: nanoid(), active: true };
      state.activeDeals.push(newDeal);
    },
    editDeal: (state, action) => {
      const { id, updatedDeal } = action.payload;
      const dealIndex = state.activeDeals.findIndex((deal) => deal.id === id);
      if (dealIndex !== -1) {
        state.activeDeals[dealIndex] = { ...state.activeDeals[dealIndex], ...updatedDeal };
      }
    },
    deleteDeal: (state, action) => {
      state.activeDeals = state.activeDeals.filter((deal) => deal.id !== action.payload);
    },
    checkExpiredDeals: (state) => {
      const today = new Date().toISOString().split('T')[0];
      state.activeDeals.forEach((deal) => {
        if (deal.expiration && deal.expiration < today) {
          state.expiredDeals.push(deal);
        }
      });
      state.activeDeals = state.activeDeals.filter((deal) => deal.expiration >= today);
    },
  },
});

export const { addNewDeal, editDeal, deleteDeal, checkExpiredDeals } = activitydealSlice.actions;
export default activitydealSlice.reducer;

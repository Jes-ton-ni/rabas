import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  activeDeals: [],
  expiredDeals: [],
};

const shopDealsSlice = createSlice({
  name: 'shopDeals',
  initialState,
  reducers: {
    addShopDeal: {
      reducer(state, action) {
        const today = new Date();
        const newDeal = action.payload;
        if (newDeal.expirationDate > today) {
          state.activeDeals.push(newDeal);
        } else {
          state.expiredDeals.push(newDeal);
        }
      },
      prepare(productId, discount, expirationDate) {
        return {
          payload: {
            id: nanoid(),
            productId,
            discount,
            expirationDate: new Date(expirationDate),
          },
        };
      },
    },
    deleteShopDeal(state, action) {
      const { dealId, isExpired } = action.payload;
      if (isExpired) {
        state.expiredDeals = state.expiredDeals.filter(deal => deal.id !== dealId);
      } else {
        state.activeDeals = state.activeDeals.filter(deal => deal.id !== dealId);
      }
    },
    updateShopDeal(state, action) {
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

export const { addShopDeal, deleteShopDeal, updateShopDeal } = shopDealsSlice.actions;
export default shopDealsSlice.reducer;
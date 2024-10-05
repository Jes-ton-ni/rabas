import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    addProduct: {
      reducer(state, action) {
        state.products.push(action.payload);
      },
      prepare(product) {
        return {
          payload: {
            id: nanoid(),
            category: product.category,
            ...product,
          },
        };
      },
    },
    updateProduct(state, action) {
      const { id, updatedData } = action.payload;
      const productIndex = state.products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        state.products[productIndex] = { ...state.products[productIndex], ...updatedData };
      }
    },
    deleteProducts(state, action) {
      const idsToDelete = action.payload;
      state.products = state.products.filter((product) => !idsToDelete.includes(product.id));
    },
  },
});

export const { addProduct, updateProduct, deleteProducts } = shopSlice.actions;
export default shopSlice.reducer;

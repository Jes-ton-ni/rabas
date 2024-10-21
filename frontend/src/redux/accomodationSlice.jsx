import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch business products (accommodations)
export const fetchBusinessProducts = createAsyncThunk(
  'business/fetchBusinessProducts',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/getBusinessProduct', {
        withCredentials: true,
      });
      return response.data.businessProducts || []; // Return an empty array if no products
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

// Async thunk to add a new accommodation product
export const addProduct = createAsyncThunk(
  'business/addProduct',
  async (formData, { dispatch }) => {
    const response = await axios.post('http://localhost:5000/add-product', formData, {
      withCredentials: true,
    });

    const product = response.data;
    if (!product || !product.product_id || !product.name) {
      throw new Error('Invalid accommodation data received from the server');
    }

    const accommodationData = {
      id: product.product_id,
      accommodationName: product.name,
      pricing: product.price,
      pricingUnit: product.pricing_unit,
      hasBooking: parseInt(product.booking_operation) === 1, // Convert to number and compare
      inclusions: product.inclusions || [],
      termsAndConditions: product.termsAndConditions || [],
      images: product.images || [],
      accommodationType: product.type || "Unknown",
    };

    // Dispatch action to add accommodation to the state
    dispatch(addAccommodation(accommodationData));

    return response.data;
  }
);

// Async thunk to handle accommodation update
export const handleUpdateAccommodation = createAsyncThunk(
  'accommodation/update',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put('http://localhost:5000/update-product', formData, {
        withCredentials: true,
      });

      const product = response.data;
      if (!product || !product.product_id || !product.name) {
        throw new Error('Invalid accommodation data received from the server');
      }

      const accommodationData = {
        product_id: product.product_id,
        accommodationName: product.name,
        pricing: product.price,
        pricingUnit: product.pricing_unit,
        hasBooking: parseInt(product.booking_operation) === 1,
        inclusions: product.inclusions || [],
        termsAndConditions: product.termsAndConditions || [],
        images: product.images || [],
        accommodationType: product.type || "Unknown",
      };

      // Dispatch action to update accommodation to the state
      dispatch(updateAccommodation(accommodationData));

      return response.data; // This will be the payload for the fulfilled action
    } catch (error) {
      console.error('Error updating accommodation:', error);
      // Check if error.response exists before accessing its properties
      return rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
    }
  }
);

const accommodationSlice = createSlice({
  name: 'accommodations',
  initialState: {
    accommodations: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addAccommodation(state, action) {
      const newAccommodation = action.payload;
      state.accommodations.push({
        id: newAccommodation.id,
        accommodationName: newAccommodation.accommodationName || "N/A",
        pricing: newAccommodation.pricing || "0",
        pricingUnit: newAccommodation.pricingUnit || "per night",
        hasBooking: newAccommodation.hasBooking || false,
        inclusions: newAccommodation.inclusions || [],
        termsAndConditions: newAccommodation.termsAndConditions || [],
        images: newAccommodation.images || [],
        accommodationType: newAccommodation.accommodationType || "Unknown",
      });
    },
    updateAccommodation(state, action) {
      const updatedAccommodation = action.payload;

      const accommodationIndex = state.accommodations.findIndex(
        accommodation => accommodation.id === updatedAccommodation.product_id
      );

      if (accommodationIndex !== -1) {
        // Update the existing accommodation
        state.accommodations[accommodationIndex] = {
          id: updatedAccommodation.product_id,
          accommodationName: updatedAccommodation.accommodationName || "N/A",
          pricing: updatedAccommodation.pricing || "0",
          pricingUnit: updatedAccommodation.pricingUnit || "per night",
          hasBooking: updatedAccommodation.hasBooking || false,
          inclusions: updatedAccommodation.inclusions || [],
          termsAndConditions: updatedAccommodation.termsAndConditions || [],
          images: updatedAccommodation.images || [],
          accommodationType: updatedAccommodation.accommodationType || "Unknown",
        };
      }
    },
    deleteAccommodations(state, action) {
      const idsToDelete = action.payload;
      state.accommodations = state.accommodations.filter(
        (accommodation) => !idsToDelete.includes(accommodation.id)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBusinessProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBusinessProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.accommodations = action.payload.map((product) => ({
          id: product.product_id,
          accommodationName: product.name,
          pricing: product.price,
          pricingUnit: product.pricing_unit,
          hasBooking: product.booking_operation === 1,
          inclusions: product.inclusions || [],
          termsAndConditions: product.termsAndConditions || [],
          images: product.images || [],
          accommodationType: product.type || "Unknown",
        }));
      })
      .addCase(fetchBusinessProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch business products';
      })
      .addCase(addProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // The accommodation is already added via dispatch in the thunk
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add product';
      })
      .addCase(handleUpdateAccommodation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleUpdateAccommodation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // The accommodation is already updated via dispatch in the thunk
      })
      .addCase(handleUpdateAccommodation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update accommodation';
      });
  },
});

// Export the action creators
export const { addAccommodation, updateAccommodation, deleteAccommodations } = accommodationSlice.actions;
export default accommodationSlice.reducer;

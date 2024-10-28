import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch business products (activities)

export const fetchBusinessProducts = createAsyncThunk(
  'business/fetchBusinessProducts',
  async () => {
    try {
      const response = await axios.get('http://localhost:5000/getBusinessProduct', {
        params: { category: 'activity'},
        withCredentials: true,
      });
      return response.data.businessProducts || []; // Return an empty array if no products
    } catch (error) {
      throw new Error(error.response?.data.message || 'Failed to fetch activities');
    }
  }
);

// Async thunk to add a new business product (activity)
export const addProduct = createAsyncThunk(
  'business/addProduct',
  async (formData, { dispatch }) => {
    const response = await axios.post('http://localhost:5000/add-product', formData, {
      withCredentials: true,
    });

    const product = response.data;
    if (!product || !product.product_id || !product.name) {
      throw new Error('Invalid activity data received from the server');
    }

    const activityData = {
      id: product.product_id,
      category: product.category,
      activityName: product.name,
      pricing: product.price,
      pricingUnit: product.pricing_unit,
      hasBooking: parseInt(product.booking_operation) === 1, // Convert to number and compare
      inclusions: (product.inclusions || []).map((inclusion) => ({
        id: inclusion.id,
        item: inclusion.item, // assuming `inclusion` is a text string
      })),
      termsAndConditions: (product.termsAndConditions || []).map((term) => ({
        id: term.id,
        item: term.item, // assuming `term` is a text string
      })),
      images: product.images.map(image => ({
        id: image.id,
        path: image.path,
        title: image.title || '', // Handle title or default to an empty string
      })),
      type: product.type || "Unknown",
    };

    // console.log(activityData);
    // Dispatch action to add activity to the state
    dispatch(addActivity(activityData));

    return response.data;
  }
);

// Async thunk to handle activity update
export const handleUpdateActivity = createAsyncThunk(
  'activity/update',
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put('http://localhost:5000/update-product', formData, {
        withCredentials: true,
      });

      const product = response.data;
      if (!product || !product.product_id || !product.name) {
        throw new Error('Invalid activity data received from the server');
      }
      console.log(formData, product);

      const activityData = {
        product_id: product.product_id,
        category: product.category,
        activityName: product.name,
        pricing: product.price,
        pricingUnit: product.pricing_unit,
        hasBooking: parseInt(product.booking_operation) === 1,
        inclusions: (product.inclusions || []).map((inclusion) => ({
          id: inclusion.id,
          item: inclusion.item, // assuming `inclusion` is a text string
        })),
        termsAndConditions: (product.termsAndConditions || []).map((term) => ({
          id: term.id,
          item: term.item, // assuming `term` is a text string
        })),
        images: product.images.map(image => ({
          id: image.id,
          path: image.path,
          title: image.title || '', // Handle title or default to an empty string
        })),
        type: product.type || "Unknown",
      };

      // console.log(activityData);
      // Dispatch action to update activity to the state
      dispatch(updateActivity(activityData));

      return response.data; // This will be the payload for the fulfilled action
    } catch (error) {
      console.error('Error updating activity:', error);
      // Check if error.response exists before accessing its properties
      return rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
    }
  }
);

const activitySlice = createSlice({
  name: 'activitiess',
  initialState: {
    activities: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addActivity: (state, action) => {
      const newActivity = action.payload;
      state.activities.push({
        id: newActivity.id,
        category: newActivity.category,
        activityName: newActivity.activityName || "N/A",
        pricing: newActivity.pricing || "0",
        pricingUnit: newActivity.pricingUnit || "per night",
        hasBooking: newActivity.hasBooking || false,
        inclusions: newActivity.inclusions.map(inclusion => ({
          id: inclusion.id,
          item: inclusion.item,
        })),
        termsAndConditions: newActivity.termsAndConditions.map(term => ({
          id: term.id,
          item: term.item,
        })),
        images: newActivity.images.map((img) => ({
          id: img.id,
            path: img.path,
            title: img.title || '',
        })),
        type: newActivity.type || "Unknown",
      });
    },
    updateActivity: (state, action) => {
      const updatedActivity = action.payload;
      console.log("Actvity: ", updatedActivity);
      console.log("All activity IDs in state:", state.activities.map(activity => activity.id));

      const activityIndex = state.activities.findIndex(
        activity => activity.id.toString() === updatedActivity.product_id.toString()
      );

      console.log("Activity Index: ", activityIndex);

      if (activityIndex !== -1) {
        // Update the existing accommodation
        state.activities[activityIndex] = {
          id: updateActivity.product_id,
          activityName: updateActivity.activityName || "N/A",
          pricing: updateActivity.pricing || "0",
          pricingUnit: updateActivity.pricingUnit || "per night",
          hasBooking: updateActivity.hasBooking || false,
          inclusions: updateActivity.inclusions.map(inclusion => ({
            id: inclusion.id,
            item: inclusion.item,
          })),
          termsAndConditions: updateActivity.termsAndConditions.map(term => ({
            id: term.id,
            item: term.item,
          })),
          images: updateActivity.images.map((img) => ({
            id: img.id,
            path: img.path,
            title: img.title || '',
          })),
          type: updateActivity.type || "Unknown",
        };
      }
    },
    deleteActivities: (state, action) => {
      const idsToDelete = action.payload;
      state.activities = state.activities.filter(
        (activity) => !idsToDelete.includes(activity.id)
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
        state.activities = action.payload.map((product) => ({
          id: product.product_id,
          activityName: product.name,
          pricing: product.price,
          pricingUnit: product.pricing_unit,
          hasBooking: product.booking_operation === 1,
          inclusions: product.inclusions || [],
          termsAndConditions: product.termsAndConditions || [],
          images: product.images || [],
          type: product.type || "Unknown",
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
        // The activity is already added via dispatch in the thunk
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to add product';
      })
      .addCase(handleUpdateActivity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(handleUpdateActivity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // The activity is already updated via dispatch in the thunk
      })
      .addCase(handleUpdateActivity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update activity';
      });
  },
});

// Export the action creators
export const { addActivity, updateActivity, deleteActivities } = activitySlice.actions;
export default activitySlice.reducer;

// const initialState = {
//   activities: [
//     {
//       id: nanoid(),
//       activityName: "Mountain Hiking",
//       pricing: "1500",
//       pricingUnit: "per person",
//       hasBooking: true,
//       inclusions: ["Guide", "Lunch", "Transportation"],
//       images: [
//         { url: "https://via.placeholder.com/150", title: "Mountain View" },
//         { url: "https://via.placeholder.com/150", title: "Trail" }
//       ],
//       activityType: "Outdoor",
//     },
//     {
//       id: nanoid(),
//       activityName: "Snorkeling Tour",
//       pricing: "2000",
//       pricingUnit: "per person",
//       hasBooking: false,
//       inclusions: ["Equipment", "Boat Ride"],
//       images: [
//         "https://via.placeholder.com/150",
//         "https://via.placeholder.com/150"
//       ],
//       activityType: "Water Adventure",
//     },
//     {
//       id: nanoid(),
//       activityName: "City Tour",
//       pricing: "800",
//       pricingUnit: "per person",
//       hasBooking: true,
//       inclusions: ["Transportation", "Tour Guide", "Lunch"],
//       images: [
//         "https://via.placeholder.com/150",
//         "https://via.placeholder.com/150"
//       ],
//       activityType: "Sightseeing",
//     },
//   ],
// };

// const activitiesSlice = createSlice({
//   name: 'activities',
//   initialState,
//   reducers: {
//     addActivity: {
//       reducer(state, action) {
//         state.activities.push(action.payload);
//       },
//       prepare(activity) {
//         return {
//           payload: {
//             id: nanoid(),
//             activityType: activity.activityType, // New field for activity type
//             ...activity,
//           },
//         };
//       },
//     },
//     updateActivity(state, action) {
//       const { id, updatedData } = action.payload;
//       const activityIndex = state.activities.findIndex((activity) => activity.id === id);
//       if (activityIndex !== -1) {
//         state.activities[activityIndex] = { ...state.activities[activityIndex], ...updatedData };
//       }
//     },
//     deleteActivities(state, action) {
//       const idsToDelete = action.payload;
//       state.activities = state.activities.filter((activity) => !idsToDelete.includes(activity.id));
//     },
//   },
// });

// export const { addActivity, updateActivity, deleteActivities } = activitiesSlice.actions;
// export default activitiesSlice.reducer;

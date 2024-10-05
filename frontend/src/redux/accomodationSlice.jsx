import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  accommodations: [],
};

const accommodationSlice = createSlice({
  name: 'accommodations',
  initialState,
  reducers: {
    addAccommodation: {
      reducer(state, action) {
        state.accommodations.push(action.payload);
      },
      prepare(accommodation) {
        return {
          payload: {
            id: nanoid(),
            accommodationType: accommodation.accommodationType,
            ...accommodation,
          },
        };
      },
    },
    updateAccommodation(state, action) {
      const { id, updatedData } = action.payload;
      const accommodationIndex = state.accommodations.findIndex((accommodation) => accommodation.id === id);
      if (accommodationIndex !== -1) {
        state.accommodations[accommodationIndex] = { ...state.accommodations[accommodationIndex], ...updatedData };
      }
    },
    deleteAccommodations(state, action) {
      const idsToDelete = action.payload;
      state.accommodations = state.accommodations.filter((accommodation) => !idsToDelete.includes(accommodation.id));
    },
  },
});

export const { addAccommodation, updateAccommodation, deleteAccommodations } = accommodationSlice.actions;
export default accommodationSlice.reducer;

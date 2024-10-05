import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  step: 1,
  formData: {
    firstName: "",
    lastName: "",
    applicationName: "",
    applicationTerritory: "",
    certificateNo: "",
    applicationScope: "",
    applicationType: "",
    selectedCategories: [],
    customCategories: []
  },
};

// Slice definition
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    // Update form data
    updateFormData: (state, action) => {
      const { name, value } = action.payload;
      state.formData[name] = value;
    },
    // Go to the next step
    nextStep: (state) => {
      state.step += 1;
    },
    // Go to the previous step
    prevStep: (state) => {
      state.step -= 1;
    },
    // Add a custom category
    addCustomCategory: (state, action) => {
      const { category } = action.payload;
      state.formData.customCategories.push(category);
    },
    // Update selected categories
    updateSelectedCategories: (state, action) => {
      state.formData.selectedCategories = action.payload;
    },
  },
});

export const {
  updateFormData,
  nextStep,
  prevStep,
  addCustomCategory,
  updateSelectedCategories,
} = applicationSlice.actions;

export default applicationSlice.reducer;

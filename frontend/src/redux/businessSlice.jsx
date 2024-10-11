// businessSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  businessName: '',
  businessLogo: null,
  businessCard: {
    cardImage: null,
    category: 'Relaxation', 
    location: 'Donsol',
    description: 'Relax and enjoy the scenic beach view.',
    priceRange: '₱500-2000',
  },
  heroImages: [],
  aboutUs: '',
  facilities: [],
  policies: [],
  contactInfo: [],
  openingHours: [
    { day: 'Monday', open: '', close: '' },
    { day: 'Tuesday', open: '', close: '' },
    { day: 'Wednesday', open: '', close: '' },
    { day: 'Thursday', open: '', close: '' },
    { day: 'Friday', open: '', close: '' },
    { day: 'Saturday', open: '', close: '' },
    { day: 'Sunday', open: '', close: '' },
  ],
};

const businessSlice = createSlice({
  name: 'business',
  initialState,
  reducers: {
    // General business data update
    updateBusinessData: (state, action) => {
      Object.assign(state, action.payload);
    },

    // Facilities-related reducers
    addFacility: (state) => {
      state.facilities.push({ icon: null, name: '', description: '' });
    },
    updateFacility: (state, action) => {
      const { index, field, value } = action.payload || {};
      if (index === undefined || !field || value === undefined) {
        console.error('Invalid payload for updateFacility:', action.payload);
        return;
      }
      state.facilities[index][field] = value;
    },
    removeFacility: (state, action) => {
      const { index } = action.payload || {};
      if (index === undefined) {
        console.error('Invalid payload for removeFacility:', action.payload);
        return;
      }
      state.facilities.splice(index, 1);
    },
    updateFacilityIcon: (state, action) => {
      const { index, icon } = action.payload || {};
      if (index === undefined || !icon) {
        console.error('Invalid payload for updateFacilityIcon:', action.payload);
        return;
      }
      state.facilities[index].icon = icon;
    },

    // Policies-related reducers
    addPolicy: (state) => {
      state.policies.push({ title: '', items: [''] });
    },
    updatePolicy: (state, action) => {
      const { index, field, value } = action.payload || {};
      if (index === undefined || !field || value === undefined) {
        console.error('Invalid payload for updatePolicy:', action.payload);
        return;
      }
      state.policies[index][field] = value;
    },
    removePolicy: (state, action) => {
      const { index } = action.payload || {};
      if (index === undefined) {
        console.error('Invalid payload for removePolicy:', action.payload);
        return;
      }
      state.policies.splice(index, 1);
    },
    addPolicyItem: (state, action) => {
      const { policyIndex } = action.payload || {};
      if (policyIndex === undefined) {
        console.error('Invalid payload for addPolicyItem:', action.payload);
        return;
      }
      state.policies[policyIndex].items.push('');
    },
    updatePolicyItem: (state, action) => {
      const { policyIndex, itemIndex, value } = action.payload || {};
      if (policyIndex === undefined || itemIndex === undefined || value === undefined) {
        console.error('Invalid payload for updatePolicyItem:', action.payload);
        return;
      }
      state.policies[policyIndex].items[itemIndex] = value;
    },
    removePolicyItem: (state, action) => {
      const { policyIndex, itemIndex } = action.payload || {};
      if (policyIndex === undefined || itemIndex === undefined) {
        console.error('Invalid payload for removePolicyItem:', action.payload);
        return;
      }
      state.policies[policyIndex].items.splice(itemIndex, 1);
    },

    // Contact Info reducers
    addContactInfo: (state) => {
      state.contactInfo.push({ id: Date.now(), icon: 'FaPlus', label: '', value: '' });
    },
    updateContactInfo: (state, action) => {
      const { id, field, value } = action.payload || {};
      if (!id || !field || value === undefined) {
        console.error('Invalid payload for updateContactInfo:', action.payload);
        return;
      }
      state.contactInfo = state.contactInfo.map(info =>
        info.id === id ? { ...info, [field]: value } : info
      );
    },
    removeContactInfo: (state, action) => {
      const { id } = action.payload || {};
      if (!id) {
        console.error('Invalid payload for removeContactInfo:', action.payload);
        return;
      }
      state.contactInfo = state.contactInfo.filter(info => info.id !== id);
    },
    updateContactIcon: (state, action) => {
      const { id, icon } = action.payload || {};
      if (!id || !icon) {
        console.error('Invalid payload for updateContactIcon:', action.payload);
        return;
      }
      state.contactInfo = state.contactInfo.map(info =>
        info.id === id ? { ...info, icon } : info
      );
    },
    updateBusinessCard: (state, action) => {
      const { cardImage, description, location, priceRange } = action.payload;
      if (cardImage !== undefined) state.businessCard.cardImage = cardImage;
      if (description !== undefined) state.businessCard.description = description;
      if (location !== undefined) state.businessCard.location = location;
      if (priceRange !== undefined) state.businessCard.priceRange = priceRange;
    },
  },
});

export const {
  updateBusinessData,
  addFacility,
  updateFacility,
  removeFacility,
  updateFacilityIcon,
  addPolicy,
  updatePolicy,
  removePolicy,
  addPolicyItem,
  updatePolicyItem,
  removePolicyItem,
  addContactInfo,
  updateContactInfo,
  removeContactInfo,
  updateContactIcon,
  updateBusinessCard,
} = businessSlice.actions;

export default businessSlice.reducer;

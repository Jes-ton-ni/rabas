import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  activities: [
    {
      id: nanoid(),
      activityName: "Mountain Hiking",
      pricing: "1500",
      pricingUnit: "per person",
      hasBooking: true,
      inclusions: ["Guide", "Lunch", "Transportation"],
      images: [
        { url: "https://via.placeholder.com/150", title: "Mountain View" },
        { url: "https://via.placeholder.com/150", title: "Trail" }
      ],
      activityType: "Outdoor",
    },
    {
      id: nanoid(),
      activityName: "Snorkeling Tour",
      pricing: "2000",
      pricingUnit: "per person",
      hasBooking: false,
      inclusions: ["Equipment", "Boat Ride"],
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      activityType: "Water Adventure",
    },
    {
      id: nanoid(),
      activityName: "City Tour",
      pricing: "800",
      pricingUnit: "per person",
      hasBooking: true,
      inclusions: ["Transportation", "Tour Guide", "Lunch"],
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      activityType: "Sightseeing",
    },
  ],
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    addActivity: {
      reducer(state, action) {
        state.activities.push(action.payload);
      },
      prepare(activity) {
        return {
          payload: {
            id: nanoid(),
            activityType: activity.activityType, // New field for activity type
            ...activity,
          },
        };
      },
    },
    updateActivity(state, action) {
      const { id, updatedData } = action.payload;
      const activityIndex = state.activities.findIndex((activity) => activity.id === id);
      if (activityIndex !== -1) {
        state.activities[activityIndex] = { ...state.activities[activityIndex], ...updatedData };
      }
    },
    deleteActivities(state, action) {
      const idsToDelete = action.payload;
      state.activities = state.activities.filter((activity) => !idsToDelete.includes(activity.id));
    },
  },
});

export const { addActivity, updateActivity, deleteActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;

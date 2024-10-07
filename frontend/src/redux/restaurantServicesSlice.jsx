import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
  services: [
    {
      id: nanoid(),
      serviceName: "Valentine date Reservation Table",
      pricing: "700",
      pricingUnit: "per person",
      hasBooking: true,
      inclusions: ["Violin Performance", "3 course meal"],
      images: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150"
      ],
      serviceType: "Fine Dining",
    },
  ],
};

const restaurantServicesSlice = createSlice({
  name: 'restaurantServices',
  initialState,
  reducers: {
    addService: {
      reducer(state, action) {
        state.services.push(action.payload);
      },
      prepare(service) {
        return {
          payload: {
            id: nanoid(),
            serviceType: service.serviceType,
            ...service,
          },
        };
      },
    },
    updateService(state, action) {
      const { id, updatedData } = action.payload;
      const serviceIndex = state.services.findIndex((service) => service.id === id);
      if (serviceIndex !== -1) {
        state.services[serviceIndex] = { ...state.services[serviceIndex], ...updatedData };
      }
    },
    deleteServices(state, action) {
      const idsToDelete = action.payload;
      state.services = state.services.filter((service) => !idsToDelete.includes(service.id));
    },
  },
});

export const { addService, updateService, deleteServices } = restaurantServicesSlice.actions;
export default restaurantServicesSlice.reducer;

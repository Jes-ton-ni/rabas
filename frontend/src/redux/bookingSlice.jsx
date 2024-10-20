import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pendingBookings: [
    { id: 1, customerName: 'John Doe', type: 'Accommodation', email: 'john@example.com', checkInDate: '2024-09-24', checkOutDate: '2024-09-26', numberOfNights: 2, adults: 2, children: 0, infants: 0, roomType: 'Deluxe', bedType: 'King', viewPreference: 'Sea View', specialRequests: 'Late check-in', status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', type: 'Table Reservation', email: 'jane@example.com', reservationDate: '2024-09-25', reservationTime: '6:00 PM', adults: 4, children: 1, mealPreference: 'Dinner', specialRequests: 'Anniversary table', status: 'Pending' },
    { id: 3, customerName: 'Alice Johnson', type: 'Attraction', email: 'alice@example.com', visitDate: '2024-09-28', activities: ['Safari Tour', 'Zip Lining'], activitiesDetails: [{ name: 'Safari Tour', preferredTime: 'Morning' }, { name: 'Zip Lining', preferredTime: 'Afternoon' }], adults: 2, children: 2, status: 'Pending' },
  ],
  activeBookings: [
    { id: 4, customerName: 'Michael Brown', type: 'Accommodation', email: 'michael@example.com', checkInDate: '2024-10-01', checkOutDate: '2024-10-05', numberOfNights: 4, adults: 1, children: 0, infants: 0, roomType: 'Suite', bedType: 'Queen', viewPreference: 'Mountain View', specialRequests: 'Early check-in', status: 'Active' },
    { id: 5, customerName: 'Emily Davis', type: 'Table Reservation', email: 'emily@example.com', reservationDate: '2024-10-02', reservationTime: '7:00 PM', adults: 2, children: 0, mealPreference: 'Vegan', specialRequests: 'Window seat', status: 'Active' },
    { id: 6, customerName: 'Chris Wilson', type: 'Attraction', email: 'chris@example.com', visitDate: '2024-10-03', activities: ['Rock Climbing', 'Kayaking'], activitiesDetails: [{ name: 'Rock Climbing', preferredTime: 'Morning' }, { name: 'Kayaking', preferredTime: 'Afternoon' }], adults: 3, children: 1, status: 'Active' },
  ],
  bookingHistory: [],
  chatMessages: [],
  walkInCustomers: [],
  // Mockup sample data for walk-in customers
  sampleWalkInCustomers: {
    Accommodation: [
      { id: 101, customerName: 'Sample John', details: 'Sample Luxury Cabin, 2 guests, Check-in: 2023-12-01, Check-out: 2023-12-05' }
    ],
    'Table Reservation': [
      { id: 102, customerName: 'Sample Jane', details: 'Sample Dining, Reservation Date: 2023-12-10, Time: 19:00' }
    ],
    Attraction: [
      { id: 103, customerName: 'Sample Alice', details: 'Sample Hiking Adventure, Activity Date: 2023-12-15' }
    ]
  },
  walkInHistory: [], // New state for walk-in history
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addPendingBooking: (state, action) => {
      state.pendingBookings.push(action.payload);
    },
    markBookingAsActive: (state, action) => {
      const booking = state.pendingBookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'Active';
        state.activeBookings.push(booking);
        state.pendingBookings = state.pendingBookings.filter(b => b.id !== action.payload);
      }
    },
    markBookingAsCompleted: (state, action) => {
      const booking = state.activeBookings.find(b => b.id === action.payload);
      if (booking) {
        booking.status = 'Completed';
        state.bookingHistory.push(booking);
        state.activeBookings = state.activeBookings.filter(b => b.id !== action.payload);
      } else {
        console.error('Booking not found for completion:', action.payload);
      }
    },
    addChatMessage: (state, action) => {
      state.chatMessages.push(action.payload);
    },
    addWalkInCustomer: (state, action) => {
      state.walkInCustomers.push(action.payload);
    },
    updateWalkInCustomerStatus: (state, action) => {
      const { id, status } = action.payload;
      const customer = state.walkInCustomers.find(c => c.id === id);
      if (customer) {
        customer.status = status;
      }
    },
    markWalkInAsCompleted: (state, action) => {
      const customerId = action.payload;
      const customerIndex = state.walkInCustomers.findIndex(c => c.id === customerId);
      if (customerIndex !== -1) {
        const completedCustomer = state.walkInCustomers.splice(customerIndex, 1)[0];
        completedCustomer.status = 'Completed';
        state.walkInHistory.push(completedCustomer);
      }
    },
  },
});

export const {
  addPendingBooking,
  markBookingAsActive,
  markBookingAsCompleted,
  addChatMessage,
  addWalkInCustomer,
  updateWalkInCustomerStatus,
  markWalkInAsCompleted, // Export the new action
} = bookingsSlice.actions;

export default bookingsSlice.reducer;

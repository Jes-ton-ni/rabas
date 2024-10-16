import React, { useState } from 'react';
import { Button, Badge, Input } from '@nextui-org/react';
import Sidebar from '../components/sidebar';
import { PiChatCircleText } from "react-icons/pi";
import { Tabs, Tab } from "@nextui-org/tabs";
import { FaSearch } from 'react-icons/fa';
import ChatModal from './ChatSystem/ChatModal';

// Sample booking data
const initialBookings = [
  { id: 1, customerName: 'John Doe', type: 'Accommodation', email: 'john@example.com', checkInDate: '2024-09-24', checkOutDate: '2024-09-26', numberOfNights: 2, adults: 2, children: 0, infants: 0, roomType: 'Deluxe', bedType: 'King', viewPreference: 'Sea View', specialRequests: 'Late check-in', status: 'Pending' },
  { id: 2, customerName: 'Jane Smith', type: 'Table Reservation', email: 'jane@example.com', reservationDate: '2024-09-25', reservationTime: '6:00 PM', adults: 4, children: 1, mealPreference: 'Dinner', specialRequests: 'Anniversary table', status: 'Confirmed' },
  { id: 3, customerName: 'Alice Johnson', type: 'Attraction', email: 'alice@example.com', visitDate: '2024-09-28', activities: ['Safari Tour', 'Zip Lining'], activitiesDetails: [{ name: 'Safari Tour', preferredTime: 'Morning' }, { name: 'Zip Lining', preferredTime: 'Afternoon' }], adults: 2, children: 2, status: 'Pending' },
];

// Mockup data for active bookings
const mockActiveBookings = [
  { id: 4, customerName: 'Michael Brown', type: 'Accommodation', email: 'michael@example.com', checkInDate: '2024-10-01', checkOutDate: '2024-10-05', numberOfNights: 4, adults: 1, children: 0, infants: 0, roomType: 'Suite', bedType: 'Queen', viewPreference: 'Mountain View', specialRequests: 'Early check-in', status: 'Active' },
  { id: 5, customerName: 'Emily Davis', type: 'Table Reservation', email: 'emily@example.com', reservationDate: '2024-10-02', reservationTime: '7:00 PM', adults: 2, children: 0, mealPreference: 'Vegan', specialRequests: 'Window seat', status: 'Active' },
  { id: 6, customerName: 'Chris Wilson', type: 'Attraction', email: 'chris@example.com', visitDate: '2024-10-03', activities: ['Rock Climbing', 'Kayaking'], activitiesDetails: [{ name: 'Rock Climbing', preferredTime: 'Morning' }, { name: 'Kayaking', preferredTime: 'Afternoon' }], adults: 3, children: 1, status: 'Active' },
];

// Mockup data for booking history
const mockBookingHistory = [
  { id: 7, customerName: 'Sarah Lee', type: 'Accommodation', email: 'sarah@example.com', checkInDate: '2024-09-10', checkOutDate: '2024-09-12', numberOfNights: 2, adults: 2, children: 1, infants: 0, roomType: 'Standard', bedType: 'Double', viewPreference: 'City View', specialRequests: 'Crib needed', status: 'Completed' },
  { id: 8, customerName: 'David Kim', type: 'Table Reservation', email: 'david@example.com', reservationDate: '2024-09-15', reservationTime: '8:00 PM', adults: 4, children: 0, mealPreference: 'Seafood', specialRequests: 'Birthday cake', status: 'Completed' },
  { id: 9, customerName: 'Laura Martinez', type: 'Attraction', email: 'laura@example.com', visitDate: '2024-09-20', activities: ['Museum Tour', 'Boat Ride'], activitiesDetails: [{ name: 'Museum Tour', preferredTime: 'Morning' }, { name: 'Boat Ride', preferredTime: 'Evening' }], adults: 2, children: 2, status: 'Completed' },
];

// Booking card component for displaying individual bookings
const BookingCard = ({ booking, onOpenChatModal }) => (
  <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3 transition-shadow duration-300 ease-in-out hover:shadow-2xl">
    <div className='flex justify-between items-center'>
      <h2 className="text-lg font-semibold text-gray-800">{booking.customerName}</h2>
      <div className='flex gap-2'>
        <Badge content="1" color="danger">
          <PiChatCircleText className='text-lg cursor-pointer hover:text-color2' onClick={onOpenChatModal} />
        </Badge>
      </div>
    </div>

    <p className="text-gray-500">
      {booking.type === 'Accommodation' && (
        <>
          {booking.checkInDate} to {booking.checkOutDate} | {booking.roomType} Room
        </>
      )}
      {booking.type === 'Table Reservation' && (
        <>
          {booking.reservationDate} at {booking.reservationTime} | {booking.mealPreference}
        </>
      )}
      {booking.type === 'Attraction' && (
        <>
          {booking.visitDate} | Activities: {booking.activities.join(', ')}
        </>
      )}
    </p>

    <div className="flex justify-between items-center">
      <Badge color={booking.status === 'Pending' ? 'warning' : booking.status === 'Active' ? 'success' : 'default'}>
        {booking.status}
      </Badge>
    </div>
  </div>
);

// Main business booking component
const BusinessBooking = () => {
  const [isChatModalVisible, setChatModalVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [currentBookingDetails, setCurrentBookingDetails] = useState(null);
  const [pendingBookings, setPendingBookings] = useState(initialBookings);
  const [activeBookings, setActiveBookings] = useState(mockActiveBookings);
  const [bookingHistory, setBookingHistory] = useState(mockBookingHistory);
  const [searchQuery, setSearchQuery] = useState('');

  const openChatModal = (booking) => {
    setCurrentBookingDetails(booking);
    setChatModalVisible(true);
  };

  const closeChatModal = () => setChatModalVisible(false);

  const handleSendMessage = (message) => {
    if (message.trim()) {
      setChatMessages([...chatMessages, { sender: 'Customer', message }]);
    }
  };

  const filteredBookings = (bookings) => bookings.filter(b =>
    b.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 relative">
      <Sidebar />

      <div className="flex-1 p-6 md:p-8 max-h-screen overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Bookings and Reservations</h1>

          <Input
            clearable
            contentLeft={<FaSearch />}
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width="250px"
          />
        </div>

        <Tabs keepMounted variant="solid" className="sticky top-0 z-10 bg-gray-50">
          <Tab title="Pending Bookings">
            <div className="w-full space-y-4">
              <div className="text-xl font-bold mb-4 text-gray-700">New Bookings</div>

              {/* Accommodation Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Accommodation</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(pendingBookings.filter(b => b.type === 'Accommodation')).length > 0 ? (
                    filteredBookings(pendingBookings.filter(b => b.type === 'Accommodation')).map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onOpenChatModal={() => openChatModal(booking)}
                      />
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No pending accommodation bookings available</div>
                  )}
                </div>
              </div>

              {/* Table Reservations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Table Reservations</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(pendingBookings.filter(b => b.type === 'Table Reservation')).length > 0 ? (
                    filteredBookings(pendingBookings.filter(b => b.type === 'Table Reservation')).map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onOpenChatModal={() => openChatModal(booking)}
                      />
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No pending table reservations available</div>
                  )}
                </div>
              </div>

              {/* Activity Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Activities</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(pendingBookings.filter(b => b.type === 'Attraction')).length > 0 ? (
                    filteredBookings(pendingBookings.filter(b => b.type === 'Attraction')).map((booking) => (
                      <BookingCard
                        key={booking.id}
                        booking={booking}
                        onOpenChatModal={() => openChatModal(booking)}
                      />
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No pending activity bookings available</div>
                  )}
                </div>
              </div>
            </div>
          </Tab>

          <Tab title="Active Bookings">
            <div className="w-full space-y-4">
              <div className="text-xl font-bold mb-4 text-gray-700">Current Bookings</div>

              {/* Accommodation Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Accommodation</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(activeBookings.filter(b => b.type === 'Accommodation')).length > 0 ? (
                    filteredBookings(activeBookings.filter(b => b.type === 'Accommodation')).map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
                        <div>
                          <h2 className="text-lg font-semibold">{booking.customerName}</h2>
                          <p>{booking.type} | Status: {booking.status}</p>
                          <p>Check-in Date: {booking.checkInDate}</p>
                          <p>Check-out Date: {booking.checkOutDate}</p>
                          <p>Room Type: {booking.roomType}</p>
                          <p>Bed Type: {booking.bedType}</p>
                          <p>View Preference: {booking.viewPreference}</p>
                          <p>Special Requests: {booking.specialRequests}</p>
                        </div>
                        <Button className='text-white' color="success" onClick={() => setActiveBookings(activeBookings.filter(b => b.id !== booking.id))}>
                          Mark as Completed
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No active accommodation bookings available</div>
                  )}
                </div>
              </div>

              {/* Table Reservations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Table Reservations</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(activeBookings.filter(b => b.type === 'Table Reservation')).length > 0 ? (
                    filteredBookings(activeBookings.filter(b => b.type === 'Table Reservation')).map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
                        <div>
                          <h2 className="text-lg font-semibold">{booking.customerName}</h2>
                          <p>{booking.type} | Status: {booking.status}</p>
                          <p>Reservation Date: {booking.reservationDate}</p>
                          <p>Reservation Time: {booking.reservationTime}</p>
                          <p>Meal Preference: {booking.mealPreference}</p>
                          <p>Special Requests: {booking.specialRequests}</p>
                        </div>
                        <Button color="success" className='text-white'  onClick={() => setActiveBookings(activeBookings.filter(b => b.id !== booking.id))}>
                          Mark as Completed
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No active table reservations available</div>
                  )}
                </div>
              </div>

              {/* Activity Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Activities</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(activeBookings.filter(b => b.type === 'Attraction')).length > 0 ? (
                    filteredBookings(activeBookings.filter(b => b.type === 'Attraction')).map((booking) => (
                      <div key={booking.id} className="flex justify-between items-center p-4 bg-white shadow-md rounded-lg">
                        <div>
                          <h2 className="text-lg font-semibold">{booking.customerName}</h2>
                          <p>{booking.type} | Status: {booking.status}</p>
                          <p>Activity Date: {booking.visitDate}</p>
                          <p>Activities: {booking.activities.join(', ')}</p>
                          <p>Preferred Times: {booking.activitiesDetails.map(activity => `${activity.name} (${activity.preferredTime})`).join(', ')}</p>
                        </div>
                        <Button color="success" className='text-white' onClick={() => setActiveBookings(activeBookings.filter(b => b.id !== booking.id))}>
                          Mark as Completed
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No active activity bookings available</div>
                  )}
                </div>
              </div>
            </div>
          </Tab>

          <Tab title="Booking History">
            <div className="w-full space-y-4">
              <div className="text-xl font-bold mb-4 text-gray-700">Completed Bookings</div>

              {/* Accommodation Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Accommodation</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(bookingHistory.filter(b => b.type === 'Accommodation')).length > 0 ? (
                    filteredBookings(bookingHistory.filter(b => b.type === 'Accommodation')).map((booking) => (
                      <div key={booking.id} className="p-4 bg-gray-200 rounded-lg">
                        <h2 className="text-lg font-semibold">{booking.customerName}</h2>
                        <p>{booking.type} | Completed</p>
                        <p>Check-in Date: {booking.checkInDate}</p>
                        <p>Check-out Date: {booking.checkOutDate}</p>
                        <p>Room Type: {booking.roomType}</p>
                        <p>Bed Type: {booking.bedType}</p>
                        <p>View Preference: {booking.viewPreference}</p>
                        <p>Special Requests: {booking.specialRequests}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No completed accommodation bookings available</div>
                  )}
                </div>
              </div>

              {/* Table Reservations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Table Reservations</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(bookingHistory.filter(b => b.type === 'Table Reservation')).length > 0 ? (
                    filteredBookings(bookingHistory.filter(b => b.type === 'Table Reservation')).map((booking) => (
                      <div key={booking.id} className="p-4 bg-gray-200 rounded-lg">
                        <h2 className="text-lg font-semibold">{booking.customerName}</h2>
                        <p>{booking.type} | Completed</p>
                        <p>Reservation Date: {booking.reservationDate}</p>
                        <p>Reservation Time: {booking.reservationTime}</p>
                        <p>Meal Preference: {booking.mealPreference}</p>
                        <p>Special Requests: {booking.specialRequests}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No completed table reservations available</div>
                  )}
                </div>
              </div>

              {/* Activity Bookings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Activities</h3>
                <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
                  {filteredBookings(bookingHistory.filter(b => b.type === 'Attraction')).length > 0 ? (
                    filteredBookings(bookingHistory.filter(b => b.type === 'Attraction')).map((booking) => (
                      <div key={booking.id} className="p-4 bg-gray-200 rounded-lg">
                        <h2 className="text-lg font-semibold">{booking.customerName}</h2>
                        <p>{booking.type} | Completed</p>
                        <p>Activity Date: {booking.visitDate}</p>
                        <p>Activities: {booking.activities.join(', ')}</p>
                        <p>Preferred Times: {booking.activitiesDetails.map(activity => `${activity.name} (${activity.preferredTime})`).join(', ')}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-gray-500">No completed activity bookings available</div>
                  )}
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>

        {/* Floating chat button */}
        <button
          className="fixed bottom-4 right-4 bg-color1 text-white p-4 rounded-full shadow-lg hover:bg-color2 focus:outline-none z-50"
          onClick={() => setChatModalVisible(true)}
        >
          <PiChatCircleText size={24} />
        </button>

        <ChatModal
          isOpen={isChatModalVisible}
          onClose={closeChatModal}
          chatMessages={chatMessages}
          handleSendMessage={handleSendMessage}
          currentBookingDetails={currentBookingDetails}
        />
      </div>
    </div>
  );
};

export default BusinessBooking;

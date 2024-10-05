import { Button, Badge, Tooltip, Calendar, DateRangePicker } from '@nextui-org/react';
import Sidebar from '../components/sidebar';
import { parseZonedDateTime } from '@internationalized/date';
import { RiCalendar2Line } from "react-icons/ri";
import { useState } from 'react';
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Modal } from "@nextui-org/modal";
import { PiChatCircleText } from "react-icons/pi";
import { FaPenToSquare } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";

// Updated sample booking data
const initialBookings = [
  { id: 1, customerName: 'John Doe', type: 'Accommodation', email: 'john@example.com', checkInDate: '2024-09-24', checkOutDate: '2024-09-26', numberOfNights: 2, adults: 2, children: 0, infants: 0, roomType: 'Deluxe', bedType: 'King', viewPreference: 'Sea View', specialRequests: 'Late check-in', status: 'Pending' },
  { id: 2, customerName: 'Jane Smith', type: 'Table Reservation', email: 'jane@example.com', reservationDate: '2024-09-25', reservationTime: '6:00 PM', adults: 4, children: 1, mealPreference: 'Dinner', specialRequests: 'Anniversary table', status: 'Confirmed' },
  { id: 3, customerName: 'Alice Johnson', type: 'Attraction', email: 'alice@example.com', visitDate: '2024-09-28', activities: ['Safari Tour', 'Zip Lining'], activitiesDetails: [{ name: 'Safari Tour', preferredTime: 'Morning' }, { name: 'Zip Lining', preferredTime: 'Afternoon' }], adults: 2, children: 2, status: 'Pending' },
];

const BookingCard = ({ booking, onOpenModal, onChangeStatus }) => (
  <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3 transition-transform hover:scale-105">
    <div className='flex justify-between items-center'>
      <h2 className="text-lg font-semibold text-gray-800">{booking.customerName}</h2>
      <div className='flex gap-2'>
        <Badge content="1" color="danger">
          <PiChatCircleText className='text-lg cursor-pointer hover:text-color2' />
        </Badge>
        <RiCalendar2Line className='text-lg cursor-pointer hover:text-color2' onClick={onOpenModal} />
      </div>
    </div>

    {/* Display booking type-specific details */}
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
    <div className="flex flex-col md:flex-row gap-3 justify-end">
      <Button auto flat color="success" className='text-white h-9'>
        Accept
      </Button>
      <Button auto className='h-9' flat color="danger">
        Decline
      </Button>
    </div>
  </div>
);

const BusinessBooking = () => {
  const initialStartDate = new Date('2024-04-01');
  const initialEndDate = new Date('2024-04-09');

  const [isModalVisible, setModalVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: initialStartDate,
    end: initialEndDate,
  });
  const [bookings, setBookings] = useState(initialBookings);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [bookingIdToUpdate, setBookingIdToUpdate] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const changeBookingStatus = (bookingId) => {
    setStatusModalVisible(true);
    setBookingIdToUpdate(bookingId);
  };

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };

  const confirmStatusChange = () => {
    const updatedBookings = bookings.map(booking => {
      if (booking.id === bookingIdToUpdate) {
        const updatedBooking = { ...booking, status: selectedStatus };

        if (selectedStatus === 'Completed') {
          setBookingHistory(prev => [...prev, updatedBooking]);
          return null; // Remove from current bookings
        }

        return updatedBooking;
      }
      return booking;
    }).filter(booking => booking !== null);

    setBookings(updatedBookings);
    setStatusModalVisible(false);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8 max-h-screen overflow-y-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
          Bookings and Reservations
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking list */}
          <div className="w-full space-y-4">
            <div className="text-xl font-bold mb-4 text-gray-700">New Bookings</div>
            <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onOpenModal={openModal}
                    onChangeStatus={changeBookingStatus}
                  />
                ))
              ) : (
                <div className="p-4 text-gray-500">No bookings available</div>
              )}
            </div>
          </div>

          {/* Booking details */}
          <div className="w-full space-y-4">
            <h1 className="text-xl font-bold text-gray-700">Booking Details</h1>
            <div className="bg-white max-h-[600px] rounded-lg shadow-md p-4 md:p-6 overflow-auto">
              <table className="min-w-full bg-white text-center rounded-lg shadow-md table-fixed">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Customer</th>
                    <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Type</th>
                    <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Details</th>
                    <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Status</th>
                    <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b">
                      <td className="py-3 px-2 md:px-4">{booking.customerName}</td>
                      <td className="py-3 px-2 md:px-4">{booking.type}</td>
                      <td className="py-3 px-2 md:px-4">
                        {booking.type === 'Accommodation' && (
                          `Room: ${booking.roomType}, Check-in: ${booking.checkInDate}, Check-out: ${booking.checkOutDate}`
                        )}
                        {booking.type === 'Table Reservation' && (
                          `Reservation on ${booking.reservationDate} at ${booking.reservationTime}`
                        )}
                        {booking.type === 'Attraction' && (
                          `Activities: ${booking.activities.join(', ')}`
                        )}
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                          booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <div className="flex justify-center items-center gap-2">
                          <Tooltip
                            content={ 
                              <div className="px-1 py-2">
                                <div className="text-small font-bold">Booking Details</div>
                                {booking.type === 'Accommodation' && (
                                  <div className="text-tiny">
                                    {`Check-in: ${booking.checkInDate}, Check-out: ${booking.checkOutDate}`}
                                  </div>
                                )}
                                {booking.type === 'Table Reservation' && (
                                  <div className="text-tiny">
                                    {`Reservation Date: ${booking.reservationDate}, Time: ${booking.reservationTime}`}
                                  </div>
                                )}
                                {booking.type === 'Attraction' && (
                                  <div className="text-tiny">
                                    {`Activities: ${booking.activities.join(', ')}`}
                                  </div>
                                )}
                              </div>
                            }
                          >
                            <Button className="rounded-full bg-transparent">
                              <IoInformationCircle className="text-xl"/>
                            </Button>
                          </Tooltip>
                          <FaPenToSquare className="cursor-pointer text-xl" onClick={() => changeBookingStatus(booking.id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Booking History Section */}
        <div className="w-full mt-8">
          <h1 className="text-xl text-gray-700 font-bold mb-2">Booking History</h1>
          <div className="overflow-x-auto bg-white max-h-[600px] rounded-lg shadow-md p-4 md:p-6">
            <table className="min-w-full bg-white text-center rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Customer</th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Type</th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Details</th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3 px-2 md:px-4">{booking.customerName}</td>
                    <td className="py-3 px-2 md:px-4">{booking.type}</td>
                    <td className="py-3 px-2 md:px-4">
                      {booking.type === 'Accommodation' && (
                        `Room: ${booking.roomType}, Check-in: ${booking.checkInDate}, Check-out: ${booking.checkOutDate}`
                      )}
                      {booking.type === 'Table Reservation' && (
                        `Reservation on ${booking.reservationDate} at ${booking.reservationTime}`
                      )}
                      {booking.type === 'Attraction' && (
                        `Activities: ${booking.activities.join(', ')}`
                      )}
                    </td>
                    <td className="py-3 px-2 md:px-4">
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Availability Section */}
        <Modal isOpen={isModalVisible} onClose={closeModal} size='xl'>
          <ModalContent>
            <ModalHeader>
              <h2 className="text-2xl font-bold text-gray-800">Availability</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col items-center gap-4">
              <Calendar aria-label="Date (Read Only)" visibleMonths={2} isReadOnly />
              <DateRangePicker
                  label="Event duration"
                  hideTimeZone
                  visibleMonths={2}
                  defaultValue={{
                    start: parseZonedDateTime("2024-04-01T00:45[Asia/Manila]"), // Time in the Philippines
                    end: parseZonedDateTime("2024-04-08T11:15[Asia/Manila]"),   // Time in the Philippines
                  }}
                  onChange={handleDateChange}
                />

              </div>
            </ModalBody>
            <ModalFooter>
              <Button auto onClick={closeModal} color="primary">
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal for Booking Status Change */}
        <Modal isOpen={isStatusModalVisible} onClose={() => setStatusModalVisible(false)}>
          <ModalContent>
            <ModalHeader>
              <h2 className="text-2xl font-bold text-gray-800">Change Booking Status</h2>
            </ModalHeader>
            <ModalBody>
              <select className="w-full border rounded p-2" onChange={(e) => handleStatusChange(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
              </select>
            </ModalBody>
            <ModalFooter>
              <Button onClick={confirmStatusChange} color="primary">Update Status</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default BusinessBooking;

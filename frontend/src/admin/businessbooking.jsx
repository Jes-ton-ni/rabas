import { Button, Badge, Calendar, DateRangePicker, Tooltip } from '@nextui-org/react';
import Sidebar from '../components/sidebar';
import { parseZonedDateTime } from '@internationalized/date';
import { RiCalendar2Line } from "react-icons/ri";
import { useState } from 'react';
import { ModalContent, ModalHeader, ModalBody, ModalFooter, Modal } from "@nextui-org/modal";
import { PiChatCircleText } from "react-icons/pi";
import { FaPenToSquare } from "react-icons/fa6";
import { IoInformationCircle } from "react-icons/io5";

// Mock booking data
const initialBookings = [
  { id: 1, customerName: 'John Doe', date: '2024-09-24', time: '10:00 AM', type: 'Table', phone: '+123 456 789', status: 'Pending' },
  { id: 2, customerName: 'Jane Smith', date: '2024-09-25', time: '2:00 PM', type: 'Accommodation', phone: '+456 789 123', status: 'Confirmed' },
];

const BookingCard = ({ customerName, date, time, onOpenModal, bookingId, onChangeStatus }) => (
  <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-3 transition-transform hover:scale-105">
    <div className='flex justify-between items-center'>
      <h2 className="text-lg font-semibold text-gray-800">{customerName}</h2>
      <div className='flex gap-2'>
        <Badge content="1" color="danger">
          <PiChatCircleText className='text-lg cursor-pointer hover:text-color2' />
        </Badge>
        <RiCalendar2Line className='text-lg cursor-pointer hover:text-color2' onClick={onOpenModal} />
      </div>
    </div>
    <p className="text-gray-500">
      {date} at {time}
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
  const initialStartDate = parseZonedDateTime("2024-04-01T15:45[Asia/Manila]");
  const initialEndDate = parseZonedDateTime("2024-04-09T02:15[Asia/Manila]");

  const [isModalVisible, setModalVisible] = useState(false);
  const [isStatusModalVisible, setStatusModalVisible] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: initialStartDate,
    end: initialEndDate,
  });
  const [bookingIdToUpdate, setBookingIdToUpdate] = useState(null);
  const [bookings, setBookings] = useState(initialBookings);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange);
  };

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const changeBookingStatus = (bookingId) => {
    setStatusModalVisible(true);
    setBookingIdToUpdate(bookingId);
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
    <div className="flex flex-col  lg:flex-row min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">
          Bookings and Reservations
        </h1>

        {/* Use grid instead of flex for responsiveness */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Booking list section */}
          <div className="w-full space-y-4">
            <div className="text-xl font-bold mb-4 text-gray-700">
              New Bookings and Reservations
            </div>
            <div className="bg-white max-h-[600px] flex flex-col gap-3 overflow-y-auto rounded-lg p-4 md:p-6 shadow-md">
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    customerName={booking.customerName}
                    date={booking.date}
                    time={booking.time}
                    onOpenModal={openModal}
                    bookingId={booking.id}
                    onChangeStatus={changeBookingStatus}
                  />
                ))
              ) : (
                <div className="p-4 text-gray-500">No bookings available</div>
              )}
            </div>
          </div>

          {/* Booking details section */}
          <div className="w-full space-y-4">
            <h1 className="text-xl font-bold text-gray-700">Booking Details</h1>
            <div className="bg-white max-h-[600px] rounded-lg shadow-md p-4 md:p-6 overflow-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white text-center rounded-lg shadow-md table-fixed">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Booking Date</th>
                      <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Customer</th>
                      <th className="py-3 px-2 md:px-4 font-semibold text-gray-600 hidden md:table-cell">Booking Type</th>
                      <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Phone</th>
                      <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Status</th>
                      <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3 px-2 md:px-4">{booking.date}</td>
                        <td className="py-3 px-2 md:px-4">{booking.customerName}</td>
                        <td className="py-3 px-2 md:px-4 hidden md:table-cell">{booking.type}</td>
                        <td className="py-3 px-2 md:px-4 text-blue-600">{booking.phone}</td>
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
                                  <div className="text-small font-bold">Check-in and Check-out</div>
                                  <div className="text-tiny">DATE: {booking.date} TIME: {booking.time}</div>
                                </div>
                              }
                            >
                              <Button className="rounded-full bg-transparent">
                                <IoInformationCircle className="cursor-pointer text-xl"/>
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
        </div>

        {/* Booking History Section */}
        <div className="w-full mt-8">
          <h1 className="text-xl text-gray-700 font-bold mb-2">Booking History</h1>
          <div className="overflow-x-auto bg-white max-h-[600px] rounded-lg shadow-md p-4 md:p-6">
            <table className="min-w-full bg-white text-center rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Booking Date</th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Customer</th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Booking Type</th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Phone</th>
                  <th className="py-3 px-2 md:px-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3 px-2 md:px-4">{booking.date}</td>
                    <td className="py-3 px-2 md:px-4">{booking.customerName}</td>
                    <td className="py-3 px-2 md:px-4">{booking.type}</td>
                    <td className="py-3 px-2 md:px-4 text-blue-600">{booking.phone}</td>
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
        <Modal isOpen={isModalVisible} onClose={closeModal}>
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
                  defaultValue={dateRange}
                  onChange={handleDateChange}
                />
              </div>
            </ModalBody>
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
                <option value="Active">Active</option>
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

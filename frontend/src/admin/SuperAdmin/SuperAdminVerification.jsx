import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, Button, Tooltip, ModalContent, useDisclosure } from '@nextui-org/react';
import Swal from 'sweetalert2';
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import SuperAdminSidebar from './superadmincomponents/superadminsidebar';
import SearchBar from './superadmincomponents/SearchBar'; // Import the SearchBar component

const SummaryCard = ({ title, count, color }) => (
  <div className={`${color} text-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow`}>
    <h2 className="text-lg mb-2 font-semibold">{title}</h2>
    <p className="text-4xl font-bold">{count}</p>
  </div>
);

// Reusable component for displaying status
const StatusBadge = ({ status }) => {
  const statusColors = {
    Pending: 'bg-yellow-400',
    Approved: 'bg-green-400',
    Rejected: 'bg-red-400',
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-sm ${statusColors[status]} text-white`}>
      {status}
    </span>
  );
};

// Reusable component for action buttons
const ActionButton = ({ icon, tooltip, onClick, color }) => (
  <Tooltip content={tooltip}>
    <button className={`text-${color}-500 hover:text-${color}-700 mr-4`} onClick={onClick}>
      {icon}
    </button>
  </Tooltip>
);

const VerificationTable = ({ data, title, onUpdateStatus }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedItem, setSelectedItem] = useState(null);

  const handleViewClick = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleApprove = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to approve this application!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Approved!',
          text: 'The application has been approved.',
          icon: 'success',
          confirmButtonColor: '#0BDA51',
        });
        onUpdateStatus(item, 'Approved');
      }
    });
  };

  const handleReject = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to reject this application!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#28a745',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
    title: 'Rejected!',
    text: 'The application has been rejected.',
    icon: 'success',
    confirmButtonColor: '#0BDA51',
  });

        
        onUpdateStatus(item, 'Rejected');
      }
    });
  };

  return (
    <div className="overflow-x-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 text-left">Business Name</th>
            <th className="py-3 px-6 text-left">Owner</th>
            <th className="py-3 px-6 text-left">Business Type</th>
            <th className="py-3 px-6 text-left">Category</th>
            <th className="py-3 px-6 text-left">Certificate No</th>
            <th className="py-3 px-6 text-left">Location</th>
            <th className="py-3 px-6 text-left">Submission Date</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b hover:bg-gray-100 transition duration-300">
              <td className="py-3 px-6">{item.businessName}</td>
              <td className="py-3 px-6">{`${item.firstName} ${item.lastName}`}</td>
              <td className="py-3 px-6">{item.businessType}</td>
              <td className="py-3 px-6">{item.category}</td>
              <td className="py-3 px-6">{item.certificateNo}</td>
              <td className="py-3 px-6">{item.location}</td>
              <td className="py-3 px-6">{item.submissionDate}</td>
              <td className="py-3 px-6">
                <StatusBadge status={item.status} />
              </td>
              <td className="">
                <ActionButton icon={<FaEye />} tooltip="View Details" onClick={() => handleViewClick(item)} color="blue" />
                <ActionButton icon={<FaCheck />} tooltip="Approve" onClick={() => handleApprove(item)} color="green" />
                <ActionButton icon={<FaTimes />} tooltip="Reject" onClick={() => handleReject(item)} color="red" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Application Details</ModalHeader>
              <ModalBody>
                {selectedItem && (
                  <div className="space-y-4">
                    <p><strong>Business Name:</strong> {selectedItem.businessName}</p>
                    <p><strong>Owner:</strong> {`${selectedItem.firstName} ${selectedItem.lastName}`}</p>
                    <p><strong>Business Type:</strong> {selectedItem.businessType}</p>
                    <p><strong>Category:</strong> {selectedItem.category}</p>
                    <p><strong>Certificate No:</strong> {selectedItem.certificateNo}</p>
                    <p><strong>Location:</strong> {selectedItem.location}</p>
                    <p><strong>Submission Date:</strong> {selectedItem.submissionDate}</p>
                    <p><strong>Status:</strong> <StatusBadge status={selectedItem.status} /></p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

const SuperAdminVerification = () => {
  const [verificationData, setVerificationData] = useState([]);
  const [searchTermAll, setSearchTermAll] = useState('');
  const [searchTermPending, setSearchTermPending] = useState('');
  const [searchTermApproved, setSearchTermApproved] = useState('');
  const [searchTermRejected, setSearchTermRejected] = useState('');

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      // Replace with actual API call
      const data = [
        { firstName: 'John', lastName: 'Doe', businessName: 'Adventure Tours', businessType: 'Attraction', category: 'Tour', certificateNo: '12345', location: 'Gubat Sorsogon', submissionDate: '2023-10-01', status: 'Pending' },
        { firstName: 'Jane', lastName: 'Smith', businessName: 'Ocean Resort', businessType: 'Accommodation', category: 'Resort', certificateNo: '54321', location: 'Gubat Sorsogon', submissionDate: '2023-10-02', status: 'Approved' },
        { firstName: 'Alice', lastName: 'Brown', businessName: 'Mountain Lodge', businessType: 'Accommodation', category: 'Lodge', certificateNo: '67890', location: 'Gubat Sorsogon', submissionDate: '2023-10-03', status: 'Pending' },
        { firstName: 'Bob', lastName: 'White', businessName: 'Café Delight', businessType: 'Food', category: 'Café', certificateNo: '98765', location: 'Gubat Sorsogon', submissionDate: '2023-10-04', status: 'Rejected' },
      ];
      setVerificationData(data);
    };

    fetchData();
  }, []);

  const updateStatus = (item, newStatus) => {
    setVerificationData((prevData) =>
      prevData.map((dataItem) =>
        dataItem.certificateNo === item.certificateNo
          ? { ...dataItem, status: newStatus }
          : dataItem
      )
    );
  };

  const appliedAttractions = verificationData.filter(item => item.businessType === 'Attraction').length;
  const appliedAccommodations = verificationData.filter(item => item.businessType === 'Accommodation').length;
  const appliedFoods = verificationData.filter(item => item.businessType === 'Food').length;
  const totalPending = verificationData.filter(item => item.status === 'Pending').length;

  const filterData = (data, searchTerm) => {
    return data.filter(item =>
      item.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredDataAll = filterData(verificationData, searchTermAll);
  const filteredDataPending = filterData(verificationData.filter(item => item.status === 'Pending'), searchTermPending);
  const filteredDataApproved = filterData(verificationData.filter(item => item.status === 'Approved'), searchTermApproved);
  const filteredDataRejected = filterData(verificationData.filter(item => item.status === 'Rejected'), searchTermRejected);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SuperAdminSidebar />

      <div className="flex-1 p-8 max-h-screen overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Verification</h1>

        <div className="grid grid-cols-4 gap-6 mb-8 text-center">
          <SummaryCard title="Applied for Attraction" count={appliedAttractions} color="bg-red-400" />
          <SummaryCard title="Applied for Accommodation" count={appliedAccommodations} color="bg-teal-400" />
          <SummaryCard title="Applied for Food Places" count={appliedFoods} color="bg-purple-400" />
          <SummaryCard title="Pending Verification" count={totalPending} color="bg-pink-400" />
        </div>

        <h2 className="text-2xl font-bold mb-4">All Applications</h2>
        <SearchBar placeholder="Search all applications..." onSearch={setSearchTermAll} />
        <VerificationTable data={filteredDataAll} title="All Applications" onUpdateStatus={updateStatus} />

        <h2 className="text-2xl font-bold mb-4">Pending Applications</h2>
        <SearchBar placeholder="Search pending applications..." onSearch={setSearchTermPending} />
        <VerificationTable data={filteredDataPending} title="Pending Applications" onUpdateStatus={updateStatus} />

        <h2 className="text-2xl font-bold mb-4">Approved Applications</h2>
        <SearchBar placeholder="Search approved applications..." onSearch={setSearchTermApproved} />
        <VerificationTable data={filteredDataApproved} title="Approved Applications" onUpdateStatus={updateStatus} />

        <h2 className="text-2xl font-bold mb-4">Rejected Applications</h2>
        <SearchBar placeholder="Search rejected applications..." onSearch={setSearchTermRejected} />
        <VerificationTable data={filteredDataRejected} title="Rejected Applications" onUpdateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default SuperAdminVerification;

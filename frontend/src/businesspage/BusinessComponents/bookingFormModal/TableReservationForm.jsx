import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Checkbox
} from '@nextui-org/react';
import { TimeInput } from '@nextui-org/date-input';
import Swal from 'sweetalert2';
import { Time } from '@internationalized/date';

const TableReservationForm = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reservationDate: '',
    reservationTime: new Time(18, 0), // Default to 6:00 PM
    amount: product.price,
    agreeToTerms: false,
    checkOutTime: new Time(20, 0) // Default to 8:00 PM
  });
  const [isPolicyModalOpen, setPolicyModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleSubmit = () => {
    if (!formData.agreeToTerms) {
      Swal.fire({
        title: 'Terms Not Agreed',
        text: 'Please agree to the terms and conditions before booking.',
        icon: 'warning',
        confirmButtonColor: '#0BDA51'
      });
      return;
    }
    Swal.fire({
      title: 'Reservation Confirmed!',
      text: `You have successfully reserved: ${product.title} for ₱${formData.amount}.`,
      icon: 'success',
      confirmButtonColor: '#0BDA51'
    });
    onClose();
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setFormData({ ...formData, agreeToTerms: isChecked });
    if (isChecked) {
      setPolicyModalOpen(true);
    }
  };

  const steps = [
    <div key="step1" className="space-y-4">
      <Input label="First Name" required fullWidth placeholder="Enter your first name" value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} />
      <Input label="Last Name" required fullWidth placeholder="Enter your last name" value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
      <Input type="email" label="Email Address" required fullWidth placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
    </div>,
    <div key="step2" className="space-y-4">
      <Input type="tel" label="Phone Number" required fullWidth placeholder="Enter your phone number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
      <Input type="date" label="Reservation Date" required fullWidth value={formData.reservationDate} onChange={(e) => setFormData({ ...formData, reservationDate: e.target.value })} />
      <TimeInput
        label="Reservation Time"
        value={formData.reservationTime}
        onChange={(time) => setFormData({ ...formData, reservationTime: time })}
        className="mb-4"
      />
      <TimeInput
        label="Check-out Time"
        value={formData.checkOutTime}
        onChange={(time) => setFormData({ ...formData, checkOutTime: time })}
        className="mb-4"
      />
    </div>,
    <div key="step3" className="space-y-4">
      <Input type="number" label="Amount to Pay" required fullWidth value={formData.amount} readOnly />
      <Checkbox
        checked={formData.agreeToTerms}
        onChange={handleCheckboxChange}
        className="mt-4"
      >
        I agree to the <span className="text-blue-500 cursor-pointer" onClick={() => setPolicyModalOpen(true)}>Terms & Conditions</span>
      </Checkbox>
      <div className="mt-4">
        <h3 className="text-lg font-bold">Booking Summary</h3>
        <p><strong>Date:</strong> {formData.reservationDate}</p>
        <p><strong>Reservation Time:</strong> {formData.reservationTime.toString()}</p>
        <p><strong>Check-out Time:</strong> {formData.checkOutTime.toString()}</p>
        <p><strong>Total Amount:</strong> ₱{formData.amount}</p>
      </div>
    </div>
  ];

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-8 bg-white rounded-lg shadow-2xl">
        <ModalContent className="rounded-lg">
          <ModalHeader className="text-3xl font-bold text-gray-800 border-b pb-4">
            Table Reservation - {product.title}
          </ModalHeader>
          <ModalBody className="space-y-6">
            {steps[currentStep]}
            <div className="flex justify-between mt-4">
              {currentStep > 0 && <Button auto flat onClick={prevStep}>Back</Button>}
              {currentStep < steps.length - 1 ? (
                <Button auto onClick={nextStep}>Next</Button>
              ) : (
                <Button auto color="success" onClick={handleSubmit}>Submit</Button>
              )}
            </div>
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button auto flat color="error" onClick={onClose} className="mr-2">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Policy Modal */}
      <Modal isOpen={isPolicyModalOpen} onClose={() => setPolicyModalOpen(false)} className="max-w-lg p-6 bg-white rounded-lg shadow-2xl">
        <ModalContent className="rounded-lg">
          <ModalHeader className="text-2xl font-bold text-gray-800 border-b pb-4">
            Terms & Conditions
          </ModalHeader>
          <ModalBody className="space-y-4">
            <p>By making a reservation, you agree to the following terms and conditions:</p>
            <ul className="list-disc pl-5">
              <li>All reservations are subject to availability.</li>
              <li>Cancellations must be made 24 hours in advance.</li>
              <li>Payment is required at the time of booking.</li>
              <li>Guests must adhere to the dress code policy.</li>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button auto onClick={() => setPolicyModalOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TableReservationForm;
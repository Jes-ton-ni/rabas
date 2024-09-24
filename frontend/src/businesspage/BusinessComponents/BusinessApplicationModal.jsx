import React, { useState } from "react";
import { Modal, ModalContent } from "@nextui-org/modal";
import { ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Input, Button } from "@nextui-org/react";

const BusinessApplicationModal = ({ isBusinessOpen, onBusinessOpenChange }) => {
  // State to handle multi-step navigation
  const [step, setStep] = useState(1);

  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    businessTerritory: '',
    certificateNo: '',
    businessScope: ''
  });

  // Handler to update form data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to the previous step
  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <Modal className="max-w-[800px] mx-auto" isOpen={isBusinessOpen} onClose={onBusinessOpenChange} aria-labelledby="modal-title">
      <ModalContent>
        <ModalHeader>
          <h2 id="modal-title" className="text-3xl font-extrabold text-gray-900">
            {step === 1 ? 'Apply for Business Account' 
             : step === 2 ? 'What kind of Business' 
             : 'Review Your Information'}
          </h2>
        </ModalHeader>

        <ModalBody>
          {step === 1 && (
            <>
              <p className="text-gray-600 mb-4">Please fill out the form below to apply for a business account. All fields are required.</p>

              {/* Owner's Full Name Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  clearable
                  bordered
                  fullWidth
                  label="First Name"
                  name="firstName"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  aria-label="First Name"
                />
                <Input
                  clearable
                  bordered
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  aria-label="Last Name"
                />
              </div>

              {/* Business Name Input */}
              <Input
                clearable
                bordered
                fullWidth
                label="Business Name"
                name="businessName"
                placeholder="Enter Business Name"
                value={formData.businessName}
                onChange={handleInputChange}
                className="mt-4"
                aria-label="Business Name"
              />

              {/* Business Territory Input */}
              <Input
                clearable
                bordered
                fullWidth
                label="Business Territory"
                name="businessTerritory"
                placeholder="Enter Business Territory"
                value={formData.businessTerritory}
                onChange={handleInputChange}
                className="mt-4"
                aria-label="Business Territory"
              />

              {/* Certificate No./BNN Input */}
              <Input
                clearable
                bordered
                fullWidth
                label="Certificate No. / BNN"
                name="certificateNo"
                placeholder="Enter Certificate No. / BNN"
                value={formData.certificateNo}
                onChange={handleInputChange}
                className="mt-4"
                aria-label="Certificate No. / BNN"
              />

              {/* Business Scope (City/Municipality) Input */}
              <Input
                clearable
                bordered
                fullWidth
                label="Business Scope (City/Municipality)"
                name="businessScope"
                placeholder="Enter Business Scope"
                value={formData.businessScope}
                onChange={handleInputChange}
                className="mt-4"
                aria-label="Business Scope"
              />
            </>
          )}

          {step === 2 && (
            <div>
              <p className="text-gray-600 mb-4">Please fill out the form below to apply for a business account. All fields are required.</p>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 min-h-[620px] overflow-auto ">
                  
             </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-gray-600 mb-4">Review your information before submitting your application.</p>
              <div className="space-y-4">
                <p><strong>First Name:</strong> {formData.firstName}</p>
                <p><strong>Last Name:</strong> {formData.lastName}</p>
                <p><strong>Business Name:</strong> {formData.businessName}</p>
                <p><strong>Business Territory:</strong> {formData.businessTerritory}</p>
                <p><strong>Certificate No. / BNN:</strong> {formData.certificateNo}</p>
                <p><strong>Business Scope:</strong> {formData.businessScope}</p>
              </div>
            </div>
          )}
        </ModalBody>

        <ModalFooter>
          {step === 1 && (
            <Button className="w-full hover:bg-color2" shadow color="primary" onClick={nextStep}>
              Next
            </Button>
          )}
          {step === 2 && (
            <>
              <Button className="w-full hover:bg-red-700 hover:text-white" shadow color="secondary" onClick={prevStep}>
                Back
              </Button>
              <Button className="w-full hover:bg-color2" shadow color="primary" onClick={nextStep}>
                Next
              </Button>
            </>
          )}
          {step === 3 && (
            <>
              <Button className="w-full hover:bg-red-700 hover:text-white" shadow color="secondary" onClick={prevStep}>
                Back
              </Button>
              <Button className="w-full hover:bg-color2" shadow color="primary">
                Submit Application
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BusinessApplicationModal;

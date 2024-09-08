import React, { useState } from 'react';

const ContactSection = () => {
  const [contact, setContact] = useState({
    phone: '',
    email: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Contact Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-1">Phone:</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Address:</label>
          <textarea
            name="address"
            value={contact.address}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
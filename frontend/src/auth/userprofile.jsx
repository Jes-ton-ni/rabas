import React, { useState } from 'react';
import Navuser from '@/components/navuser';
import Footer from '@/components/Footer';
import { Avatar } from '@nextui-org/react';
import Search from '@/components/Search';
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

const UserProfile = () => {
  const [selected, setSelected] = React.useState("profile");
  const [profilePic, setProfilePic] = React.useState(''); // Start with blank profile picture
  const [username, setUsername] = React.useState(''); // State for username
  const [updatedProfile, setUpdatedProfile] = React.useState({ username: '', profilePic: '' }); // State to hold updated profile info

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Update profile picture state
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Reset the input value to allow re-selection of the same file
    }
  };

  const handleUpdateProfile = () => {
    // Update the profile information only when the button is clicked
    setUpdatedProfile({ username, profilePic }); // Update both username and profile picture
    console.log("Profile updated:", { username, profilePic });
    // Add logic to save the updated profile information
  };

  const samplecard = [
    { name: "Business 1", description: "Description of Business 1", image: "https://via.placeholder.com/150" },
    { name: "Business 2", description: "Description of Business 2", image: "https://via.placeholder.com/150" },
    { name: "Business 3", description: "Description of Business 3", image: "https://via.placeholder.com/150" },
    { name: "Business 4", description: "Description of Business 4", image: "https://via.placeholder.com/150" },
    // Add more sample cards as needed
  ];

  const { isOpen, onOpen, onOpenChange } = useDisclosure(); // For password change modal
  const { isOpen: isBusinessOpen, onOpen: onBusinessOpen, onOpenChange: onBusinessOpenChange } = useDisclosure(); // For business account modal

  return (
    <div className='mx-auto min-h-screen font-sans'>
      <Navuser />
      <div className='container p-3 rounded-md mt-[7.2rem] flex justify-center'>
        <Search />
      </div>
      <div className='container mx-auto flex flex-col md:flex-row mb-2 gap-4'> {/* Updated for responsiveness */}

        <div className='h-auto bg-white p-4 w-full md:w-[300px] flex flex-col justify-between shadow-lg shadow-slate-800 rounded-md items-center'> {/* Adjusted height and width */}
          <div className='flex flex-col items-center gap-2 flex-grow'>
            <Avatar
              className='h-[10rem] w-[10rem] mt-24'
              src={updatedProfile.profilePic || 'https://i.pravatar.cc/150?u=placeholder'} // Use updated profile picture
            />
            {/* name */}
            <div className='text-2xl font-light'>{updatedProfile.username || 'Alepse Thennek'}</div>
          </div>

          <Button className='text-white bg-color1 hover:bg-color2' onPress={onBusinessOpen}> + Apply Business Account </Button>
        </div>

        <div className='h-auto w-full'> {/* Adjusted height */}
          <Tabs
            aria-label="Options"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="profile" title="Profile">
              <Card>
                <CardBody className='p-6 h-full'>
                  <div>
                    <h1 className='text-4xl font-bold mb-3'>User Profile</h1>
                    <div className='bg-gray-300 w-full h-[1px] mb-8'></div>
                    <div className='mb-6'>
                      <h1 className='text-slate-500'>Username</h1>
                      <input
                        className='border-[.5px] rounded-md p-2 w-full md:w-64 focus:border-gray-500 focus:outline-none'
                        placeholder='Enter your username'
                        value={username} // Bind username input
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                      />
                    </div>
                    <div>
                      <h1 className='text-slate-500'>Change Profile Pic</h1>
                      <div className='relative flex items-center w-28 h-28'>
                        <Avatar
                          className='w-full h-full object-cover rounded-full'
                          src={profilePic || 'https://i.pravatar.cc/150?u=placeholder'} // Use current profile picture
                        />
                        <input
                          type='file'
                          className='hidden'
                          accept='image/*'
                          onChange={handleFileChange} // Handle file upload
                          id='fileInput' // Add an ID for the input to control it directly
                        />
                        <div
                          onClick={() => document.getElementById('fileInput').click()} // Trigger file input click
                          className='absolute bottom-0 right-0 bg-color1 text-white rounded-full w-9 h-9 hover:bg-color2 flex justify-center items-center cursor-pointer'
                        >
                          +
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleUpdateProfile} // Call update function on click
                    className='bg-color1 text-white hover:bg-color2 self-end mt-4'
                  >
                    Update Profile
                  </Button>

                  <div>
                    <h1 className='font-bold text-2xl'>Account Settings</h1>
                    <Button onPress={onOpen}>Change Password</Button>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
                      <ModalContent>
                        {(onClose) => (
                          <div className='p-9'>
                            <h2 className='text-lg font-semibold'>Change Password</h2>
                            <input
                              type='password'
                              className='border-[.5px] rounded-md p-2 w-full focus:border-gray-500 focus:outline-none'
                              placeholder='Enter new password'
                            />
                            <Button className='mt-4'>Submit</Button>
                          </div>
                        )}
                      </ModalContent>
                    </Modal>
                  </div>
                </CardBody>
              </Card>
            </Tab>
            <Tab key="like" title="Liked Pages">
              <Card>
                <CardBody className='h-auto'> {/* Adjusted height */}
                  <div className='flex gap-4 flex-wrap p-4 justify-start overflow-auto scrollbar-hide'>
                    {samplecard.map((card, index) => (
                      <div key={index} className='border ml-6 h-[300px] p-4 rounded-md shadow-md w-full md:w-[300px] flex flex-col'> {/* Made width responsive */}
                        <img src={card.image} alt={card.name} className='h-32 w-full object-cover rounded-md mb-2' /> {/* Added image */}
                        <h2 className='text-xl font-bold'>{card.name}</h2>
                        <p className='text-gray-600'>{card.description}</p>
                        <Button className='mt-2 bg-color1 text-white hover:bg-color2'>View Details</Button>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </div>

      {/* Apply Business Account Modal */}
      <Modal isOpen={isBusinessOpen} onOpenChange={onBusinessOpenChange}>
        <ModalContent>
          <div className='p-6'>
            <h2 className='text-2xl font-bold mb-4'>Apply for Business Account</h2>
            <p className='mb-4'>Please fill out the following information to apply for a business account.</p>
            <input
              type='text'
              className='border-[.5px] rounded-md p-2 w-full focus:border-gray-500 focus:outline-none mb-4'
              placeholder='Enter Business Name'
            />
            <textarea
              className='border-[.5px] rounded-md p-2 w-full focus:border-gray-500 focus:outline-none mb-4'
              placeholder='Describe your business'
            ></textarea>
            <Button className='bg-color1 text-white hover:bg-color2'>Submit Application</Button>
          </div>
        </ModalContent>
      </Modal>

      <Footer />
    </div>
  );
};

export default UserProfile;

import React, { useState } from 'react';
import Nav from '@/components/nav';
import Footer from '@/components/Footer';
import { Avatar } from '@nextui-org/react';
import Search from '@/components/Search';
import { Tabs, Tab, Card, CardBody, Button, useDisclosure} from "@nextui-org/react";
import BusinessApplicationModal from '@/businesspage/BusinessComponents/BusinessApplicationModal'; // Import the separated modal

const UserProfile = () => {
  const [selected, setSelected] = useState("profile");
  const [profilePic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [updatedProfile, setUpdatedProfile] = useState({ username: '', profilePic: '' });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isBusinessOpen, onOpen: onBusinessOpen, onOpenChange: onBusinessOpenChange } = useDisclosure(); // For the business modal

  // Handle file upload for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
      e.target.value = ''; 
    }
  };

  const handleUpdateProfile = () => {
    setUpdatedProfile({ username, profilePic });
  };

  const samplecard = [
    { name: "Business 1", description: "Description of Business 1", image: "https://via.placeholder.com/150" },
    { name: "Business 2", description: "Description of Business 2", image: "https://via.placeholder.com/150" },
  ];

  return (
    <div className='mx-auto  min-h-screen font-sans'>
      <Nav />
      <div className='container p-3 rounded-md mt-[7.2rem] flex justify-center'>
        <Search />
      </div>

      <div className='container mx-auto flex flex-col md:flex-row mb-2 gap-4'>
        <div className='h-auto bg-white p-4 w-full md:w-[300px] flex flex-col justify-between shadow-lg shadow-slate-800 rounded-md items-center'>
          <div className='flex flex-col items-center gap-2 flex-grow justify-center'>
          <div className='relative flex items-center w-28 h-28'>
                        <Avatar className='w-full h-full object-cover rounded-full' src={profilePic || 'https://i.pravatar.cc/150?u=placeholder'} />
                        <input type='file' className='hidden' accept='image/*' onChange={handleFileChange} id='fileInput' />
                        <div
                          onClick={() => document.getElementById('fileInput').click()}
                          className='absolute bottom-0 right-0 bg-color1 text-white rounded-full w-9 h-9 hover:bg-color2 flex justify-center items-center cursor-pointer'
                        >
                          +
                        </div>
                      </div>
            <div className='text-2xl font-light'>{updatedProfile.username || 'Alepse Thennek'}</div>
          </div>
          <Button className='text-white bg-color1 hover:bg-color2' onPress={onBusinessOpen}> + Apply Business Account </Button>
        </div>

        <div className='h-auto w-full'>
          <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected}>
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div>
                 
                     
                    </div>
                  </div>
                  <Button onClick={handleUpdateProfile} className='bg-color1 text-white hover:bg-color2 self-end mt-4'>
                    Update Profile
                  </Button>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="like" title="Liked Pages">
              <Card>
                <CardBody className='h-auto'>
                  <div className='flex gap-4 flex-wrap p-4 justify-start overflow-auto scrollbar-hide'>
                    {samplecard.map((card, index) => (
                      <div key={index} className='border ml-6 h-[300px] p-4 rounded-md shadow-md w-full md:w-[300px] flex flex-col'>
                        <img src={card.image} alt={card.name} className='h-32 w-full object-cover rounded-md mb-2' />
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

      <BusinessApplicationModal
        isBusinessOpen={isBusinessOpen}
        onBusinessOpenChange={onBusinessOpenChange}
      />
      <Footer />
    </div>
  );
};

export default UserProfile;

import React, { useState, useEffect, useCallback } from 'react';
import Nav from '@/components/nav';
import Footer from '@/components/Footer';
import { Avatar } from '@nextui-org/react';
import Search from '@/components/Search';
import { Tabs, Tab, Card, CardBody, Button, useDisclosure} from "@nextui-org/react";
import BusinessApplicationModal from '@/businesspage/BusinessComponents/BusinessApplicationModal'; // Import the separated modal

const UserProfile = () => {
  const [selected, setSelected] = useState("profile");
  const [profilePicFile, setProfilePicFile] = useState(null); // New state for the uploaded file
  const [profilePic, setProfilePic] = useState('');
  const [username, setUsername] = useState('');
  const [updatedProfile, setUpdatedProfile] = useState({ username: '', profilePic: '' });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isBusinessOpen, onOpen: onBusinessOpen, onOpenChange: onBusinessOpenChange } = useDisclosure(); // For the business modal
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);

  // Function to check login status and user data
  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/check-login', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json();
        // Set isLoggedIn state
        setIsLoggedIn(data.isLoggedIn);
      } else {
        // If response is not ok, set isLoggedIn to false
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      // Handle error, e.g., show an error message to the user
    }
  }, []); 
  
  useEffect(() => {
    // Call the function to check login status when the component mounts
    checkLoginStatus();
  }, [checkLoginStatus]);

  // Redirect to Home page if user is not logged in
  useEffect(() => {
    if (isLoggedIn === false) {
      window.location.href = '/';
    }
  }, [isLoggedIn]);

  // Fetch username from the server
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-userData', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
      });
      const data = await response.json();
      setUserData(data.userData);
    } catch (error) {
      console.error('Error fetching username:', error);
    }
  };

  // Get the first letter of the username, fallback to empty string if userData is not available
  const firstLetter = userData?.username?.charAt(0).toUpperCase() || '';

  useEffect(() => {
    // Fetch username if user is logged in
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  // Handle file upload for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file); // Store the file
      setProfilePic(URL.createObjectURL(file)); // Preview the selected image
      e.target.value = ''; // Clear input after file selection
    }
  };
  
  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);

      // If the profile picture has been updated, append the file
      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }

      // Use backticks to allow string interpolation for user_id
      const response = await fetch(`http://localhost:5000/updateUserProfile/${userData.user_id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully!');
      
      //Update UI with new user data
      fetchUserData();

    } catch (error) {
      console.error(error);
      alert('There was an error updating the profile');
    }
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
              <Avatar className='w-full h-full object-cover rounded-full' 
              src={profilePic 
                ? profilePic 
                : (userData?.image_path 
                  ? `http://localhost:5000/${userData.image_path}`
                  : `https://ui-avatars.com/api/?name=${firstLetter}`
                )
              }  
              />
                <input type='file' className='hidden' accept='image/*' onChange={handleFileChange} id='fileInput' />
                  <div
                    onClick={() => document.getElementById('fileInput').click()}
                    className='absolute bottom-0 right-0 bg-color1 text-white rounded-full w-9 h-9 hover:bg-color2 flex justify-center items-center cursor-pointer'
                  >
                  +
                  </div>
            </div>
            <div className='text-2xl font-light'>
              {userData?.username ? userData.username : 'Loading...'}
            </div>
          </div>
          {/* <div className='flex flex-col items-center gap-2 flex-grow'>
            <Avatar 
              className='h-[10rem] w-[10rem] mt-24' 
              src={userData?.image_path 
                ? `http://localhost:5000/${userData.image_path}` 
                : `https://ui-avatars.com/api/?name=${firstLetter}`} 
            />

              <div className='text-2xl font-light'>
                {userData?.username ? userData.username : 'Loading...'}
              </div>
          </div> */}
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
                    {/* <div>
                      <h1 className='text-slate-500'>Change Profile Pic</h1>
                      <div className='relative flex items-center w-28 h-28'>
                        <Avatar 
                          className='w-full h-full object-cover rounded-full' 
                          src={profilePic ? 
                                profilePic 
                                : 
                                (userData?.image_path ?
                                  `http://localhost:5000/${userData.image_path}`
                                  : 
                                  `https://ui-avatars.com/api/?name=${firstLetter}`
                                )
                              }  
                        />
                        <input type='file' className='hidden' accept='image/*' onChange={handleFileChange} id='fileInput' />
                        <div
                          onClick={() => document.getElementById('fileInput').click()}
                          className='absolute bottom-0 right-0 bg-color1 text-white rounded-full w-9 h-9 hover:bg-color2 flex justify-center items-center cursor-pointer'
                        >
                          +
                        </div>
                      </div>
                    </div> */}
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

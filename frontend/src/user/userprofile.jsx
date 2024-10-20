import React, { useState, useEffect, useCallback } from 'react';
import Nav from '@/components/nav';
import Footer from '@/components/Footer';
import { Avatar } from '@nextui-org/react';
import Search from '@/components/Search';
import { Tabs, Tab, Card, CardBody, Button, useDisclosure } from "@nextui-org/react";
import BusinessApplicationModal from '@/businesspage/BusinessComponents/BusinessApplicationModal'; // Import the modal
import { GiPositionMarker } from 'react-icons/gi';

const UserProfile = ({ activities = [] }) => {
  // Debugging: Log activities to ensure data is passed correctly
  // console.log('Activities:', activities);

  const [selected, setSelected] = useState("profile");
  const [profilePicFile, setProfilePicFile] = useState(null); // State to hold uploaded file for profile pic
  const [profilePic, setProfilePic] = useState(''); // URL of the current or uploaded profile picture
  const [username, setUsername] = useState(''); // Username of the logged-in user
  const [email, setEmail] = useState(''); // Email of the logged-in user
  const [phoneNumber, setPhoneNumber] = useState(''); // Phone number of the logged-in user
  const [password, setPassword] = useState(''); // Password of the logged-in user
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isBusinessOpen, onOpen: onBusinessOpen, onOpenChange: onBusinessOpenChange } = useDisclosure(); // Modal state for business account application
  const [isLoggedIn, setIsLoggedIn] = useState(null); // User login status
  const [userData, setUserData] = useState(null); // State to store fetched user data
  const [likedPages, setLikedPages] = useState([]); // State for storing user's liked pages
  const [businessApplications, setBusinessApplications] = useState([]);
  const [businessData, setBusinessData] = useState(null); // State
  const [loading, setLoading] = useState(true);

  // Function to check login status
  const checkLoginStatus = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/check-login', {
        method: 'GET',
        credentials: 'include' // Include cookies
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn); // Set login status
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }, []);
  
  // Fetching user data
  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-userData', {
        method: 'GET',
        credentials: 'include' // Include cookies
      });
      const data = await response.json();
      setUserData(data.userData);
      setUsername(data.userData.username); // Set username
      setEmail(data.userData.email); // Set email
      setPhoneNumber(data.userData.contact || ''); // Set phone number (if available)
      // Fetch liked pages
      setLikedPages(data.userData.likedPages || []); // Set liked pages (default to empty array if not present)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetching business data from the backend and updating Redux
  const fetchBusinessData = async () => {
    try {
      const response = await fetch('http://localhost:5000/get-businessData', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setBusinessData(data.businessData[0]);
      }
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
  };

  // Fetching business applications for the logged-in user
  const fetchBusinessApplications = async () => {
    try {
      const response = await fetch('http://localhost:5000/businesses-application', {
        method: 'GET',
        credentials: 'include' // Include cookies for session-based authentication
      });
      const data = await response.json();
      console.log('Fetched Business Applications:', data);
      
      if (response.ok) {
        setBusinessApplications(data.business_applications); // Set fetched applications
      } else {
        console.error('Failed to fetch business applications:', data.message);
      }
    } catch (error) {
      console.error('Error fetching business applications:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // Check login status when component mounts
  }, [checkLoginStatus]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([fetchUserData(), fetchBusinessData(), fetchBusinessApplications()])
        .then(() => setLoading(false)) // Set loading to false when all data is fetched
        .catch((error) => console.error('Error fetching initial data:', error));
    }
  }, [isLoggedIn]);

  // Handle profile picture file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicFile(file);
      setProfilePic(URL.createObjectURL(file)); // Preview image
      e.target.value = ''; // Clear input
    }
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('password', password);

      // Append profile picture if updated
      if (profilePicFile) {
        formData.append('profilePic', profilePicFile);
      }

      const response = await fetch(`http://localhost:5000/updateUserProfile/${userData.user_id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      alert('Profile updated successfully!');

      fetchUserData(); // Refresh user data after update

      // Clear username and profilePicFile states
      setUsername('');  // Clear the username field
      setProfilePicFile(null);  // Clear the profilePicFile


    } catch (error) {
      console.error(error);
      alert('There was an error updating the profile');
    }
  };

  // Sample activities data
  const sampleActivities = [
    {
      name: 'Beautiful Beach',
      description: 'Relax and enjoy the scenic beach view.',
      image: 'https://via.placeholder.com/150', // Placeholder image
      category: 'Relaxation',
      rating: 5,
      destination: 'Donsol',
      budget: '500-2000',
    },
    {
      name: 'Mountain Adventure',
      description: 'Hike through the mountains and enjoy nature.',
      image: 'https://via.placeholder.com/150',
      category: 'Adventure',
      rating: 4,
      destination: 'Bulusan',
      budget: '250-3000',
    },
    {
      name: 'Mountain Adventure',
      description: 'Hike through the mountains and enjoy nature.',
      image: 'https://via.placeholder.com/150',
      category: 'Adventure',
      rating: 4,
      destination: 'Bulusan',
      budget: '250-3000',
    },
    {
      name: 'Mountain Adventure',
      description: 'Hike through the mountains and enjoy nature.',
      image: 'https://via.placeholder.com/150',
      category: 'Adventure',
      rating: 4,
      destination: 'Bulusan',
      budget: '250-3000',
    },
  ];

  if (loading) {
    return <div>Loading...</div>;  // dapat may design to
  }

  return (
    <div className='mx-auto min-h-screen font-sans'>
      <Nav />
      <div className='container p-3 rounded-md mt-[7.2rem] flex justify-center'>
        <Search />
      </div>

      <div className='container mx-auto flex flex-col md:flex-row mb-2 gap-4'>
        {/* Sidebar */}
        <div className='h-auto bg-white p-4 w-full md:w-[300px] flex flex-col justify-between shadow-lg shadow-slate-800 rounded-md items-center'>
          <div className='flex flex-col items-center gap-2 flex-grow justify-center'>
            <div className='relative flex items-center w-28 h-28'>
              <Avatar className='w-full h-full object-cover rounded-full' 
              src={profilePic 
                ? profilePic 
                : (userData?.image_path 
                  ? `http://localhost:5000/${userData.image_path}`
                  : `https://ui-avatars.com/api/?name=${username?.charAt(0).toUpperCase()}`)}  
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

            </div>
          </div>
          {businessApplications.length > 0 ? (
            businessApplications.map((application) => {
              if (application.status === 0) {
                // Show 'Pending Application' button if status is 0
                return (
                  <Button key={application.application_id} className='text-white bg-yellow-500 hover:bg-yellow-600'>
                    Pending Application
                  </Button>
                );
              } else if (application.status === 1) {
                // Show business name if status is 1
                return (
                  <Button 
                  className='text-white bg-color1 hover:bg-color2'
                  onClick={() => window.location.href = '/businessprofileadmin'}
                  key={application.application_id}>
                    <p>{businessData.businessName}</p>
                  </Button>
                );
              } else if (application.status === -1) {
                // Show 'Denied' message if status is -1
                return (
                  <Button key={application.application_id} className='text-white bg-red-500 hover:bg-red-600'>
                    Denied
                  </Button>
                );
              }
            })
          ) : (
            // If no application exists, show 'Apply Business Account' button
            <Button className='text-white bg-color1 hover:bg-color2' onPress={onBusinessOpen}> 
              + Apply Business Account 
            </Button>
          )}

        </div>

        {/* Main content */}
        <div className='h-auto w-full'>
          <Tabs aria-label="Options" selectedKey={selected} onSelectionChange={setSelected}>
            {/* Profile Tab */}
            <Tab key="profile" title="Profile">
              <Card>
                <CardBody className='p-6 h-full'>
                  <div>
                    <h1 className='text-4xl font-bold mb-3'>User Profile</h1>
                    <div className='bg-gray-300 w-full h-[1px] mb-8'></div>

                    {/* Username field */}
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


                    {/* Email field */}
                    <div className='mb-6'>
                      <h1 className='text-slate-500'>Email</h1>
                      <div className="flex items-center">
                        <input
                          className='border-[.5px] rounded-md p-2 w-full md:w-64 focus:border-gray-500 focus:outline-none'
                          placeholder='Enter your email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type='email'
                        />
                        <span className="ml-2 text-green-500">Verified</span>
                      </div>
                    </div>

                    {/* Phone number field */}
                    <div className='mb-6'>
                      <h1 className='text-slate-500'>Phone Number</h1>
                      <input
                        className='border-[.5px] rounded-md p-2 w-full md:w-64 focus:border-gray-500 focus:outline-none'
                        placeholder='Add your phone number'
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type='tel'
                      />
                    </div>

                    {/* Password field */}
                    <div className='mb-6'>
                      <h1 className='text-slate-500'>Password</h1>
                      <input
                        className='border-[.5px] rounded-md p-2 w-full md:w-64 focus:border-gray-500 focus:outline-none'
                        placeholder='Enter your new password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                      />
                    </div>

                    <Button className='bg-color1 text-white hover:bg-color2' onPress={handleUpdateProfile}>Update Profile</Button>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            {/* Liked Pages Tab */}
            <Tab key="likedPages" title="Liked Pages">
              <Card>
                <CardBody className='p-6 h-full'>
                  <h1 className='text-4xl font-bold mb-3'>Liked Pages</h1>
                  <div className='bg-gray-300 w-full h-[1px] mb-8'></div>

                  <div className='overflow-y-auto max-h-[calc(3*12rem)] flex flex-col items-center'> {/* Adjust the height as needed */}
                    {sampleActivities.length === 0 ? (
                      <p className='text-slate-500'>You haven't liked any pages yet.</p>
                    ) : (
                      sampleActivities.map((activity, index) => (
                        <div key={index} className='bg-white  max-w-[900px] w-full rounded-lg shadow-lg hover:shadow-slate-500 hover:scale-105 duration-300 mb-4 '>
                          <img
                            src={activity.image}
                            alt={activity.name}
                            className='w-full h-48 object-cover rounded-t-lg'
                          />
                          <div className='p-4'>
                            <div className='flex items-center justify-between gap-2'>
                              <div className='mb-2'>
                                <span className='inline-block bg-color2 text-white text-xs px-2 py-1 rounded-full'>
                                  {activity.category}
                                </span>
                              </div>
                              <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-1'>
                                  <span className='text-black text-[12px]'>{activity.rating}</span>
                                  <span className='text-yellow-500'>
                                    {'★'.repeat(activity.rating)}{'☆'.repeat(5 - activity.rating)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <h3 className='font-semibold text-lg text-color1'>{activity.name}</h3>
                            <div className='text-xs text-gray-500 mb-2 flex items-center'>
                              <GiPositionMarker /> {activity.destination}
                            </div>
                            <p className='text-sm text-gray-600 mb-2'>{activity.description}</p>
                            <p className='font-semibold text-md mb-2'>₱{activity.budget}</p>
                            <Button className='bg-color1 text-white hover:bg-color2'>Visit</Button>
                          </div>
                        </div>
                      ))
                    )}
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
        userData={userData}
      />
      <Footer />
    </div>
  );
};

export default UserProfile;
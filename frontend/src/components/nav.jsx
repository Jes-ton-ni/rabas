import React, { useState, useEffect } from 'react';
import Logo from '../assets/rabas.png';
import Logo2 from '../assets/Rabasorso.png'
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Badge } from "@nextui-org/react";
import LoginSignup from '@/auth/loginSignup';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { GiPositionMarker } from "react-icons/gi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Link } from 'react-router-dom'; // Assuming this is already imported or added
import UserChatModal from '@/user/userChatSystem/UserChatModal'; // Import the UserChatModal component

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userData, setUserData] = useState(null);  
  const [isChatModalOpen, setIsChatModalOpen] = useState(false); // State for chat modal

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    try {
      const response = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include' // Include cookies in the request
      });
      if (response.ok) {
        // Logout successful
        console.log('Logout successful');
        // Redirect to the login page
        window.location.href = '/';
      } else {
        // Logout failed
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      // Handle error, display error message or any appropriate action
    }
  };

  // Function to check login status
  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:5000/check-login', {
        method: 'GET',
        credentials: 'include' // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json(); // Parse response body as JSON
        // Check the value of isLoggedIn
        setIsLoggedIn(data.isLoggedIn);
        
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      // Handle error, e.g., show an error message to the user
    }
  };  

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
    // Call the function to check login status when the component mounts
    checkLoginStatus();
  }, []);

  useEffect(() => {
    // Fetch username if user is logged in
    if (isLoggedIn) {
      fetchUserData();
    }
  }, [isLoggedIn]);

  const openChatModal = () => {
    setIsChatModalOpen(true);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
  };

  // Only return the component content after userData is fetched
  if (isLoggedIn === null || (isLoggedIn && !userData)) {
    return null; 
  }

  return (
    <div className="bg-light fixed  top-0 z-50  h-[7rem] w-full px-4 shadow-lg ">
      <div className="flex justify-evenly gap-x-4 items-center h-full container mx-auto">
        
        {/** Logo */}
        <a className='z-50 flex  items-center justify-center  hover:scale-105 duration-500' href='/'>
       
         <img className="lg:h-[6rem] h-[5rem] text-center" src={Logo} alt="Logo" />
          <img className="lg:h-[12rem] h-[9rem] text-center" src={Logo2} alt="Logo" />
       
        </a>

        {/** Desktop Navigation */}
        <div className="hidden lg:flex space-x-8 items-center text-color1">
          <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1">
            <FaHome/> <a href='/'>Home</a>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-1 text-color1 hover:text-gray-700 text-lg cursor-pointer hover:font-semibold duration-100 font-light">
                  <GiPositionMarker />
                 <a href='/destination'> Destinations</a>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>
                    <div className="p-9 w-max bg-light shadow-md shadow-light">
                      <ul className="space-y-2 text-dark text-sm">
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Bulusan</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Bulan</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Barcelona</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Casiguran</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Castilla</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Donsol</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Gubat</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Irosin</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Juban</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Magallanes</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Matnog</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Pilar</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Prieto Diaz</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Sta. Magdalena</li></a>
                        <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Sorsogon City</li></a>
                      </ul>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-1 text-color1 hover:text-gray-700 text-lg cursor-pointer hover:font-semibold duration-100 font-light">
                  <FaPersonWalking />
                   Discover
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>
                    <div className="w-max p-9 bg-light">
                      <ul className="text-dark text-sm space-y-3">
                      <a href='/activities'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Activities and Attractions</li></a>
                            <a href='/accomodation'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Accommodations</li></a>
                            <a href='/food'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Food Places</li></a>       
                            <a href='/shop'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Shops</li></a>                
                      </ul>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/** Mobile Menu Button */}
        <div className="lg:hidden z-50">
          <button onClick={toggleMenu} className="text-color1 text-2xl p-2">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

       {/** Mobile Menu */}
       {isMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-light z-40 overflow-y-auto flex items-center justify-center animate-appearance-in">
            <div className="flex flex-col items-center space-y-6 w-full  ">
              <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1">
                <FaHome/> <a href='/'>Home</a>
              </div>
              <NavigationMenu className='z-50'>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex gap-1 text-color1 hover:text-gray-700 text-lg cursor-pointer hover:font-semibold duration-100 font-light">
                      <GiPositionMarker />
                      <a href='/destination'> Destinations</a>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>
                        <div className="p-9 w-max bg-light shadow-md shadow-light">
                          <ul className="space-y-2 text-dark text-sm">
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Bulusan</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Bulan</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Barcelona</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Casiguran</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Castilla</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Donsol</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Gubat</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Irosin</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Juban</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Magallanes</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Matnog</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Pilar</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Prieto Diaz</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Sta. Magdalena</li></a>
                            <a href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Sorsogon City</li></a>
                          </ul>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
              
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="flex gap-1 text-color1 hover:text-gray-700 text-lg cursor-pointer hover:font-semibold duration-100 font-light">
                      <FaPersonWalking />
                      Discover
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <NavigationMenuLink>
                        <div className="w-max p-9 bg-light">
                          <ul className="text-dark text-sm space-y-3">
                            <a href='/activities'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Activities and Attractions</li></a>
                            <a href='/accomodation'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Accommodations</li></a>
                            <a href='/food'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Food Places</li></a>       
                            <a href='/shop'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Shops</li></a>           
                          </ul>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1">
                <h1>Deals</h1>
              </div>

              <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1">
                <h1>Transportation</h1>
              </div>
          
              <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1">
                <h1>About</h1>
              </div>
              
              <div className="text-color1 cursor-pointer" onClick={onOpen}> 
                <FaRegCircleUser className="text-3xl" />
              </div>
            </div>
          </div>
        )}

        {/** Search Bar and User Icon */}
        <div className="hidden lg:flex items-center gap-9">
          <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1">
           <h1>Deals</h1>
          </div>

          <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1">
           <h1>Transportation</h1>
          </div>
      
          <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1">
            <h1>About</h1>
          </div>

          {isLoggedIn ? (
            <Dropdown placement="bottom-end ">
              <DropdownTrigger>
                <div className="cursor-pointer ml-6">
                  <Avatar 
                    className='text-lg bg-color1 text-light hover:bg-color2/80 transition-colors duration-300' 
                    src={userData?.image_path 
                      ? `http://localhost:5000/${userData.image_path}` 
                      : `https://ui-avatars.com/api/?name=${firstLetter}`
                    }
                  />
                </div>
              </DropdownTrigger>
              <DropdownMenu  >
                <DropdownItem key="profile">
                  <Link to='/userprofile' className="block w-full text-left">
                    Profile
                  </Link>
                </DropdownItem>
                <DropdownItem key="messages" onClick={openChatModal}>
                  <div className='flex items-center gap-4'>
                    Messages
                    <Badge color='danger' placement='top-right' content='2'/>
                  </div>
                </DropdownItem>
                <DropdownItem key="logout" onClick={handleLogout} >Logout</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="text-color1 cursor-pointer  ml-6" onClick={onOpen}>
              <FaRegCircleUser className="text-3xl hover:bg-color2/70 hover:text-light duration-300 rounded-full" />
            </div>
          )}
          
          {/* <div className="text-color1 cursor-pointer  ml-6" onClick={onOpen}>
            <FaRegCircleUser className="text-3xl hover:bg-color2/70 hover:text-light duration-300 rounded-full" />
          </div> */}

        </div>
      </div>
        {/* User Modal */}
        <Modal
          backdrop="opaque"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          classNames={{
            backdrop: "bg-gray-900/50 backdrop-opacity-40", // Softened backdrop for better contrast
            body: "p-6", // Added padding for spacing within the modal
            closeButton: "  ", // Styled the close button
          }}
          className='max-h-full w-full max-w-[600px] overflow-auto scrollbar-custom '
        
        >
          <ModalContent >
            {() => (
              <>
                <ModalBody className='  '>
                
               
                    <LoginSignup />
                 
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* User Chat Modal */}
        <UserChatModal isOpen={isChatModalOpen} onClose={closeChatModal} />

    </div>
  );
};

export default Nav;

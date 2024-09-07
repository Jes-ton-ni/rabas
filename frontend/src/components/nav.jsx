import React from 'react';
import Logo from '../assets/rabas.png';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FaHome } from 'react-icons/fa';
import { GiPositionMarker } from "react-icons/gi";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaPersonWalking } from "react-icons/fa6";



const Nav = () => {
  return (
    <div className="bg-light fixed top-0 left-0  h-[7rem] w-full  z-50 px-4 shadow-lg">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        
        {/** Logo Centered */}
        <div className="absolute z-50 left-1/2 transform -translate-x-1/2 hover:scale-105 duration-500">
          <a href='/'><img className="h-[9rem] mt-28" src={Logo} alt="Logo" /></a>
        </div>

        {/** Navigation */}
        <div className="flex space-x-8 items-center text-color1">
          <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1 ">
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
                    <div className="p-9 w-max  bg-light shadow-md shadow-light">
                      <ul className=" space-y-2 text-dark text-sm ">
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Bulusan</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Bulan</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Barcelona</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Casiguran</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Castilla</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Donsol</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Gubat</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Irosin</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Juban</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Magallanes</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Matnog</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Pilar</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Prieto Diaz</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Sta. Magdalena</li></a>
                        <a  href=''><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Sorsogon City</li></a>
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
                    <div className=" w-max p-9 bg-light">
                      <ul className=" text-dark text-sm space-y-3">
                        <a  href='/activities'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Activities</li></a>
                        <a  href='/accomodation'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Accommodations</li></a>
                        <a  href='/food'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Foods</li></a>       
                        <a  href='/shop'><li className='hover:tracking-widest hover:font-semibold duration-100 cursor-pointer'>Shops</li></a>           
                      </ul>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
         
        </div>
        
        {/** Search Bar and User Icon */}
        <div className="flex items-center gap-9">

          <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1 ">
           <h1>Deals</h1>
          </div>

          <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1 ">
           <h1>Transportation</h1>
          </div>
      
      
          <div className="hover:text-gray-700 cursor-pointer hover:font-semibold duration-100 text-lg font-light text-color1 flex items-center gap-1 ">
            <h1>About</h1>
          </div>
          
         
         
          <div className="text-color1 cursor-pointer ml-6">
            <FaRegCircleUser className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;

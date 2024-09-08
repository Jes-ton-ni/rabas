import React, { useState, useEffect } from 'react'
import { MdDashboard } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { CiBoxes } from "react-icons/ci";
import { IoPricetagsOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom"

const Sidebar = () => {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const location = useLocation();

  const navItems = [
    { icon: <MdDashboard className='text-2xl'/>, label: 'Dashboard', path: '/dashboard' },
    { icon: <RiProfileFill className='text-2xl'/>, label: 'Business Profile', path: '/profile' },
    { icon: <CiBoxes className='text-2xl'/>, label: 'Business Products', path: '/products' },
    { icon: <IoPricetagsOutline className='text-2xl'/>, label: 'Business  Deals', path: '/deals' },
  ];

  useEffect(() => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setActiveNav(currentItem.label);
    }
  }, [location]);

  return (
    <div className='min-h-screen max-w-[300px] bg-color1  '>
      <div className='flex flex-col justify-center mt-3'>
        <h1 className='font-bold text-4xl text-center text-white'>Business Management</h1>
        <div className='w-full flex justify-center mt-3'>
          <div className='w-[200px] mt-3 bg-slate-600 h-[2px]'></div>
        </div>
      </div>
      
      {/** Nav */}
      <div className='flex justify-center items-center mt-[6rem] text-white'>
        <div className=''>
          <ul className='flex flex-col gap-4'>
            {navItems.map((item) => (
                <Link to={item.path} key={item.label}>
                <li
                  className={`flex items-center gap-1 rounded-md p-2 cursor-pointer ${
                    activeNav === item.label
                      ? 'bg-light text-dark'
                      : 'hover:bg-light hover:text-dark hover:scale-85'
                  } duration-300`}
                  onClick={() => setActiveNav(item.label)}
                >
                  {item.icon}
                  {item.label}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
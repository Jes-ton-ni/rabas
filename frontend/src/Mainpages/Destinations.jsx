import React from 'react'
import Nav from '../components/nav'
import Footer from '../components/Footer'
import Hero from '../components/herodestination'
import { Link } from 'react-router-dom'; 
import Bulusan from '../assets/bulusan-destination.jpg'
import Bulan from '../assets/bulan.webp'
import Barcelona from '../assets/barcelona.jpg'
import Casiguran from '../assets/casiguran.jpg'
import Castilla from '../assets/castilla.jpg'
import Donsol from '../assets/donsol.jpg'
import Gubat from '../assets/gubat.jpg'
import Irosin from '../assets/irosin.jpg'
import Juban from '../assets/juban.jpg'
import Magallanes from '../assets/magallanes.jpg'
import Matnog from '../assets/matnog.webp'
import Pilar from '../assets/pilar.jpg'
import Prieto from '../assets/prieto.jpg'
import Santa from '../assets/santa.jpg'
import Sorso from '../assets/sorsogon city.jpg'
import Search from '../components/Search';




const Destinations = () => {
  return (
    <div className='mx-auto min-h-screen bg-light font-sans'>
      <div>
      <Nav/>
      </div>

      {/** hero */}
      <div>
        <Hero/>
      </div>

      <div>
      <Search/>
      </div>

    {/** Contents */}
<div className=' mt-4  mx-auto w-full container '>
  <div className='  p-4 mb-4  '>
    <h1 className='font-semibold text-2xl'>Discover the Beauty of Sorsogon</h1>
 
  </div>

  
   {/** Municipalities */}
<div className='bg-color3 text-sm grid grid-cols-1 sm:grid-cols-2 font-font1 md:grid-cols-4 lg:grid-cols-5 gap-4'>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Bulusan}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore
    </Link>
    <div className="absolute bottom-0 left-0 right-0 bg-dark/60   text-white rounded-lg p-1  text-md text-center w-full  ">Bulusan</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Bulan}
      alt="Bulan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore 
    </Link>
    <div className="absolute bottom-0 left-0 right-0  bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full  ">Bulan</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Barcelona}
      alt="Barcelona"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore 
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full   ">Barcelona</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Casiguran}
      alt="Casiguran"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full ">Casiguran</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Castilla}
      alt="Castilla"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full ">Castilla</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Donsol}
      alt="Donsol"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore 
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full   ">Donsol</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Gubat}
      alt="Gubat"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
   Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full   ">Gubat</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Irosin}
      alt="Irosin"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
 Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full  ">Irosin</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Juban}
      alt="Juban"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore 
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full   ">Juban</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Magallanes}
      alt="Magallanes"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full ">Magallanes</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Matnog}
      alt="Matnog"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full  ">Matnog</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Pilar}
      alt="Pilar"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
   Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full   ">Pilar</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Prieto}
      alt="Prieto"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore 
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full  ">Prieto Diaz</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Santa}
      alt="Santa"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
    Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full   ">Sta. Magdalena</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Sorso}
      alt="Sorsogon City"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md "
    >
   Explore
    </Link>
    <div className="absolute bottom-0  left-0 right-0 bg-dark/60  text-white rounded-lg p-1 text-md text-center w-full  ">Sorsogon City</div>
  </div>  
</div>
  </div>

  {/** Footer */}

  <div className='mt-9'>
  <Footer/>
  </div>

</div>

   
   
  )
}

export default Destinations
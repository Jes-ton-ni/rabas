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
    <div className='mx-auto  bg-light font-sans'>
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
<div className='bg-color3 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 gap-4'>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Bulusan}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Bulusan, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Bulan}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Bulan, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Barcelona}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Barcelona, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Casiguran}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Casiguran, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Castilla}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Castilla, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Donsol}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Donsol, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Gubat}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Gubat, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Irosin}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Irosin, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Juban}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Juban, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Magallanes}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Magallanes, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Matnog}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Matnog, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Pilar}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Pilar, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Prieto}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Prieto Diaz, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Santa}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Sta. Magdalena, Sorsogon
    </Link>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md shadow-black"
      src={Sorso}
      alt="Bulusan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
     Sorsogon City
    </Link>
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
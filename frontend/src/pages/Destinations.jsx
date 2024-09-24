import React from 'react'
import Nav from '../components/navuser'
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
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Bulusan, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2  bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Bulusan</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Bulan}
      alt="Bulan"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Bulan, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Bulan</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Barcelona}
      alt="Barcelona"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Barcelona, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Barcelona</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Casiguran}
      alt="Casiguran"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Casiguran, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Casiguran</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Castilla}
      alt="Castilla"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Castilla, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Castilla</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Donsol}
      alt="Donsol"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Donsol, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Donsol</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Gubat}
      alt="Gubat"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Gubat, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Gubat</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Irosin}
      alt="Irosin"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Irosin, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Irosin</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Juban}
      alt="Juban"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Juban, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Juban</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Magallanes}
      alt="Magallanes"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Magallanes, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Magallanes</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Matnog}
      alt="Matnog"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Matnog, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Matnog</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Pilar}
      alt="Pilar"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Pilar, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Pilar</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Prieto}
      alt="Prieto"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Prieto Diaz, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Prieto Diaz</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Santa}
      alt="Santa"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Sta. Magdalena, Sorsogon
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Sta. Magdalena</div>
  </div>
  <div className="relative h-[200px] w-full border-2">
    <img
      className="h-full w-full object-cover rounded-sm shadow-md"
      src={Sorso}
      alt="Sorsogon City"
    />
    <Link
      to="/destination-page" // Replace with your destination route
      className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 text-white text-md font-bold"
    >
      Sorsogon City
    </Link>
    <div className="absolute bottom-2 left-2 bg-white bg-opacity-80 p-1 text-black font-semibold rounded shadow-md">Sorsogon City</div>
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
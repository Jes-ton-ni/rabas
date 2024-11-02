import { useEffect, useState } from 'react';
import Nav from '@/components/nav';
import Search from '@/components/Search';
import { Spinner } from '@nextui-org/react';
import Hero from '@/components/heroTransportation';
import Terminal from '../assets/legazpi terminal.webp'
import Sitex from '../assets/sitex.webp'
import Footer from '@/components/Footer';

const Transportation = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'RabaSorsogon | Transportation';
  }, []);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Spinner className='flex justify-center items-center h-screen' size='lg' label="Loading..." color="primary" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <Nav />
      <Hero />
      <Search />

      {/* Legazpi City Section */}
      <div className="p-6">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8 container">
          <h2 className="text-2xl font-semibold mb-4">Legazpi Grand Central Terminal</h2>
          <div className="w-full h-64 rounded mb-6 flex items-center justify-center">
            <img className='bg-opacity-60 bg-black h-full w-full object-cover' src={Terminal} alt="Legazpi Terminal" />
          </div>
          <h3 className="text-lg font-semibold mb-4">Legazpi City Routes</h3>
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-color1 text-white">
                <th className="p-3 text-left border-b border-gray-300">Origin</th>
                <th className="p-3 text-left border-b border-gray-300">Destination</th>
                <th className="p-3 text-left border-b border-gray-300">Schedule</th>
                <th className="p-3 text-left border-b border-gray-300">Fare</th>
                <th className="p-3 text-left border-b border-gray-300">Mode</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[
                { origin: 'Legazpi City', destination: 'Donsol', schedule: '5:30 AM - 7:00 PM', fare: '₱150', mode: 'Van' },
                { origin: 'Legazpi City', destination: 'Bulan', schedule: '5:30 AM - 7:00 PM', fare: '₱230', mode: 'Van' },
                { origin: 'Legazpi City', destination: 'Pilar', schedule: '5:30 AM - 7:00 PM', fare: '₱150', mode: 'Van' },
                { origin: 'Legazpi City', destination: 'Sorsogon City', schedule: '5:30 AM - 7:00 PM', fare: '₱140', mode: 'Van' },
                { origin: 'Legazpi City', destination: 'Daraga', schedule: '6:00 AM - 8:00 PM', fare: '₱50', mode: 'Bus' },
                { origin: 'Legazpi City', destination: 'Manila', schedule: '7:00 AM - 7:00 PM', fare: '₱1000', mode: 'Bus' },
                { origin: 'Legazpi City', destination: 'Naga City', schedule: '6:00 AM - 6:00 PM', fare: '₱350', mode: 'Van' },
                { origin: 'Legazpi City', destination: 'Tabaco City', schedule: '5:00 AM - 7:00 PM', fare: '₱120', mode: 'Jeep' },
                { origin: 'Legazpi City', destination: 'Ligao', schedule: '6:00 AM - 6:00 PM', fare: '₱80', mode: 'Jeep' },
                { origin: 'Legazpi City', destination: 'Camalig', schedule: '7:00 AM - 9:00 PM', fare: '₱60', mode: 'Jeep' }
              ].map((route, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{route.origin}</td>
                  <td className="p-3">{route.destination}</td>
                  <td className="p-3">{route.schedule}</td>
                  <td className="p-3">{route.fare}</td>
                  <td className="p-3">{route.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sorsogon City Section */}
        <div className="bg-white shadow-md rounded-lg p-6 container">
          <h2 className="text-2xl font-semibold mb-4">SITEX (Sorsogon Integrated Terminal Exchange)</h2>
          <div className="w-full h-64 rounded mb-6 flex items-center justify-center">
            <img className='bg-opacity-60 bg-black h-full w-full object-cover' src={Sitex} alt="Legazpi Terminal" />
          </div>
          <h3 className="text-lg font-semibold mb-4">Sorsogon City Routes</h3>
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-color1 text-white">
                <th className="p-3 text-left border-b border-gray-300">Origin</th>
                <th className="p-3 text-left border-b border-gray-300">Destination</th>
                <th className="p-3 text-left border-b border-gray-300">Schedule</th>
                <th className="p-3 text-left border-b border-gray-300">Fare</th>
                <th className="p-3 text-left border-b border-gray-300">Mode</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {[
                { origin: 'Sorsogon City', destination: 'Bulan', schedule: '7:00 AM - 8:00 PM', fare: '₱140', mode: 'Modern Jeep' },
                { origin: 'Sorsogon City', destination: 'Matnog', schedule: '7:00 AM - 8:00 PM', fare: '₱120', mode: 'Modern Jeep' },
                { origin: 'Sorsogon City', destination: 'Irosin', schedule: '7:00 AM - 8:00 PM', fare: '₱70', mode: 'Modern Jeep' },
                { origin: 'Sorsogon City', destination: 'Castilla', schedule: '7:00 AM - 8:00 PM', fare: '₱60', mode: 'Jeep' },
                { origin: 'Sorsogon City', destination: 'Gubat', schedule: '7:00 AM - 8:00 PM', fare: '₱50', mode: 'Jeep' },
                { origin: 'Sorsogon City', destination: 'Barcelona', schedule: '7:00 AM - 8:00 PM', fare: '₱70', mode: 'Jeep' },
                { origin: 'Sorsogon City', destination: 'Prieto Diaz', schedule: '7:00 AM - 8:00 PM', fare: '₱90', mode: 'Modern Jeep' },
                { origin: 'Sorsogon City', destination: 'Juban', schedule: '7:00 AM - 8:00 PM', fare: '₱40', mode: 'Jeep' },
                { origin: 'Sorsogon City', destination: 'Magallanes', schedule: '7:00 AM - 8:00 PM', fare: '₱110', mode: 'Modern Jeep' },
                { origin: 'Sorsogon City', destination: 'Sta. Magdalena', schedule: '7:00 AM - 8:00 PM', fare: '₱120', mode: 'Jeep' }
              ].map((route, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{route.origin}</td>
                  <td className="p-3">{route.destination}</td>
                  <td className="p-3">{route.schedule}</td>
                  <td className="p-3">{route.fare}</td>
                  <td className="p-3">{route.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Transportation;

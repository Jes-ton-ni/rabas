import {useEffect , useState} from 'react'
import Nav from '@/components/nav';
import Search from '../components/Search';
import { Spinner } from '@nextui-org/react';

const About = () => {
  const [loading, setLoading] = useState(true);


     // Title Tab
     useEffect(() => {
      document.title = 'RabaSorsogon | About';
    });

    useEffect(() => {

      // Simulate data fetching
      setTimeout(() => setLoading(false), 1000);
    }, []);
  
    if (loading) {
      return <Spinner className='flex justify-center items-center h-screen' size='lg' label="Loading..." color="primary" />;
    }
  
  
  return (
    <div>
      <Nav/>
      <div className="mt-[7rem] flex justify-center w-full px-4">
        <Search />
      </div>
    </div>
  )
}

export default About
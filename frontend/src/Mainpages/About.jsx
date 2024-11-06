import {useEffect , useState} from 'react'
import Nav from '@/components/nav';
import Search from '../components/Search';
import { Spinner } from '@nextui-org/react';
import { motion } from 'framer-motion'; // Import Framer Motion


const About = () => {
  const [loading, setLoading] = useState(true);
  const [showButton, setShowButton] = useState(false); // State to show/hide button


     // Title Tab
     useEffect(() => {
      document.title = 'RabaSorsogon | About';
    });

    useEffect(() => {

      // Simulate data fetching
      setTimeout(() => setLoading(false), 1000);

      // Show button when scrolled down
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };


  
    if (loading) {
      return <Spinner className='flex justify-center items-center h-screen' size='lg' label="Loading..." color="primary" />;
    }
  
  
  return (
    <div className='bg-light min-h-screen'>
      <Nav/>
      <div className="mt-[7rem] flex justify-center w-full px-4">
        <Search />
      </div>
      {showButton && (
        <motion.button
           className="fixed bottom-5 right-2 p-3 rounded-full shadow-lg z-10"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "loop" }}
          style={{
            background: 'linear-gradient(135deg, #688484  0%, #092635 100%)', // Gradient color
            color: 'white',
          }}
        >
          ↑
        </motion.button>
      )}

    </div>
  )
}

export default About
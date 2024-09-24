import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/home'
import Destinations from './pages/Destinations';
import Activity from './pages/Activities';
import Accomodation from './pages/Accomodation';
import Food from './pages/Food';
import Shop from './pages/Shop';
import Business from '../src/businesspage/businesspage'
import Dashboard from './admin/businessdashboard'
import Profile from './admin/businessprofile'
import Product from './admin/businessproducts'
import Deals from './admin/businessdeals'
import UserProfile from './auth/userprofile';
import Booking from '@/admin/businessbooking'


function App() {
  return (
    <Router>
     
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/destination' element={<Destinations />} />
          <Route path='/activities' element={<Activity />} />
          <Route path='/accomodation' element={<Accomodation />} />
          <Route path='/food' element={<Food />} />
          <Route path='/shop' element={<Shop />} />
          <Route path='/business' element={<Business />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/products' element={<Product />} />
          <Route path='/deals' element={<Deals />} />
          <Route path='/userprofile' element={<UserProfile />} />
          <Route path='/booking' element={<Booking />} />
        </Routes>
     
    </Router>
  )
}

export default App
import  React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/home'
import Destinations from './pages/Destinations';
import Activity from './pages/Activities';
import Accomodation from './pages/Accomodation';
import Food from './pages/Food';
import Shop from './pages/Shop';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/destination' element = {<Destinations/>}/>
          <Route path='/activities' element = {<Activity/>}/>
          <Route path='/accomodation' element= {<Accomodation/>}/>
          <Route path='/food' element={<Food/>}/>
          <Route path='/shop' element={<Shop/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

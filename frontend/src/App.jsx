import  React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../src/pages/home'
import Destinations from './pages/Destinations';
import Activity from './pages/Activities';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element = {<Home/>}/>
          <Route path='/destination' element = {<Destinations/>}/>
          <Route path='/activities' element = {<Activity/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App

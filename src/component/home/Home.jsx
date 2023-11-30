import React, { useEffect } from 'react'
import './home.css'

import { useNavigate } from 'react-router-dom'; 
import Hero from '../hero/Hero';
import Landing from '../landing/Landing';

function Home(props) {

  return (
    <div className="home">
        <Landing />
        <Hero />
    </div>
  )
}

export default Home
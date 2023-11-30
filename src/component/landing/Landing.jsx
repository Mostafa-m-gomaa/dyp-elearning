import React from 'react'
import './landing.css'
import foto from "../../assets/landing-image.png"
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className="landing">
        <div className="container">
            <div className="left">
                <h1>اهلا بكم في منصة </h1>
                <h1>DYP</h1>
                
                <div>من هنا يبدا التقدم</div>

                <Link to="#start">هيا نبدا</Link>
            </div>
            <div className="right">
                <img src={foto} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Landing

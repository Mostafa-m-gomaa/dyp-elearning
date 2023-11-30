import React, { useEffect, useState } from 'react'
import logo from "../../assets/logo.png"
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import "./nav.css"
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';


function Nav(props) {
  const history =useNavigate()

  const {login,setLogin}=useContext(AppContext)

  const hanleSigOut =()=>{
  history("/")
  window.location.reload();
  sessionStorage.clear()
  document.querySelector(".nav .list").classList.remove("list-show")
  

}
const clickBurger =()=>{
  document.querySelector(".nav .list").classList.toggle("list-show")
}
const clickLink =()=>{
  document.querySelector(".nav .list").classList.remove("list-show")
}

  return (
    <div className="nav">

       
    <div className="container">
      <Link onClick={clickLink} to="/"> <img src={logo} alt="" /></Link>
      <div className="burger" onClick={clickBurger}>
      <input type="checkbox" onClick={clickBurger} id="checkbox" />
    <label for="checkbox" class="toggle">
        <div class="bars" id="bar1"></div>
        <div class="bars" id="bar2"></div>
        <div class="bars" id="bar3"></div>
    </label>
      </div>
       
        <div className="list">

        <Link onClick={clickLink} to="/help">المساعده و الدعم</Link>
        
     {login ? <Link onClick={clickLink} to="/my-courses">كورساتي</Link>:null}   
     {login ? <Link onClick={clickLink} to="/my-certi">شهاداتي</Link>:null}   
     {login ? <Link onClick={clickLink} to="/profile">الاعدادات</Link>:null}   
        
        
        {login ? <Link  to="/login" onClick={hanleSigOut}>تسجيل الخروج</Link> : <Link to="/login" >تسجل الدخول</Link> }
        
     
            </div>
        </div>
    </div>
  )
}

export default Nav
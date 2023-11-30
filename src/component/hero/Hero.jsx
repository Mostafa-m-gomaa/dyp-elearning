import React from 'react'
import './hero.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useEffect,useState } from 'react';
import Login from '../login/Login';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { useRef } from 'react';




const Hero = () => {

  const{login,setLogin}=useContext(AppContext)
  const history=useNavigate()
  const divRef = useRef(null);

    const [data,setData]=useState([])
    const [edit,setEdit]=useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
        
      };
    useEffect(() => {
        fetch("https://api2.sdcbm.com/api/showall/categ")
        .then(res=>res.json())
        .then(data=>setData(data))

if(login==true){
  window.onpopstate = () => {
    history("/")
  };
}

    }, [])

    
  return (
<div className="hero" id='start' >
 
    {isLoading ?    <div className="spin-cont"><div class="spinner">
  <div class="rect1"></div>
  <div class="rect2"></div>
  <div class="rect3"></div>
  <div class="rect4"></div>
  <div class="rect5"></div>
</div></div>:null}

    <div className="container" >
    <h1>اختار اي مرحلة </h1>

<div className="btns">


{data.map((ind)=>{
    return (
        <div className="card" key={ind.id}>
          <div className="card2">
        <img  src={"https://api2.sdcbm.com"+ind.image} onLoad={handleImageLoad} alt="" />
        <Link to={`/subCat/${ind.id}`}>
          <span>
            
          {ind.category_name}
          </span>
          </Link>
        </div>
    </div>
    )
})}
        
      
   
</div>
    </div>

   
</div>
  )
}

export default Hero

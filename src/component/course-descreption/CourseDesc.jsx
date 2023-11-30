import React, { useContext } from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'
import './CourseDesc.css'

import ReactPlayer from 'react-player';
import { AppContext } from '../../App';

const CourseDesc = () => {

    const param =useParams()
    const [data,setData]=useState({})
    const [instructor,setInstructor]=useState({})
    const [isLoading, setIsLoading] = useState(true);
    const {token,setToken}=useContext(AppContext)
    const handleImageLoad = () => {
        setIsLoading(false);
        
      };

    useEffect(()=>{
      // setToken(sessionStorage.getItem("token"))
      const token =sessionStorage.getItem("token")
        fetch("https://api2.sdcbm.com/api/show/courses/"+param.courseId,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=>{

            setData(data.Course)
            setInstructor(data.Course.instructor)
        }
        )

        
             
    },[])

  return (
<div className="course-des">
{isLoading ?    <div className="spin-cont"><div class="spinner">
  <div class="rect1"></div>
  <div class="rect2"></div>
  <div class="rect3"></div>
  <div class="rect4"></div>
  <div class="rect5"></div>
</div></div>:null}
    <div className="container">
        <div className="left">
            <div className="name">تقديم الاستاذ : {instructor.instructor_name}</div>
            <img src={"https://api2.sdcbm.com"+instructor.image} onLoad={handleImageLoad} alt="" />
        </div>
        <div className="right">
            <div className="c-name">{data.course_name}</div>
            <div className="price">سعر الكورس :  {data.course_price}</div>
            <div className="dis"> {data.course_description}</div>
            <Link to="/">اشتري الان </Link>
        </div>
    </div>
</div>
  )
}

export default CourseDesc

import React, { useEffect, useState } from 'react'
import './myCurses.css'
import { Link } from 'react-router-dom'
const MyCourses = () => {
    const [courses,setCourses]=useState([])

    useEffect(()=>{
        const token =sessionStorage.getItem("token")
        fetch("https://api2.sdcbm.com/api/show/myCourses",{

        headers: {
            'Authorization': `Bearer ${token}`
        }
        }
        )
        .then(res=>res.json())
        .then(data=>setCourses(data.courses))
    },[])
  return (
<div className="my-courses">
    <div className="container">
        <h2>الكورسات التي تم الاشتراك بها</h2>
        <h4>{courses.length}:عدد الكورسات    </h4>
        <div className="courses">
            {courses.map((course)=>{
                return(
                    <div className="course" key={course.id}>
                        <img src={"https://api2.sdcbm.com"+course.image} alt="" />
                        <div className="name">{course.course_name}</div>
                        <Link to={`/lesson/${course.id}`}>استعراض الدورة التدريبة</Link>
                    </div>
                )
            })}
        </div>
    </div>
</div>
  )
}

export default MyCourses

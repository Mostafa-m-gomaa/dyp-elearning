import React, { useContext, useEffect, useState } from 'react'
import './myCerti.css'
import { AppContext } from '../../App'
import DownloadImageButton from './download'





const MyCerti = () => {
    // const {token,setToken}=useContext(AppContext)
    const [certi,setCerti]=useState([])
    const {userName,setUserName}=useContext(AppContext)


    const handleDownload = (imageUrl, filename ) => {
   const link = document.createElement('a');
link.href = imageUrl;
link.download = filename;
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
    };


    useEffect(()=>{
        let token =sessionStorage.getItem("token")
        fetch("https://api2.sdcbm.com/api/show/certi",{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(res=>res.json())
          .then(data=>setCerti(data.user))
    },[])
    // console.log(certi)
  return (
<div className="my-certi">
    <div className="container">
        {certi.map((cert,index)=>{
          return(
            <div className="certi" key={cert.id}>
              <span className='name'>{userName}</span>
              <span className='course-name'>{cert.course.course_name}</span>
                <img src={"https://api2.sdcbm.com"+cert.course.certificate} alt="" />

              {/* <button onClick={()=>handleDownload(`https://api2.sdcbm.com${cert.course.certificate}`,"image.jpg")}>download</button> */}
                <DownloadImageButton imageUrl="https://api2.sdcbm.com/storage/certificates/jFpDKSLW3pnNs8yd7eCZHzdOi0TM6H4d27A3A25g.jpg" filename="sayed.jpg" />
            </div>
          )
        })}
    </div>
</div>
  )
}

export default MyCerti

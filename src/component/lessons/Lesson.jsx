import React, { useContext } from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'
import './lesson.css'

import ReactPlayer from 'react-player';
import { AppContext } from '../../App';
import { saveAs } from 'file-saver';

const Lesson = () => {




 

  
  const history=useNavigate()

    const param =useParams()
    const [data,setData]=useState([])
    const [vid,setVid]=useState(false)
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [name,setName]=useState("")
    const {token,setToken}=useContext(AppContext)
    const [showReminder, setShowReminder] = useState(false);
    const [quiz,setQuiz]=useState([])
    const [pdf,setPdf]=useState([])
   

    const [isPlaying, setIsPlaying] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
        
      };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };



    const vidClick =(vra)=>{
        setSelectedVideo(vra)
    }
    const close =()=>{
        setSelectedVideo(null)
        setIsPlaying(false);
    }


   
    useEffect(()=>{
      const token =sessionStorage.getItem("token")

        fetch("https://api2.sdcbm.com/api/getrelated/courses/"+param.lessonId ,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=> {
           if(data.error){
           console.log("error")
          
     
          }
           if(data.status){
           history("/not-paid")
        

          }
          else{
            setData(data)
      

          }
        })

        fetch("https://api2.sdcbm.com/api/show/courses/"+param.lessonId,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(dat=>setName(dat.Course.course_name))


        fetch("https://api2.sdcbm.com/api/show/quiz/"+param.lessonId,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=>{

          setQuiz(data.quiz)
       
        })

        fetch("https://api2.sdcbm.com/api/show/pdf/"+param.lessonId,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(res=>res.json())
        .then(data=>{
         
          setPdf(data.pdf)})

     
    },[])

  


  return (
<div className="lesson">
{isLoading ?    <div className="spin-cont"><div class="spinner">
  <div className="rect1"></div>
  <div className="rect2"></div>
  <div className="rect3"></div>
  <div className="rect4"></div>
  <div className="rect5"></div>
</div></div>:null}
    <div className="container">

        <h1>{name}</h1>
        <div className="cards">
          {/* ///////////////////////////////////////////////////////////////////// */}
        {data.map((ind)=>{
    return (
        <div className="card" key={ind.id}>
            
        <img src={ "https://api2.sdcbm.com"+ind.image} onLoad={handleImageLoad} alt="" />
        <ReactPlayer   playing={selectedVideo === ind.content}
        onPlay={handlePlay}
        onPause={handlePause} url={ind.content} controls={true} style={{ display: selectedVideo === ind.content? 'block' : 'none' }} /> 
        <div onClick={close} className="close"  style={{ display: selectedVideo === ind.content? 'block' : 'none' }} >x</div>
        {/* <div className="light" style={{ display: selectedVideo === ind.content? 'block' : 'none' }} ></div> */}
          
        <button  onClick={() => vidClick(ind.content)}>
            Play video
          </button>
        <div className='name'>{ind.name}</div>
       
    </div>
    )
})}

{pdf.map((pdf)=>{
  return(
    // <button onClick={() => handleDownloadPDF(`https://api2.sdcbm.com${pdf.pdf}`)}>Download PDF</button>
    <a className='pdf' href={`https://api2.sdcbm.com${pdf.pdf}`} target='_blank'>ملف خاص بالكورس</a>

  )
})}

<Link  className='quiz-button' to={`/quiz/${param.lessonId}`}>اذا انتهيت من مشاهدة الكورس ابدا بالاختبار من هنا</Link>




     
        </div>
       
    
    </div>
</div>
  )
}

export default Lesson

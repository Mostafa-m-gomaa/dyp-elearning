import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import './sub.css'
const SubCat = () => {
    const param=useParams()
    const [data,setData]=useState([])
    const [cat,setCat]=useState({})
    const [name,setName]=useState("")
    const [isLoading, setIsLoading] = useState(true);
  


    useEffect(() => {
        fetch("https://api2.sdcbm.com/api/getrelated/categ/"+param.catId)
        .then(res=>res.json())
        .then(data=>setData(data))

        
        fetch("https://api2.sdcbm.com/api/show/categ/"+param.catId)
        .then(res=>res.json())
        .then(dat=>setName(dat.category.category_name))


        
     
    }, [])
    



  return (
 <div className="sub">
        
  
    <div className="container">
        <h1>{name}</h1>
        
        <div className="cards">
        {data.map((ind)=>{
    return (
        <div className="card" key={ind.id}>
            <div className="card2">

        <img src={ "https://api2.sdcbm.com"+ind.image}  alt="" />
        <Link to={`/subSubCat/${ind.id}`}>
            <span>

            {ind.sub_category_name}
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

export default SubCat

import React from 'react'
import './not.css'
import { Link} from 'react-router-dom'
import { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
const NotPaid = () => {
    const history =useNavigate()
    useEffect(() => {
        window.onpopstate = () => {
          history("/")
        };
      }, []);
  return (
   <div className="not">
    <div className="container">
        <div className="box">
        <div>للاسف يجب ان تدفع ثمن الكورس اولا ! </div>
        
        </div>
    </div>
   </div>
  )
}

export default NotPaid

import React, { useContext } from 'react'
import './signUp.css'
import { Link } from 'react-router-dom'
import laptop from"../../assets/laptop.png"
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../App'
import { numberKeys } from './CountryCodes'

const SignUp = () => {

  const history =useNavigate()
const {messageError}=useContext(AppContext)
  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [phone,setPhone]=useState("")
  const [nasab,setNasab]=useState("")
  const [father,setFather]=useState("")
  const [key,setKey]=useState("")
  const {loader,setLoader}=useContext(AppContext)
  const [checked,setChecked]=useState(false)
  const [numKey,setNumKey]=useState("")

  const handleEmail =(e)=>{
    setEmail(e.target.value)
  }
  const handleFather =(e)=>{
    setFather(e.target.value)
  }
  const handlePassword =(e)=>{
    setPassword(e.target.value)
  }
  const handleName =(e)=>{
    setName(e.target.value)
  }
  const handlePhone=(e)=>{
    setPhone(e.target.value)
  }
  const handleNasab =(e)=>{
    setNasab(e.target.value)
  }
  const handleKey =(e)=>{
    setKey(e.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    if(!checked){
      messageError("يجب أن توافق علي شروط الخصوصية أولا")
    }
    else{

      setLoader(true)
    
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('password', password);
      formData.append('nasab', nasab);
      formData.append('father_name',father);
      formData.append('key', key);
      try {
        const response = await fetch('https://api2.sdcbm.com/api/register', {
          method: 'POST',
          body: formData,
        })
        .then(res=>res.json())
        if (response.status=="Success") { 
          
          history("/login")
          setLoader(false)
  
          console.log(response)
        } else {
        console.log("error")
        console.log(response)
        setLoader(false)
        messageError(response.errors.error)
        }
      } catch (error) {
        setLoader(false)
        console.error("dw");
      
      
      }
    }
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
   setChecked(isChecked)
  }

  useEffect(()=>{
fetch("https://gist.github.com/anubhavshrimal/75f6183458db8c453306f93521e93d37.js")
.then(res=>res.json())
.then(data=>console.log(data))
  },[])
  const changeKey =(e)=>{
    setNumKey(e.target.value)
    setPhone(e.target.value)
  }

  return (
    <div className="sign-up">
        <div className="container">
        <div className="login-text">
            <h2>welcome to dyp</h2>
            <img src={laptop} alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A voluptates laudantium consequuntur ea, placeat blanditiis eaque, saepe vitae nesciunt officia dolorem libero quia sequi cum? Nulla ducimus debitis voluptatum perferendis.</p>
            </div>
            <form onSubmit={handleLogin}>
            <h2>تسجيل مستخدم جديد</h2>

            <input value={email} onChange={handleEmail} type='text' placeholder='ادخل الايميل الخاص بك'/>
            <input value={password} onChange={handlePassword} type='password' placeholder='ادخل كلمة السر'/>
            <input value={name} onChange={handleName} type='text' placeholder='ادخل اسمك'/>
            <input value={father} onChange={handleFather} type='text' placeholder='ادخل اسم الاب'/>
            <label htmlFor="" className="phone">
            <select onChange={changeKey}>
              <option value="">+0</option>
              {numberKeys.map((num,index)=>{
                return(
                  <option key={index} value={num.dial_code}>{num.name}</option>
                )
              })}
            </select>
            <input value={phone} onChange={handlePhone} type='text' placeholder='ادخل رقم الجوال'/>
            </label>
            <input value={nasab} onChange={handleNasab} type='text' placeholder='ادخل النسب '/>
            <input value={key} onChange={handleKey} type='text' placeholder='ادخل كلمة لاسترداد الايميل '/>
            <div className="check">
              <div>هل انت موافق علي سياسة الخصوصية لدينا</div>
              <Link to="/syasa">اٍطلع علي سياسة الخصوصية</Link>
              <input type="checkbox" checked={checked} onChange={handleCheckboxChange}/>
            </div>
            <button type='submit'>تسجيل الدخول </button>
          

            </form>
        </div>
    </div>
  )
}

export default SignUp

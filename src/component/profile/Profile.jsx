import React, { useContext, useState  ,useEffect} from 'react'
import "./profile.css"
import { AppContext } from '../../App'

const Profile = () => {
    const {userName,setUserName}=useContext(AppContext)
    const {balance,setBalance}=useContext(AppContext)
    const [value,setValue]=useState("")
    const {token,setToken}=useContext(AppContext)
    const {done,setDone}=useContext(AppContext)
    const [user,setUser]=useState({})


const selectChange =(e)=>{
setValue(e.target.value)
}

const handleSubmit =(e)=>{
e.preventDefault()

const formData = new FormData();
formData.append('balance', value);

fetch("https://api2.sdcbm.com/api/store/request",{
    headers: {
      'Authorization': `Bearer ${token}`
    },
    method: 'POST',
    body: formData
  })
  .then(res=>res.json())
  .then(data=>{
    if(data.status=="sent succfully"){
        setDone(true)}
        else{
            console.log("failed")
        } 
  })

}


useEffect(()=>{
  const toke=sessionStorage.getItem("token")
  fetch("https://api2.sdcbm.com/api/myData",{
    headers: {
      'Authorization': `Bearer ${toke}`
    }
  })
  .then(res=>res.json())
  .then(data=>setUser(data.user))
},[])



  return (
 <div className="profile">
    <div className="container">
        <div className="info">
            <div className="name">{user.name} مرحبا</div>
            <div className="balance">{user.balance} : رصيدك</div>
        </div>

        <div className="get-balance">
            <h2>يمكنك شراء العملات من هنا للاشتراك فالكورسات</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="">
                    اختر المبلغ الذي تريد شراءه 
                    <select onChange={selectChange}>
                        <option  value="">اختار المبلغ</option>
                        <option  value="5000">5000</option>
                        <option  value="6000">6000</option>
                        <option  value="7000">7000</option>
                        <option  value="8000">8000</option>
                        <option value="9000" >9000</option>
                        <option  value="10000">10000</option>
                        <option  value="11000">11000</option>
                        <option value="12000">12000</option>
                        <option  value="13000">13000</option>
                        <option  value="14000">14000</option>
                        <option  value="15000">15000</option>
                        <option value="16000">16000</option>
                        <option  value="17000">17000</option>
                        <option  value="18000">18000</option>
                        <option value="19000">19000</option>
                        <option  value="20000">20000</option>
                        <option value="21000" >21000</option>
                        <option  value="22000">22000</option>
                        <option  value="23000">23000</option>
                        <option value="24000">24000</option>
                        <option value="25000">25000</option>
                        <option value="25000">26000</option>
                        <option value="25000">27000</option>
                        <option value="25000">28000</option>
                        <option value="25000">29000</option>
                        <option value="30000">30000</option>
                        <option value="30000">31000</option>
                        <option value="30000">32000</option>
                        <option value="30000">33000</option>
                        <option value="30000">34000</option>
                        <option value="35000">35000</option>
                        <option value="35000">36000</option>
                        <option value="35000">37000</option>
                        <option value="35000">38000</option>
                        <option value="35000">39000</option>
                        <option value="40000">40000</option>
                        <option value="40000">41000</option>
                        <option value="40000">42000</option>
                        <option value="40000">43000</option>
                        <option value="40000">44000</option>
                        <option value="45000">45000</option>
                        <option value="45000">46000</option>
                        <option value="45000">47000</option>
                        <option value="45000">48000</option>
                        <option value="45000">49000</option>
                        <option value="50000">50000</option>
                      
                    </select>
                </label>
                <button type='submit'>شراء</button>
            </form>
        </div>
    </div>
 </div>
  )
}

export default Profile

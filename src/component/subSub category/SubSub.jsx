import React, { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './subsub.css'
import { useContext } from 'react'
import { AppContext } from '../../App'

const SubSub = () => {

    const {login,setLogin}=useContext(AppContext)
    const {token,setToken}=useContext(AppContext)
    const {messageError}=useContext(AppContext)
    const {paid,setPaid}=useContext(AppContext)
    const {noBalance,setNoBalance}=useContext(AppContext)
    const param =useParams()
    const [data,setData]=useState([])
    const [name,setName]=useState("")
    const [showReminder, setShowReminder] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const handleImageLoad = () => {
        setIsLoading(false);
        
      };

    const linkprevent=(event)=>{
        // event.preventDefault()
        if(login==false){
            event.preventDefault()
            setShowReminder(true)
        }
        
       
        
    }
    const handleDismiss = () => {
        setShowReminder(false);
      }

      const buyCourse =(id)=>{
        fetch("https://api2.sdcbm.com/api/payCourse/"+id,{
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res=>res.json())
  .then(data=>{
    
    if(data.status =="No enough balance"){
      setNoBalance(true)
      console.log(data)
    }
    else if(data.error=="Invalid token" ){
messageError("please login first")
    }
    else{
      setPaid(true)
      console.log(data)
    }
    })

      }

    useEffect(()=>{
        fetch("https://api2.sdcbm.com/api/getrelated/SubCateg/"+param.id)
        .then(res=>res.json())
        .then(data=>setData(data))

        fetch("https://api2.sdcbm.com/api/show/SubCateg/"+param.id)
        .then(res=>res.json())
        .then(dat=>setName(dat.subcategory.sub_category_name))

        
     
    },[])

    useEffect(() => {
        let timeout;
        if (showReminder) {
          timeout = setTimeout(() => {
            setShowReminder(false);
          }, 6000);
        }
        return () => clearTimeout(timeout);
      }, [showReminder]);
    useEffect(() => {
        let timeout;
        if (noBalance) {
          timeout = setTimeout(() => {
            setNoBalance(false);
          }, 5000);
        }
        return () => clearTimeout(timeout);
      }, [noBalance]);
    useEffect(() => {
        let timeout;
        if (paid) {
          timeout = setTimeout(() => {
            setPaid(false);
          }, 3000);
        }
        return () => clearTimeout(timeout);
      }, [paid]);
  return (
   <div className="sub-sub">
          {isLoading ?    <div className="spin-cont"><div class="spinner">
  <div class="rect1"></div>
  <div class="rect2"></div>
  <div class="rect3"></div>
  <div class="rect4"></div>
  <div class="rect5"></div>
</div></div>:null}
    <div className="container">
    {showReminder && (
        <div className="login-reminder">
          <p>يجب عليك تسجيل الدخول و شراء الكورس حتي تتمكن من مشاهدته</p>
          <button onClick={handleDismiss}>Dismiss</button>
        </div>
      )}
        <h1>{name}</h1>
        {data.map((inde)=>{
    return (
        <div className="card" key={inde.id}>
          
        <img src={"https://api2.sdcbm.com"+inde.image} onLoad={handleImageLoad} alt="" />
        <div className='price'>{inde.course_price}  :  سعر الكورس</div>
        <div className="title">{inde.course_name}</div>
        <Link  to={`/course/${inde.id}`}>تفاصيل الكورس</Link>
        <Link onClick={linkprevent} to={`/lesson/${inde.id}`}>استعراض الدورة التدريبة</Link>
        <button onClick={()=>buyCourse(inde.id)}>اشترك في الدورة الان</button>
    </div>
    )
})}
    </div>
   </div>
  )
}

export default SubSub

import './App.css';
import { Link, Route,Routes } from 'react-router-dom';
import Nav from './component/nav/Nav';
import Home from './component/home/Home';

import React, { useContext, useState ,useEffect ,createContext} from 'react';

import SubCat from './component/subCategories/SubCat';
import SubSub from './component/subSub category/SubSub';
import Lesson from './component/lessons/Lesson';
import Login from './component/login/Login';
import SignUp from './component/sign-up/SignUp';
import NotPaid from './component/notpaid/NotPaid';
import CourseDesc from './component/course-descreption/CourseDesc';
import MyCerti from './component/my-certificate/MyCerti';
import Profile from './component/profile/Profile';
import MyCourses from './component/my-courses/MyCourses';
import Help from './component/help/Help';
import Footer from './component/footer/Footer';
import Quiz from './component/quiz/Quiz';
import Syasa from './component/syasa/Syasa';



export const AppContext=createContext()

function App() {
  const [login,setLogin] =useState(false)
  const [token,setToken] =useState("")
  const [userName,setUserName] =useState("")
  const [balance,setBalance] =useState("")
  const [loader ,setLoader] =useState(false)
  const [fail,setFail]=useState(false)
  const [suc,setSuc]=useState(false)
 const [done,setDone]=useState(false)
 const [noBalance,setNoBalance]=useState(false)
 const [paid,setPaid]=useState(false)
 const [showMessage,setShowMessage]=useState(false)
 const [message,setMessage]=useState("")


 const messageError =(msg)=>{
  setMessage(msg)
  setShowMessage(true)
 }

useEffect(()=>{
  if (JSON.parse(sessionStorage.getItem("login"))){
    setLogin(true)
}
else{

  setLogin(false)
}



setToken(sessionStorage.getItem("token"))
setUserName(sessionStorage.getItem("userName"))
setBalance(sessionStorage.getItem("balance"))


},[login])
useEffect(() => {
  let timeout;
  if (suc) {
    timeout = setTimeout(() => {
      setSuc(false);
    }, 4000);
  }
  return () => clearTimeout(timeout);
}, [suc]);
useEffect(() => {
  let timeout;
  if (showMessage) {
    timeout = setTimeout(() => {
      setShowMessage(false);
    }, 3000);
  }
  return () => clearTimeout(timeout);
}, [showMessage]);
useEffect(() => {
  let timeout;
  if (fail) {
    timeout = setTimeout(() => {
      setFail(false);
    }, 4000);
  }
  return () => clearTimeout(timeout);
}, [fail]);

useEffect(() => {
  let timeout;
  if (done) {
    timeout = setTimeout(() => {
      setDone(false);
    }, 7000);
  }
  return () => clearTimeout(timeout);
}, [done]);
useEffect(()=>{
//   if (sessionStorage.getItem("token")){
    
// }


},[login])

// useEffect(() => {
//   const handleContextMenu = (event) => {
//     event.preventDefault(); // prevent default right-click behavior
//   };

//   document.addEventListener('contextmenu', handleContextMenu);

//   return () => {
//     document.removeEventListener('contextmenu', handleContextMenu);
//   };
// }, []);

// useEffect(() => {
//   const handleKeyDown = (event) => {
//     if (event.ctrlKey && event.shiftKey && event.code === 'KeyI') {
//       event.preventDefault();
//     }
//   };

//   document.addEventListener('keydown', handleKeyDown);

//   return () => {
//     document.removeEventListener('keydown', handleKeyDown);
//   };
// }, []);


// useEffect(() => {
//   const handleKeyDown = (event) => {
//     if (event.ctrlKey && event.code === 'KeyU') {
//       event.preventDefault();
//     }
//   };

//   document.addEventListener('keydown', handleKeyDown);

//   return () => {
//     document.removeEventListener('keydown', handleKeyDown);
//   };
// }, []);


//   useEffect(() => {
//     const handleKeyDown = (event) => {
//       if (event.ctrlKey && event.altKey && event.shiftKey && event.code === 'KeyR') {
//         event.preventDefault();
//       }
//     };

//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, []);


  return (
    <AppContext.Provider value={{messageError,showMessage,setShowMessage,paid,setPaid,noBalance,setNoBalance,done,setDone,userName,setUserName,balance,setBalance,login,setLogin ,token,setToken ,loader,setLoader ,suc,setSuc,fail,setFail}}>

    
 
      <div className="App">
        {suc ?
        <div className='suc'> تهانينا لقد اجتزت الاختبار اذهب الي شهاداتي لتجد شهادتك هناك </div>:null
        
      }
      {showMessage?<div className='message'>{message}</div>:null}
      {fail ? <div className='fail'> للاسف انت لم تجتز الاختبار حاول مشاهدة الدروس مره اخري و حاول بعد 15 يوم</div>
 : null}
{noBalance?  <div className='no-balance'> للاسف ليس لديك الرصيد الكافي لشراء هذا الكورس اذهب الي الاعدادات حتي يمكنك شحن رصيدك من هناك </div>
:null}
     
      {loader ?    <div className="spin-cont"><div className="spinner">
  <div className="rect1"></div>
  <div className="rect2"></div>
  <div className="rect3"></div>
  <div className="rect4"></div>
  <div className="rect5"></div>
</div></div>:null}
{done ? <div className='request-done'>تم ارسال الطلب بنجاح تواصل مع هذا الرقم لاتمام عملية الشراء 000956738580 </div>
 : null}
{paid ? <div className='paid'> تم الشراء</div>
 :null}
 

     <Nav />
     <Routes>
     <Route
       path="/"
       element={<Home />}
     />
   <Route path="subCat/:catId" element={<SubCat /> }/>
   <Route path="subSubCat/:id" element={<SubSub/> }/>
   <Route path="/login" element={<Login/> }/>
   <Route path="/not-paid" element={<NotPaid/> }/>
   <Route path="/sign-up" element={<SignUp/> }/>
   <Route path="/my-certi" element={<MyCerti/> }/>
   <Route path="/my-courses" element={<MyCourses/> }/>
   <Route path="/profile" element={<Profile/> }/>
   <Route path="/help" element={<Help/> }/>
   <Route path="/syasa" element={<Syasa/> }/>
   <Route path="lesson/:lessonId" element={<Lesson /> }/>
   <Route path="course/:courseId" element={<CourseDesc/> }/>
   <Route path="quiz/:quizId" element={<Quiz/> }/>

   </Routes>

<Footer />

  
  
 </div>
  
 </AppContext.Provider>
  );
}

export default App;

import React from 'react'
import './quiz.css'
import { useEffect ,useState} from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../../App'
import { useHistory } from 'react';
import { useNavigate } from 'react-router-dom'
const Quiz = () => {
    const param =useParams()
    const [quiz,setQuiz]=useState([])
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const {suc,setSuc}=useContext(AppContext)
    const {fail,setFail}=useContext(AppContext)
    const{loader,setLoader}=useContext(AppContext)
    const {token,setToken}=useContext(AppContext)
    const [remainingSeconds, setRemainingSeconds] = useState(null);
    const history = useNavigate();
    const {messageError}=useContext(AppContext)
    const [blocked,setBlocked]=useState(false)
    const [remainingDays,setRemainingDays]=useState(0)
  
   
    const [numCorrect, setNumCorrect] = useState(0);
    const handleSubmit = (event) => {
        event.preventDefault();
        setLoader(true)
        let numCorrect = 0;
        let numQues = 0;
        quiz.forEach((question) => {
          if (selectedAnswers[question.id] === question.answer) {
            numCorrect++;
            numQues++
          }
          else{
            numQues++
          
          }
        });
        setNumCorrect(numCorrect);
    
    
        if(numCorrect >= numQues/2){
          
          setLoader(false)
          fetch("https://api2.sdcbm.com/api/set/certi/"+param.quizId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(res=>res.json())
          .then(data=> {
           console.log(data)
            if(data.status == "stored successfully"){
                setSuc(true)
            }
            else{
messageError(data.status)
            }
        
        })
          
        
        } 
        else{
          setLoader(false)
          setFail(true)
          fetch("https://api2.sdcbm.com/api/blockUser/quiz/"+param.quizId,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          .then(res=>res.json())
          .then(data=>console.log(data))
          history("/")
          
         
        }
        
      };

      const handleAnswerSelect = (questionId, answer) => {
        setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
      };

   

    

    useEffect(() => {
        if (remainingSeconds > 0) {
          const intervalId = setInterval(() => {
            setRemainingSeconds(prevSeconds => prevSeconds - 1);
          }, 1000);
    
          return () => {
            clearInterval(intervalId);
          };
        }
      }, [remainingSeconds]);

      useEffect(() => {
        let token =sessionStorage.getItem("token")
        fetch("https://api2.sdcbm.com/api/show/quiz/" + param.quizId,{
            headers:{
                'Authorization': `Bearer ${token}`
            }
        })
          .then(res => res.json())
          .then(data => {
            if(data.status== "blocked"){
                setBlocked(true)
                setRemainingDays(data.daysRemaining)
            }else{

                setQuiz(data.quiz);
                setRemainingSeconds(data.quizTime.quiz_time);
               
           
           
                const timeoutId = setTimeout(() => {
                  history("/");
                }, data.quizTime.quiz_time *1000);
            
                return () => {
                  clearTimeout(timeoutId);
                };
            }
          });

     
     
      }, []);
    
    

    //   data.quizTime.quiz_time *1000
  return (
<div className="quiz">
    <div className="container">
        {blocked ? <div className='block-text'>انت موقوف من الاختبار عد بعد {remainingDays}يوم</div> :<form  onSubmit={handleSubmit}>
  <h2>اذا انتهيت من مشاهدة الكورس ابدا فالامتحان لتحصل علي الشهادة</h2>
  <div>
      {remainingSeconds === 0 ? (
        <p>انتهي الوقت</p>
      ) : (
        <p>سيتم غلق الامتحان بعد {remainingSeconds}</p>
      )}
    </div>
        {quiz&&quiz.map((question ,index) => (
          <div className='question' key={question.id}>
            <h5> {question.question} ؟ - {index+1}  </h5>
            <div className="answers">

            {question.ques_options.map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={selectedAnswers[question.id] === option}
                  onChange={() => handleAnswerSelect(question.id, option)}
                />
                {option}
              </label>
            ))}
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>}
       
    </div>
</div>
  )
}

export default Quiz

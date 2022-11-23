import './App.css';
import React,{useState,useEffect} from "react"
import Quizlet from "./components/Quizlet"
import Quiz from "./components/Quiz"

export default function App() {
  const [quiz,setQuiz] = React.useState(false)
  const [data,setData] = React.useState([])
  const [correctAnswers,setCorrectAnswers] = React.useState([])
  const [count,setCount] = React.useState(false)
  const [newQuiz,setNewQuiz] = React.useState(false)
  
  // set quiz state when button have been clicked.
  function changeState(){
    if (!quiz){

    }
    setQuiz(!quiz)
  }

  // Fetch api and set data state to the data we get from api. 
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=3&category=18&type=multiple`)
    .then((response) => response.json())
    .then((actualData) => setData(prevQuiz => {
      function shuffleArray(inc){
        for (let i = inc.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = inc[i];
          inc[i] = inc[j];
          inc[j] = temp;
        }
        return inc
      }
      const corrAns = []
      const arr = []
      for (let i = 0; i< actualData.results.length; i++){
        const answers = []
        answers.push(actualData.results[i]["correct_answer"])
        for (let x = 0 ; x < actualData.results[i]["incorrect_answers"].length ; x++){
          answers.push(actualData.results[i]["incorrect_answers"][x])
        }
        const newAnswers = shuffleArray(answers)
        const lastAnswers = []
        for (let i = 0 ; i < newAnswers.length; i++){
          lastAnswers.push({id:i, value:newAnswers[i], isHeld:"normal"})
        }
        arr.push(
          {
            id:i,
            question:actualData.results[i]["question"],
            answers:lastAnswers,
            selected:"empty"
          }

        )
        corrAns.push(actualData.results[i]["correct_answer"])
      }
      setCorrectAnswers(corrAns)
      return arr
    }))},[quiz])
  // Set data state to selected options and change selected option background
  function changeHeld(questId,ansId){
    setData(oldData => {
      const newData = []
      for (let i = 0; i < oldData.length; i++){
        if (oldData[i].id !== questId){
          newData.push(oldData[i])
        }
        else{
          const list = []
          
          for (let x = 0; x < oldData[i].answers.length; x++){
            if (oldData[i].answers[x].id !== ansId){
              if (oldData[i].answers[x].isHeld==="selected"){
                list.push(
                  {
                    id:x,
                    value:oldData[i].answers[x].value,
                    isHeld:"normal"
                  }
                )
              }
              else{
                list.push(oldData[i].answers[x])
              }
              
            }
            else{
              if (oldData[i].answers[x].isHeld==="normal"){
                list.push(
                  {
                    id:ansId,
                    value:oldData[i].answers[x].value,
                    isHeld:"selected"
                  }
                )
              }
              else{
                list.push(
                  {
                    id:ansId,
                    value:oldData[i].answers[x].value,
                    isHeld:"normal"
                  }
                )
              }
            }
        }
          newData.push({
            id:questId,
            question:oldData[i].question,
            answers:list,
            selected:ansId
          })
        }
      }
      return newData
    })
  }
  // Count correct number of answer you choose.
  function countCorrect(){
    if (newQuiz){
      setNewQuiz(!newQuiz)
    }
    else{
      setData(oldData => {
        let currCount = 0
        const newData = []
        for (let i = 0; i < oldData.length; i++){
          const newAnswer = []
          for (let x = 0; x < oldData[i].answers.length; x++){
            
            if (oldData[i].answers[x].value===correctAnswers[i]){
              
              newAnswer.push({
                id:x,
                value:oldData[i].answers[x].value,
                isHeld:"correct"
              })
              if (oldData[i].answers[oldData[i].selected].value===correctAnswers[i]){
                currCount ++;
              }}
            
            else if (oldData[i].answers[x].value !== correctAnswers[i] && oldData[i].selected === x){
              
              newAnswer.push({
                id:x,
                value:oldData[i].answers[x].value,
                isHeld:"wrong"
              })
              
            }
  
            else{
              newAnswer.push({
                id:x,
                value:oldData[i].answers[x].value,
                isHeld:"normal"
              })}
          }
        newData.push(
          {
            id:i,
            question:oldData[i].question,
            answers:newAnswer,
            selected:oldData[i].selected
          }
        )
        }
      setCount(currCount)
      setNewQuiz(!newQuiz)
      return newData
    })
    }
  }

  function createNewQuiz(){
    if (newQuiz){
      setQuiz(!quiz)
      setData([])
      setNewQuiz(!newQuiz)
      setCount(false)
    }
  }
  
  return (
    <div className="App">
      {
        quiz ? 
        <Quiz data={data} changeHeld = {changeHeld} countCorrect={countCorrect} newQuiz={newQuiz} createNewQuiz={createNewQuiz} count={count}/>:
        <Quizlet changeState={changeState}/>}
      
    </div>
  );
}


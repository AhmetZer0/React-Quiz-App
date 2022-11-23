import React from "react"


export default function Quizlet(props){
    return (
        <div className="Quizlet">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={props.changeState}>Start quiz</button>
        </div>

    )
    
}
import React from "react"

export default function Quiz(props){
    const styles = {
        correct:{
            background:"#94D7A2",
            color:"#293264",
            fontWeight:"bold"
        },
        wrong:{
            background: "#F8BCBC",
            color:"#4D5B9E"
        },
        selected:{
            background:"#D6DBF5"
        },
        normal:{
            background:"white",
            color:"#4D5B9E"
        }
    }
    const data = props.data.map(qA => 
        <div key={qA.id}>
            <h1 className="question" key={qA.id}>{qA.question}</h1>
            <div className="answers">
                {qA.answers.map(ans => <button 
                    onClick={() => props.changeHeld(qA.id,ans.id)}  
                    className="answer" 
                    style={ans.isHeld === "correct" ? styles.correct : 
                    ans.isHeld==="wrong" ? styles.wrong : 
                    ans.isHeld === "selected" ? styles.selected : styles.normal} 
                    key={ans.id}>
                        {ans.value}
                    </button>)}
            </div>
            <hr />
        </div>
    )
    const count = props.count
    return (
        <div>
            {data}
            <div><button className="checkAnswer" onClick={props.newQuiz ? props.createNewQuiz : props.countCorrect}>{props.newQuiz ? "New Quiz": "Check Answers"}</button></div>
            {typeof count === "number" && <h1>You scored {props.count}/{props.data.length} correct answers</h1>}
        </div>
    )
}
import React,{useState} from "react"


export default function Quizlet(props){
    const values = Array.from({length: 10}, (_, n) => n).map(value => <option key={value} value={value+1}>{value+1}</option>)
    const [selectedVal,setSelectedVal] = React.useState(1)
    function onChange(value){
        setSelectedVal(document.getElementById("selectionOfQ").value)
    }

    return (
        
        <div className="Quizlet">
            <h1>Quizzical</h1>
            <p id="question">How many questions do you want ? </p>
            <br />
            <br />
            <select name="values" id="selectionOfQ" onChange={onChange}>
                {values}
           </select>
            <br />
            <br />
            <br />
            <button onClick={() => props.changeState({selectedVal})}>Start quiz</button>
        </div>

    )
    
}
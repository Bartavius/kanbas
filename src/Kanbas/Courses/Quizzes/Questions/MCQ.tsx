import { useState } from "react";
import * as client from "../client";
import { useParams } from "react-router";
export default function MCQ({question, answers, attempt}: {question:any, answers:[any], attempt:any}) {


const [response, setResponse] = useState({});;
const updateAttempt = async () => {
    await client.updateAttempt(attempt._id, response);
}
const {qNum} = useParams();

return (
    <div>
        <div className="pb-5">
            <span className="float-end me-5 p-2 border">{question.point} pts</span>
            <span><h4>{question.questionText}</h4></span>
        </div>
        <hr />
        {answers.map( (a:any, i:number) =>(
            <div>
                <input key={a._id} id={a._id} type="radio" className="form-check d-inline me-3" name={question._id}
                onChange={(e) => {
                    const filt = attempt.responses.map((q: any) => (
                        q._id === qNum? {question: q.question, userResponse: e.target.value, isCorrect: a.isCorrect === true && e.target.checked} : q))
                    updateAttempt();
                    
                }}/>
                <label htmlFor="a._id">{i + 1}. {a.answerText}</label>
            </div>
        )
        )}

        {/* save user inputs also ; upload user response after every change lowkey */}
        
        </div>
)
}
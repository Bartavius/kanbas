import { useCallback, useEffect, useState } from "react";
import * as client from "./client";
import { useParams } from "react-router";
import CountdownTimer from "./CountdownTimer";
import { Link } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";

// navigation bar for the quiz questions when taking the quiz
export default function TakeNav({quiz} : {quiz:any}) {

    const [questions, setQuestions] = useState([]);
    const {qid} = useParams();

    // fetches the questions from the quiz
    const fetchQuestions = useCallback(async () => {
        if (!qid) return;
        const loadedQuestions = await client.getQuestionsFromQuiz(qid);
        setQuestions(loadedQuestions);
    }, [quiz])

    useEffect(() => {fetchQuestions()}, [fetchQuestions])

return (
    <div>
        <div className="row" style={{ maxHeight: "300px", height:"auto", overflowY: "auto", overflowX: "hidden" }}>

        
        <ul className="ms-3" style={{listStyleType: "none"}}>

            {/* 
            
            TODO:: 
            - if there is a response, add a checkmark 
            - if there is no response, add an empty dotted circle
            - if the question is currently being answered, add a filled circle

            */}

        {questions.map((q:any, i:number) => (
            <li key={q._id} className={`ms-4 ${qid === q._id ? "active" : ""}`}>
                <IoIosInformationCircleOutline className="me-2"/>
                <Link
              to={`/Kanbas/Courses/${quiz.course}/Quizzes/${q.quiz}/Take/${q._id}`}
            >
              {`Question ${i + 1}`}
            </Link>
            </li>
        ))}
</ul></div>
<div className="mt-3">
        <h5 className="row"><span>Time Remaining:</span></h5>
        <span className="row"><span>Attempt due: {new Date(quiz.due_date).toString()}</span></span>
        <h5 className="row"><CountdownTimer minutes={quiz.time_limit ?? 0} /> </h5>
    </div></div>
)
}
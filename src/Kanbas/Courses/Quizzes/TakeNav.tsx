import { useCallback, useEffect, useState } from "react";
import * as client from "./client";
import { useParams } from "react-router";

export default function TakeNav({quiz} : {quiz:any}) {

    const [questions, setQuestions] = useState([]);
    const {qid} = useParams();

    const fetchQuestions = useCallback(async () => {
        if (!qid) return;
        const loadedQuestions = await client.getQuestionsFromQuiz(qid);
        setQuestions(loadedQuestions);
    }, [quiz])

    useEffect(() => {fetchQuestions()}, [fetchQuestions])
return (
    <div>
        <ul className="nav nav-pills">

        
        {questions.map((q:any, i:number) => (
            <li key={q._id} className={`nav-item ${qid === q._id ? "active" : ""}`}>
                <a href={`#/Kanbas/Courses/${quiz.course}/Quizzes/${q.quiz}/Take/${q._id}`} className="nav-link">
                {`Question ${i + 1}`}</a>
            </li>
        ))}
</ul>
    </div>
)
}
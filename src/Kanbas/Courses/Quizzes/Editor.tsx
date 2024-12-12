import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailEdit from "./DetailEdit";
import QuestionEdit from "./QuestionEdit";
import * as client from "./client";

export default function QuizEditor() {

    const {qid} = useParams();
    const [quiz, setQuiz] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);
    
    
    const [win, setWin] = useState<string>("DETAIL");
    const fetchQuiz = useCallback(async () => {
        if (!qid) return;
        try {
          const loadedQuiz = await client.getQuiz(qid);
          setQuiz(loadedQuiz);
        } catch (error) {
          console.error(error);
        }
        setLoading(false);
      }, [qid]);
    
      useEffect(() => {
        fetchQuiz();
        console.log(quiz);
      }, [fetchQuiz]);

    return (
    <div className="container">
        {loading ? <h5>...Loading</h5> : <div> 
        <h2>Quiz editor</h2>
            <button className={`btn ${win === "DETAIL" && "active"}`} onClick={() => setWin("DETAIL")}> Details </button>
            <button className={`btn ${win === "QUESTION" && "active"}`} onClick={() => setWin("QUESTION")}> Questions </button>
            {win === "DETAIL" && <DetailEdit quiz={quiz}/>}
            {win === "QUESTION" && <QuestionEdit quiz={quiz}/>}</div>
        }
        </div>
    )
}
import { useParams } from "react-router"
import * as client from "./client";
import { useCallback, useEffect, useState } from "react";
import MCQ from "./Questions/MCQ";
import Blank from "./Questions/Blank";
import TF from "./Questions/TF";
import TakeNav from "./TakeNav";
import { useSelector } from "react-redux";

export default function TakeQuestion() {
    const {qid, qNum} = useParams();
    const [question, setQuestion] = useState<any>({});
    const [quiz, setQuiz] = useState<any>({});
    const [answers, setAnswers] = useState<any>([]);

    const {currentUser} = useSelector((state:any) => state.accountReducer);
    const [attempt, setAttempt] = useState<any>({})


    const fetchQuestion = useCallback(async () => {
        if (!qNum) return;
        const loadedResponse = await client.getQuestion(qNum);
        setQuestion(loadedResponse);
    }, [qNum, qid])

    const fetchQuiz = useCallback(async () => {
        if (!qid) return;
        const loadedResponse = await client.getQuiz(qid);
        setQuiz(loadedResponse);
        const att = await client.findAttempt(currentUser._id, loadedResponse._id);
        setAttempt(att);
    }, [qid, qNum])

    const fetchAnswers = useCallback(async () => {
        if (!qNum) return;
        const loadedResponse = await client.getAnswersFromQuestion(qNum);
        setAnswers(loadedResponse);
    }, [qid, qNum])


    useEffect(() => {
        fetchQuestion();
        fetchQuiz(); fetchAnswers();
    }, [fetchQuestion, fetchQuiz, fetchAnswers])

    const renderQuestion = () => {
        if (question.questionType === "MC") {
            return (<MCQ question={question} answers={answers} attempt={attempt}/>)
        } else if (question.questionType === "FILLBLANK") {
            return (<Blank question={question} answers={answers}/>)
        } else if (question.questionType === "TRUE-FALSE") {
            return (<TF question={question} answers={answers}/>)
        }
    }



    return (
        <div>
            <div className="row">
                <div className="col-9">
                    <div>
                    {renderQuestion()}
                    </div>
                </div>
                <div className="col-3">
                    <TakeNav quiz={quiz}/>
                </div>
            </div>
            
        </div>
    )
}
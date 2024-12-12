import { useParams } from "react-router"
import * as client from "./client";
import { useCallback, useEffect, useState } from "react";
import TakeNav from "./TakeNav";

export default function Take() {
    const {qid} = useParams();
    const [quiz, setQuiz] = useState<any>({});
    const fetchQuiz = useCallback(async () => {
        if (!qid) return;
        const loadedQuiz=await client.getQuiz(qid);
        setQuiz(loadedQuiz);
        console.log(loadedQuiz)
    },[qid])

    useEffect(
        () => {
            fetchQuiz()
        }, [fetchQuiz]
    )


    const [access, setAccess] = useState<string>("");

    return (
        <div>
            {quiz.access_code && quiz.access_code !== access ? 
            <div className="d-flex justify-content-center">
                <label htmlFor=""><h5>Access Code:</h5></label>
                <input type="text" className="form-control w-50" onChange={(e) => setAccess(e.target.value)} />
            </div> 
            
            : 
            <div>
                {
                    (quiz.one_question_at_a_time) === true ? 
                    <div>
                        <div className="row">
                            <div className="col-9">
                            {/**questions right here */}
                            </div>
                            <div className="col-3">
                                <TakeNav quiz={quiz}/>
                            </div>
                            
                        </div>
                    </div>
                    :
                    <div> one Pager{/* put everything all in one page */}</div>
                }

                
            </div>
            
            
            }
        </div>
    )
}
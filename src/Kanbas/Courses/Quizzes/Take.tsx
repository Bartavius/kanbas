import { useParams } from "react-router"
import * as client from "./client";
import { useCallback, useEffect, useState } from "react";
import TakeNav from "./TakeNav";
import { useSelector } from "react-redux";

export default function Take() {
    const {qid, qNum} = useParams();
    const {currentUser} = useSelector((state:any) => state.accountReducer);
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


    const upload = async () => {
        await client.addResponse(currentUser._id, quiz._id)
    }


    const [access, setAccess] = useState<string>("");

    return (
        <div>
            {quiz.access_code && quiz.access_code !== access ? 
            <div className="d-flex justify-content-center">
                <label htmlFor=""><h5>Access Code:</h5></label>
                <input type="text" className="form-control w-50" onChange={(e) => {setAccess(e.target.value); upload()}} />
            </div> 
            
            : 
            
            <div>
                
                    <div>
                        <div className="row">
                            <div className="col-9">


                                


                            </div>
                            <div className="col-3">
                                <TakeNav quiz={quiz}/>
                            </div>
                            
                        </div>
                    </div>
                    
                

                
            </div>
            
            
            }
        </div>
    )
}
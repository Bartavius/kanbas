import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";
import QuestionEditHeader from "./QuestionEditHeader";

export default function BlankEditor({ question , updateQuestion }: { question: any , updateQuestion: (quesId:string, quesNew: any) => (void)}) {
  const [editQuestion, setEditQuestion] = useState<any>(question);
  const [answers, setAnswers] = useState<any>([]);
  const [reload, setReload] = useState<boolean>(false);
  // most likely will need to import edit methods and the likes also

  const fetchAnswers = useCallback(async () => {
    const answers = await client.getAnswersFromQuestion(question._id);
    setAnswers(answers);
  }, [reload, question])

  const addAnswer = async () => {
    const newAnswer = await client.addAnswer(question._id, question.quiz);
    setAnswers([...answers, newAnswer]);
  }

  const updateAnswers = async () => {
    for (const a of answers) {
        await client.updateAnswer(a._id, a);
    }
}
  

  useEffect( () => {
fetchAnswers()
  }, [fetchAnswers])


  return (
    <div className="container">
      <div className="wd-question-edit-header">
        <QuestionEditHeader editQuestion={question} setEditQuestion={setEditQuestion}/>

      </div>

      <div className="wd-quiz-question-edit-answer-section mt-5">
        <div>
            <h6>
            <b> Answers: </b>
            </h6>
            <button className="btn btn-danger" onClick={() => addAnswer()}><FaPlus/> Answer </button>
        </div>
        <div>
            {answers.map(
                (ans: any, index: number) => (
                    <div className="row">

                    

                    <div className="col-3">
                        <span>{index + 1}. {`${ans.isCorrect && "(Correct Answer)"}`}</span>
                    </div>
                    <div className="col-9">
                        <input type="text" className="form-control w-50" defaultValue={ans.answerText} 
                        onChange={ (e) => {
                            setAnswers(answers.map((a:any) => (a._id === ans._id) ? {...a, answerText: e.target.value, isCorrect: true} : a))
                        }}
                        />
                

                    </div>
                    
                    </div>
                )
            )}
            <hr />
            <div>
                <span>Alternatives:</span>
                {answers.alternativeAnswers.map((a: string) => (
                    <div className="row">
                        {/* alternatives */}
                    </div>
                ))}
            </div>
        </div>

        
      </div>
      {/* 
      need space for alternative / acceptable answers , display them also
      button to add answers
      button next to answers to mark as correct/incorrect
      save / cancel
      */}
      <hr />
      <div>
        <button className="btn btn-danger me-3" onClick={() => {
            updateQuestion(question._id, editQuestion);
            updateAnswers();
            }}>

            Save
        </button>
        <button className="btn btn-secondary me-3" >
            Cancel
        </button>
      </div>
    </div>
  );
}

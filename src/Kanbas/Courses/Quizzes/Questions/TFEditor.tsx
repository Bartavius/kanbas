import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import * as client from "../client";
import QuestionEditHeader from "./QuestionEditHeader";

export default function TFE({ question , updateQuestion }: { question: any , updateQuestion: (quesId:string, quesNew: any) => (void)}) {
  const [editQuestion, setEditQuestion] = useState<any>(question);
  const [answers, setAnswers] = useState<any>([
    {left: true, quiz: question.quiz, question: question._id, answerText: "TRUE", isCorrect: true, alternativeAnswers: []},
    {left: true, quiz: question.quiz, question: question._id, answerText: "FALSE", isCorrect: false, alternativeAnswers: []}]);
  const [reload, setReload] = useState<boolean>(false);
  // most likely will need to import edit methods and the likes also

  const fetchAnswers = useCallback(async () => {
    const answers = await client.getAnswersFromQuestion(question._id);
    for (const a of answers) {
        if (a.answerText !== "TRUE" && a.answerText !== "FALSE") {
            return;
        }
    }
    if (answers.length !== 0) {
        setAnswers(answers);
    }
  }, [reload, question])

  const updateAnswers = async () => {
    if (answers[0].left || answers[1].left) {
        const n1 = await client.addAnswer(question._id, question.quiz)
        const n2 = await client.addAnswer(question._id, question.quiz)
        await client.updateAnswer(n1._id, answers[0]);
        await client.updateAnswer(n2._id, answers[1]);
    }
    else {
    for (const a of answers) {
        await client.updateAnswer(a._id, a);
    }}
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
        </div>
        <div>
            <span className="row">
                {answers[0].answerText}  ------- button -------
            </span>
            <span className="row">
                {answers[1].answerText}
            </span>
            <button  className={`btn ${answers[0].isCorrect ? "btn-success" : "btn-danger"} float-end`}
                    onClick={ () => {
                        setAnswers(answers.map((a:any) => ({...a, isCorrect: !a.isCorrect} )))
                    }

                    }> {`${answers[0].isCorrect ? "Correct" : "Incorrect"}`} </button>
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

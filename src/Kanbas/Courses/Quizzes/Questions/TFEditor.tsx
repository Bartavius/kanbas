import { useCallback, useEffect, useState } from "react";
import * as client from "../client";
import QuestionEditHeader from "./QuestionEditHeader";

export default function TFE({
  question,
  setQuestion,
  updateQuestion,
  setEditing
}: {
  question: any;
  setQuestion: (question: any) => void;
  updateQuestion: (quesId: string, quesNew: any) => void;
  setEditing: (editing: boolean) => void;
}) {

  const [answers, setAnswers] = useState<any>([
    {
      _id: 0,
      answerText: "TRUE",
      isCorrect: true,
      display: true,
    }, 
    {
      _id: 1,
      answerText: "FALSE",
      isCorrect: false,
      display: true,
    },
  ]);

  return (
    <div className="container">
      <div className="wd-quiz-question-edit-answer-section mt-5">
        <div>
          <h6>
            <b> Answers: </b>
          </h6>
        </div>
        <form className="wd-quiz-editor-input-box">
          <div className="mb-3 row">
            <span className="col-3">1. {`${answers[0].isCorrect ? "(Correct)": "(Incorrect)"}`}</span>
            <span className="col-7">True</span>
            <button
              className={`btn float-end col-2 ${
                answers[0].isCorrect ? "btn-success" : "btn-danger"
              }`}
              onClick={() => {
                setAnswers(
                  answers.map((a: any) => ({ ...a, isCorrect: !a.isCorrect }))
                ); {/* woudl this be danger prone to client side editing? */}
              }}
            >
              {`${answers[0].isCorrect ? "Correct" : "Incorrect"}`}{" "}
            </button>
          </div>

          <div className="mb-3 row">
            <span className="col-3">2. {`${answers[1].isCorrect ? "(Correct)" : "(Incorrect)"}`}</span>
            <span className="col-7"> False </span>
            <button
              className={`btn float-end col-2 ${
                answers[1].isCorrect ? "btn-success" : "btn-danger"
              }`}
              onClick={() => {
                setAnswers(
                  answers.map((a: any) => ({ ...a, isCorrect: !a.isCorrect }))
                );
              }}
            >
              {`${answers[1].isCorrect ? "Correct" : "Incorrect"}`}{" "}
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <button
          className="btn btn-danger me-3"
          onClick={() => {
            console.log(`Answers Update: ${JSON.stringify(answers)}`)
            updateQuestion(question._id, {...question, answers: answers});
          }}
        >
          Save
        </button>
        <button className="btn btn-secondary me-3" onClick={() =>setEditing(false)}>Cancel</button>
      </div>
    </div>
  );
}

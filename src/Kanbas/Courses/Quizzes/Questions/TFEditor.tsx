import { useState } from "react";

export default function TFEditor({
  question,
  updateQuestion,
  setEditing,
}: {
  question: any;
  updateQuestion: (quesId: string, quesNew: any) => void;
  setEditing: (editing: boolean) => void;
}) {
  // to keep question formats consistent, TRUE will always be answer 1 and FALSE will always be answer 2 (swapping them around is horrible...
  // speaking from experience)
  const [answers, setAnswers] = useState<any>([
    {
      _id: 0,
      answerText: "TRUE",
      isCorrect:
      question.answers[0] && question.answers[0].answerText === "TRUE"
          ? question.answers[0].isCorrect
          : true,
      display: true,
    },
    {
      _id: 1,
      answerText: "FALSE",
      isCorrect:
      question.answers[1] && question.answers[1].answerText === "FALSE"
          ? question.answers[1].isCorrect
          : false,
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
            <span className="col-3">
              1. {`${answers[0].isCorrect ? "(Correct)" : ""}`}
            </span>
            <span className="col-7"> TRUE </span>
            <span className="col-2">
              <button
                className={`btn float-end ${
                  answers[0].isCorrect ? "btn-success" : "btn-danger"
                }`}
                onClick={() => {
                  setAnswers(
                    answers.map((a: any) => ({ ...a, isCorrect: !a.isCorrect }))
                  );
                }}
              >
                {`${answers[0].isCorrect ? "Correct" : "Incorrect"}`}
              </button>
            </span>
          </div>

          <div className="mb-3 row">
            <span className="col-3">
              2. {`${answers[1].isCorrect ? "(Correct)" : ""}`}
            </span>
            <span className="col-7"> FALSE </span>
            <span className="col-2">
              <button
                className={`btn float-end ${
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
            </span>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <button
          className="btn btn-danger me-3"
          onClick={() => {
            updateQuestion(question._id, { ...question, answers: answers });
          }}
        >
          Save
        </button>
        <button
          className="btn btn-secondary me-3"
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

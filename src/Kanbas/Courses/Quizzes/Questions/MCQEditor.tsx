import { useCallback, useEffect, useState } from "react";
import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import QuestionEditHeader from "./QuestionEditHeader";

export default function MCQEditor({
  question,
  updateQuestion,
  setEditing,
}: {
  question: any;
  updateQuestion: (quesId: string, quesNew: any) => void;
  setEditing: (editing: boolean) => void;
}) {
  const [editQuestion, setEditQuestion] = useState<any>(question);
  const addAnswer = () => {
    setEditQuestion({...editQuestion, answer: editQuestion.answers.push({
      _id: `${editQuestion.answers.length}`,
      answerText: `New Answer ${editQuestion.answers.length}`,
      isCorrect: true,
      display: true,
    })})
  };

  return (
    <div className="container">
      <div className="wd-question-edit-header">
        <QuestionEditHeader
          editQuestion={question}
          setEditQuestion={setEditQuestion}
        />
      </div>

      <div className="wd-quiz-question-edit-answer-section mt-5">
        <div>
          <h6>
            <b> Answers: </b>
          </h6>
          <button className="btn btn-danger" onClick={addAnswer}>
            <FaPlus /> Answer{" "}
          </button>
        </div>
        <div className="wd-answer-editor-answers-list mt-3">
          {editQuestion.answers.map((ans: any, index: number) => (
            <div className="row">
              <div className="wd-answer-editor-answer-label col-3">
                <span>
                  {index + 1}. {`${ans.isCorrect && "(Correct Answer)"}`}
                </span>
              </div>
              <div className="wd-answer-editor-input-box col-7">
                <input
                  type="text"
                  className="form-control w-50"
                  defaultValue={ans.answerText}
                  onChange={(e) => {
                    setEditQuestion({
                      ...editQuestion,
                      answers: editQuestion.answers.map((a: any) =>
                        a._id === `${index}`
                          ? { ...a, answerText: e.target.value }
                          : a
                      ),
                    });
                  }}
                />
              </div>
              <div className="wd-answer-editor-button-controls col-2">
                <button
                  className={`btn ${
                    ans.isCorrect ? "btn-success" : "btn-danger"
                  } float-end mt-2 me-2 wd-answer-editor-answer-correct-button`}
                  onClick={() => {
                    setEditQuestion({
                      ...editQuestion,
                      answers: editQuestion.answers.map((a: any) =>
                        a._id === `${index}`
                          ? { ...a, isCorrect: !a.isCorrect }
                          : a
                      ),
                    });
                  }}
                >
                  {" "}
                  {`${ans.isCorrect ? "Correct" : "Incorrect"}`}
                </button>
                <button className={`wd-answer-editor-answer-display-button btn mt-2 me-2 float-end ${ans.display ? "btn-warning" : "btn-secondary"}`}
                onClick={ () => {
                  setEditQuestion({...editQuestion, answers: editQuestion.answers.map((a: any) =>
                    a._id === `${index}`
                      ? { ...a, display: !a.display }
                      : a
                  )})
                }}
                >
                  {ans.display ? 
                  <div>
                    <FaRegEye className="me-2"/>
                    <span> Displayed </span>
                  </div> : 
                  <div>
                    <FaRegEyeSlash className="me-2" />
                    <span> Not Displayed </span>
                  </div>}
                  

                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr />
      <div>
        <button
          className="btn btn-danger me-3"
          onClick={() => {
            updateQuestion(question._id, editQuestion);
          }}
        >
          Save
        </button>
        <button className="btn btn-secondary me-3" onClick={() => {
          setEditing(false);
        }}>Cancel</button>
      </div>
    </div>
  );
}

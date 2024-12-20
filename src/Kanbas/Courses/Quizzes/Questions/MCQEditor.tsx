import { FaPlus, FaRegEye, FaRegEyeSlash, FaTrash } from "react-icons/fa";

export default function MCQEditor({
  question,
  setQuestion,
  updateQuestion,
  setEditing,
  addAnswer,
  deleteAnswer,
  toggleAnswer,
}: {
  question: any;
  setQuestion: (newQuestion: any) => void;
  updateQuestion: (quesId: string, quesNew: any) => void;
  setEditing: (editing: boolean) => void;
  addAnswer: () => void;
  deleteAnswer: (index: Number) => void;
  toggleAnswer: (index: number) => void;
}) {

  console.log(question);
  console.log(question.answers)

  return (
    <div className="container">
      <div className="wd-quiz-question-edit-answer-section mt-5">
        <div>
          <h6>
            <b> Answers: </b>
          </h6>
        </div>
        <div className="wd-answer-editor-answers-list mt-3">
          {question.answers.map((ans: any, index: number) => (
            <div className="row">
              <div className="wd-answer-editor-answer-label col-3">
                <span>
                  {index + 1}. {`${ans.isCorrect ? "(Correct Answer)" : ""}`}
                </span>
              </div>
              <div className="wd-answer-editor-input-box col-7">
                <input
                  type="text"
                  className="form-control w-50"
                  defaultValue={ans.answerText}
                  onChange={(e) => {setQuestion({
                    ...question,
                    answers: question.answers.map((a: any) =>
                      a._id === `${index}` ? { ...a, answerText: e.target.value } : a
                    ),
                  })}}
                />
              </div>
              <div className="wd-answer-editor-button-controls col-2 d-flex justify-content-center">
                <button
                  className={`btn ${
                    ans.isCorrect ? "btn-success" : "btn-danger"
                  } float-end mt-2 me-3 wd-answer-editor-answer-correct-button`}
                  onClick={() => toggleAnswer(index)}
                >
                  {" "}
                  {`${ans.isCorrect ? "Correct" : "Incorrect"}`}
                </button>
                <FaTrash
                  className="float-end fs-4 text-danger mt-3"
                  onClick={() => deleteAnswer(index)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="btn btn-danger mt-2" onClick={addAnswer}>
        <FaPlus /> Answer{" "}
      </button>
      <hr />
      <div>
        <button
          className="btn btn-danger me-3"
          onClick={() => {
            updateQuestion(question._id, question);
          }}
        >
          Save
        </button>
        <button
          className="btn btn-secondary me-3"
          onClick={() => {
            setEditing(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

import { FaPlus, FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function MCQEditor({
  question,
  setQuestion,
  updateQuestion,
  setEditing,
  addAnswer, // delete answer ?
}: {
  question: any;
  setQuestion: (newQues: any) => void;
  updateQuestion: (quesId: string, quesNew: any) => void;
  setEditing: (editing: boolean) => void;
  addAnswer: () => void;
}) {
  const toggleDisplay = (index: Number) => {
    setQuestion({
      ...question,
      answers: question.answers.map((a: any) =>
        a._id === `${index}` ? { ...a, display: !a.display } : a
      ),
    });
  };
  return (
    <div className="container">
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
                  onChange={(e) => {
                    setQuestion({
                      ...question,
                      answers: question.answers.map((a: any) =>
                        a._id === `${index}`
                          ? { ...a, answerText: e.target.value }
                          : a
                      ),
                    });
                  }}
                />
              </div>
              <div className="wd-answer-editor-button-controls col-2 d-flex justify-content-center">
                <button
                  className={`btn ${
                    ans.isCorrect ? "btn-success" : "btn-danger"
                  } float-end mt-2 me-3 wd-answer-editor-answer-correct-button`}
                  onClick={() => {
                    setQuestion({
                      ...question,
                      answers: question.answers.map((a: any) =>
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
                <div className="wd-answer-editor-answer-display-button mt-2 float-end fs-4">
                  {ans.display ? (
                    <FaRegEye
                      className="me-2"
                      onClick={() => toggleDisplay(index)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className="me-2"
                      onClick={() => toggleDisplay(index)}
                    />
                  )}
                </div>
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

// this is set to the wrong default. When  it goes from TF -> TF (editMode) the isCorrect is always the same in TRUE = true, FALSE = false

// Remove "display" from MCQ. display options should only be available in fill in the blanks.

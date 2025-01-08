import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";

export default function DetailEdit({ quiz }: { quiz: any }) {
  const [editQuiz, setEditQuiz] = useState<any>(quiz);
  const { cid, qid } = useParams();
  const navigate = useNavigate();

  const saveQuiz = async () => {
    await client.updateQuiz(quiz._id, editQuiz);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)
    
  };

  const saveAndPublishQuiz = async () => {
    await client.updateQuiz(quiz._id, {...editQuiz, published: true});
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
    
  };

  return (
    <div className="wd-quiz-detail-edit-screen mt-3">
      <div className="wd-quiz-detail-text-forms">
        <input
          type="text"
          placeholder="Quiz Title"
          className="form-control w-50"
          value={editQuiz.title}
          onChange={(e) => setEditQuiz({ ...editQuiz, title: e.target.value })}
        />
        <h6 className="mt-2">
          {" "}
          <label htmlFor="wd-quiz-description-editor">Quiz Instructions:</label>
        </h6>
        <textarea
          name="Quiz Description"
          id="wd-quiz-description-editor"
          className="form-control w-50"
          rows={5}
          value={editQuiz.description}
          onChange={(e) =>
            setEditQuiz({ ...editQuiz, description: e.target.value })
          }
        />
      </div>
      <div className="wd-quiz-access-code row mt-3">
        <h6 className="col-3 d-flex justify-content-end">
          <label htmlFor="wd-quiz-access-code">
            <b className="float-right"> Access Code </b>
          </label>
        </h6>
        <div className="col-3">
          <input
            type="text"
            id="wd-quiz-access-code"
            value={editQuiz.access_code}
            className="form-control"
            onChange={(e) =>
              setEditQuiz({ ...editQuiz, access_code: e.target.value })
            }
          />
        </div>
      </div>
      <div className="wd-quiz-detail-edit-selectors mt-3">
        <div className="row mb-3">
          <h6 className="col-3 d-flex justify-content-end">
            <label htmlFor="wd-select-edit-quiz-type">
              <b className="float-right"> Quiz Type </b>
            </label>
          </h6>
          <div className="col-3 ">
            <select
              id="wd-select-edit-quiz-type"
              className="wd-select-quiz-type form-select"
              value={editQuiz.quizType}
              onChange={(e) =>
                setEditQuiz({ ...editQuiz, quizType: e.target.value })
              }
            >
              <option value="GRADED_QUIZ"> Graded Quiz </option>
              <option value="PRACTICE_QUIZ"> Practice Quiz </option>
              <option value="GRADED_SURVEY"> Graded Survey </option>
              <option value="UNGRADED_SURVEY"> Ungraded Survey </option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <h6 className="col-3 d-flex justify-content-end">
            <label htmlFor="wd-select-edit-quiz-group">
              <b className="float-right"> Assignment Group </b>
            </label>
          </h6>
          <div className="col-3">
            <select
              id="wd-select-edit-quiz-group"
              className="form-select wd-select-quiz-group"
              value={editQuiz.assignment_group}
              onChange={(e) =>
                setEditQuiz({ ...editQuiz, assignment_group: e.target.value })
              }
            >
              <option value="ASSIGNMENT"> ASSIGNMENT </option>
              <option value="QUIZ"> QUIZ </option>
              <option value="EXAM"> EXAM </option>
              <option value="PROJECT"> PROJECT </option>
            </select>
          </div>
        </div>
      </div>
      <div className="wd-quiz-detail-edit-radios mt-4">
        <div className="row">
          <span className="col-3"></span>
          <div className="col-3">
            <h6>
              <b>Options</b>
            </h6>

            <div className="row">
              <div>
                <input
                  id="wd-quiz-edit-shuffle-answers"
                  type="checkbox"
                  className="form-check-input"
                  checked={editQuiz.shuffle}
                  onChange={(e) =>
                    setEditQuiz({ ...editQuiz, shuffle: e.target.checked })
                  }
                />
                <label
                  htmlFor="wd-quiz-edit-shuffle-answers"
                  className="ms-3 form-check-label"
                >
                  <h6> Shuffle Answers</h6>
                </label>
              </div>
            </div>
            <div className="row mt-3">
              <div className="">
                <label
                  htmlFor="wd-quiz-edit-time-limit"
                  className="ms-3 form-check-label"
                >
                  <h6> Time Limit </h6>{" "}
                  {/* if have time later, unchecked time limit = inf time */}
                </label>
                <input
                  id="wd-quiz-edit-time-limit"
                  type="number"
                  className="form-control row"
                  value={editQuiz.time_limit}
                  onChange={(e) =>
                    setEditQuiz({ ...editQuiz, time_limit: e.target.value })
                  } // have to force positive num later
                />
                <h6> Minutes </h6>
              </div>
            </div>

            <div className="row mb-3">
              <div>
                <input
                  id="wd-quiz-allow-multiple-attempts"
                  type="checkbox"
                  className="form-check-input"
                  checked={editQuiz.multiple_attempts}
                  onChange={(e) => {
                    setEditQuiz({
                      ...editQuiz,
                      multiple_attempts: e.target.checked,
                    });
                    if (!e.target.checked) {
                      setEditQuiz({
                        ...editQuiz,
                        multiple_attempts: e.target.checked,
                        attempts: 1,
                      });
                    }
                  }}
                />
                <label
                  htmlFor="wd-quiz-allow-multiple-attempts"
                  className="form-check-label ms-3"
                >
                  {" "}
                  Allow Multiple Attempts{" "}
                </label>
              </div>{" "}
              {/* have to prevent neg number here  ALSO FIX THAT IT POPS UP*/}
              {editQuiz.multiple_attempts && (
                <input
                  type="number"
                  className="form-control col"
                  value={editQuiz.attempts}
                  onChange={(e) =>
                    setEditQuiz({ ...editQuiz, attempts: e.target.value })
                  }
                />
              )}
              <div className="row">
                <label htmlFor="wd-quiz-show-answer" className="mt-3">
                  {" "}
                  Show Correct Answers{" "}
                </label>

                <select
                  id="wd-quiz-show-answer"
                  className="form-select wd-quiz-show-answer-group"
                  value={editQuiz.show_correct_answers}
                  onChange={(e) =>
                    setEditQuiz({
                      ...editQuiz,
                      show_correct_answers: e.target.value,
                    })
                  }
                >
                  <option value="IMMEDIATELY"> Immediately </option>
                  <option value="LATER"> Later </option>
                </select>
              </div>
              <div className="row mt-3">
                <div>
                  <input
                    id="wd-quiz-one-question"
                    type="checkbox"
                    className="form-check-input"
                    checked={editQuiz.one_question_at_a_time}
                    onChange={(e) =>
                      setEditQuiz({
                        ...editQuiz,
                        one_question_at_a_time: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="wd-quiz-one-question" className="ms-3">
                    One Question At a Time
                  </label>
                </div>
              </div>
              <div className="row mt-2">
                <div>
                  <input
                    id="wd-quiz-webcam"
                    type="checkbox"
                    className="form-check-input"
                    checked={editQuiz.webcam_required}
                    onChange={(e) =>
                      setEditQuiz({
                        ...editQuiz,
                        webcam_required: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="wd-quiz-webcam" className="ms-3">
                    Webcam Required
                  </label>
                </div>
              </div>
              <div className="row mt-2">
                <div>
                  <input
                    id="wd-quiz-lock-question"
                    type="checkbox"
                    className="form-check-input"
                    checked={editQuiz.lock_questions_after_answering}
                    onChange={(e) =>
                      setEditQuiz({
                        ...editQuiz,
                        lock_questions_after_answering: e.target.checked,
                      })
                    }
                  />
                  <label htmlFor="wd-quiz-lock-question" className="ms-3">
                    Lock Questions After Answering
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="quiz-edit-boxes">
        <div className="row">
          <h6 className="col-3 d-flex justify-content-end">
            <b> Assign </b>
          </h6>

          <div className="col-3 border">
            <b className="mt-5 ml-5 mb-5">Assign To</b>
            <div className="container border rounded-2 p-2 mb-4">
              <button className="btn btn-secondary" disabled>
                Everyone <RxCross1 />{" "}
              </button>
            </div>

            <label htmlFor="wd-quiz-due-date d-block">
              {" "}
              <b> Due </b>{" "}
            </label>
            <input
              id="wd-quiz-due-date"
              type="date"
              className="form-control mb-4"
              defaultValue={editQuiz.due_date.toString().split('T')[0]}
              onChange={(e) =>
                setEditQuiz({ ...editQuiz, due_date: e.target.value })
              }
            />

            <label htmlFor="wd-quiz-available-from d-block">
              {" "}
              <b> Available From </b>{" "}
            </label>
            <input
              id="wd-quiz-available-from"
              type="date"
              className="form-control mb-4"
              defaultValue={editQuiz.available_from.toString().split('T')[0]}
              onChange={(e) =>
                setEditQuiz({ ...editQuiz, available_from: e.target.value })
              }
            />

            <label htmlFor="wd-quiz-available-until d-block">
              {" "}
              <b> Until </b>{" "}
            </label>
            <input
              id="wd-quiz-available-until"
              type="date"
              className="form-control mb-4"
              defaultValue={editQuiz.available_until.toString().split('T')[0]}
              onChange={(e) =>
                setEditQuiz({ ...editQuiz, available_until: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <hr />
      <button
        className="float-end btn btn-danger me-1"
        onClick={() => {
          saveAndPublishQuiz();
        }}
      >
        {" "}
        Save and Publish{" "}
      </button>
      <button
        className="float-end btn btn-primary me-1"
        onClick={() => {
          saveQuiz();
        }}
      >
        {" "}
        Save{" "}
      </button>
      <button
        className="float-end btn btn-secondary me-1"
        onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes`)}
      >
        {" "}
        Cancel{" "}
      </button>
      
    </div>
  );
}

/* 
. Title (input text)
. Description (WYSIWYG)
Assigned to - Ignore
. Quiz Type - Graded Quiz (default), Practice Quiz, Graded Survey, Ungraded Survey
Points - the sum of the points of all questions in the quiz
. Assignment Group - Quizzes (default), Exams, Assignments, Project
. Shuffle Answers - Yes (default) / No
. Time Limit - 20 Minutes (default)
. Multiple Attempts - No (default) / Yes
. Show Correct Answers - If and when correct answers are shown to students
. Access Code - Passcode students need to type to access the quiz. Default is blank
. One Question at a Time - Yes (default) / No
. Webcam Required - No (default) / Yes
. Lock Questions After Answering - No (default) / Yes
. Due date - date the assignment is due
. Available date - date assignment is available
. Until date - date assignment is available until
Clicking Save saves changes and navigates to Quiz Details screen
Clicking Save and Publish saves & publishes quiz and navigates to Quiz List screen
Clicking Cancel doesn’t save and navigates ton Quiz List screen


*/

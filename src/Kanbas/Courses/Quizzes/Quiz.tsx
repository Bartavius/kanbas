import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import * as client from "./client";

export default function Quiz() {
  // for student just show title and start button (maybe with access code)
  // for faculty/admin display

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const fetchQuiz = useCallback(async () => {
    if (!qid) return;
    try {
      const loadedQuiz = await client.getQuiz(qid);
      setQuiz(loadedQuiz);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }, [qid]);

  useEffect(() => {
    fetchQuiz();
    console.log(quiz);
  }, [fetchQuiz]);

  //disable start if max attempts reached

  return (
    <div className="wd-quiz-details-screen">
      {loading ? (
        <h4>...Loading</h4>
      ) : (
        <div>
            <div className="wd-quiz-header">
          <h1 className="d-inline"> {quiz.title} </h1>
          <button className="btn btn-secondary float-end me-2" onClick={() => {navigate("Take")}}> Preview </button>
          <button className="btn btn-danger float-end me-2" onClick={() => {navigate("Editor")}}> Edit</button>
          <h5> {quiz.description} </h5>
          
          </div>
          <hr />

          {currentUser.role === "STUDENT" ? (
            <div className="container align-items-center m-5">
              <button className="btn btn-danger"> Start </button>
            </div>
          ) : (
            <div className="wd-faculty-quiz-details">
              <div className="row">
                <b className="col-5">Quiz Type</b>
                <span className="col-7">{quiz.quizType}</span>
              </div>
              <div className="row">
                <b className="col-5 float-end">Points</b>
                <span className="col-7 float-start">{quiz.points}</span>
              </div>
              <div className="row">
                <b className="col-5 float-end">Assignment Group</b>
                <span className="col-7 float-start">
                  {quiz.assignment_group}
                </span>
              </div>
              <div className="row">
                <b className="col-5 float-end">Shuffle Answers</b>
                <span className="col-7 float-start">
                  {quiz.shuffle ? "Yes" : "No"}
                </span>
              </div>
              <div className="row">
                <b className="col-5 float-end">Time Limit</b>
                <span className="col-7 float-start">
                  {quiz.time_limit} Minutes
                </span>
              </div>
              <div className="row">
                <b className="col-5 float-end">Multiple Attempts</b>
                <span className="col-7 float-start">
                  {quiz.multiple_attempts ? "Yes" : "No"}
                </span>
              </div>
              {quiz.multiple_attempts && (
                <div className="row">
                  <b className="col-5 float-end">How Many Attempts</b>
                  <span className="col-7 float-start">{quiz.attempts}</span>
                </div>
              )}
              <div className="row">
                <b className="col-5 float-end">Show Correct Answers</b>
                <span className="col-7 float-start">
                  {quiz.show_correct_answers ? "Yes" : "No"}
                </span>
              </div>
              <div className="row">
                <b className="col-5 float-end">Access Code</b>
                <span className="col-7 float-start">{quiz.access_code}</span>
              </div>
              <div className="row">
                <b className="col-5 float-end">One Question At A Time</b>
                <span className="col-7 float-start">
                  {quiz.one_question_at_a_time ? "Yes" : "No"}
                </span>
              </div>
              <div className="row">
                <b className="col-5 float-end">Webcam Required</b>
                <span className="col-7 float-start">
                  {quiz.webcam_required ? "Yes" : "No"}
                </span>
              </div>
              <div className="row">
                <b className="col-5 float-end">
                  Lock Questions After Answering
                </b>
                <span className="col-7 float-start">
                  {quiz.lock_questions_after_answering ? "Yes" : "No"}
                </span>
              </div>

              <table className="table">
                <thead>
                  <tr>
                    <th> Due </th>
                    <th> For </th>
                    <th> Available From </th>
                    <th> Until </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{quiz.due_date}</td>
                    <td>{quiz.assign_to}</td>
                    <td>{quiz.available_from}</td>
                    <td>{quiz.available_until}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

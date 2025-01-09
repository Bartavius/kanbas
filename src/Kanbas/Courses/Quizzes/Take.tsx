import { useParams } from "react-router";
import * as client from "./client";
import { useEffect, useState } from "react";
import TakeNav from "./TakeNav";
import { useSelector } from "react-redux";

export default function Take() {
  const { qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [access, setAccess] = useState<string>("");
  const startTime = new Date();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!qid) return;
      setLoading(true); // Set loading to true before starting the fetch
      try {
        const loadedQuiz = await client.getQuiz(qid);
        setQuiz(loadedQuiz); // Set the quiz data once fetched
      } catch (error) {
        console.error("Failed to fetch quiz:", error);
      } finally {
        setLoading(false); // Set loading to false after fetch attempt is complete
      }
    };
    fetchQuiz();
  }, [qid]);

  // uploads the user response to the database
  const upload = async () => {
    await client.addResponse(currentUser._id, quiz._id);
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-3">
          <p>Loading quiz...</p> {/* Show a loading indicator or message */}
        </div>
      ) : (
        <div>
          {quiz.access_code && quiz.access_code !== access ? (
            <div className="d-flex justify-content-center align-items-center mt-3">
              <label htmlFor="" className="me-3">
                <h5>Access Code: </h5>
              </label>
              <input
                type="text"
                className="form-control w-25"
                onChange={(e) => {
                  setAccess(e.target.value);
                  upload();
                }}
              />
            </div>
          ) : (
            <div className="ms-3">
              <br />
              <div className="row">
                <div className="col-9">
                  <h3>
                    <b>{quiz.title}</b>
                  </h3>
                  <p className="mt-3">Started {startTime.toString()}</p>
                  <h3>
                    <b>Quiz Instructions</b>
                  </h3>
                  <p className="mt-3">{quiz.description}</p>
                  <hr />
                </div>
                <div className="col-3">
                  <h4>Questions</h4>
                  <TakeNav quiz={quiz} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

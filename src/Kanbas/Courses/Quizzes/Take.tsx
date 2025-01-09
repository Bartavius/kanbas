import { useParams } from "react-router";
import * as client from "./client";
import { useEffect, useState } from "react";
import TakeNav from "./TakeNav";
import { useSelector } from "react-redux";
import TakeQuestion from "./TakeQuestion";

export default function Take() {
  const { qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quiz, setQuiz] = useState<any>({});
  const [questions, setQuestions] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state
  const [access, setAccess] = useState<string>("");
  const startTime = new Date();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!qid) return;
      try {
        const loadedQuiz = await client.getQuiz(qid);
        setQuiz(loadedQuiz); // Set the quiz data once fetched
        const loadedQuestions = await client.getQuestionsFromQuiz(qid);
        setQuestions(loadedQuestions);
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
          <p>Loading quiz...</p>
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

                  <div className="quiz-body-display">



                    {questions.map((question: any, index: number) => (
                      <div className="mt-5 mb-5 container">
                        
                      <TakeQuestion key={question._id} question={question} questionIndex={index + 1} /></div>
                    ))
                    }

                  </div>


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

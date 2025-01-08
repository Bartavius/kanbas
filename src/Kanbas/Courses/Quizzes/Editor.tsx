import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import DetailEdit from "./DetailEdit";
import QuestionEdit from "./Questions/QuestionEdit";
import * as client from "./client";

export default function QuizEditor() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const [win, setWin] = useState<string>("DETAIL");
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

  return (
    <div className="container">
      {loading ? (
        <h5>...Loading</h5>
      ) : (
        <div>
          <h2>Quiz editor</h2>
          <div className="border-bottom">
          <button
            className={`btn ${
              win === "DETAIL" ? "border border-bottom-empty" : "border-bottom text-danger"
            } rounded-0`}
            onClick={() => setWin("DETAIL")}
          >
            {" "}
            Details{" "}
          </button>
          <button
            className={`btn ${
              win === "QUESTION"
                ? "border border-bottom-empty"
                : "border-bottom text-danger"
            } rounded-0
 `}
            onClick={() => setWin("QUESTION")}
          >
            {" "}
            Questions{" "}
          </button>
          </div>

          {win === "DETAIL" && <DetailEdit quiz={quiz} />}
          {win === "QUESTION" && <QuestionEdit quiz={quiz} />}
        </div>
      )}
    </div>
  );
}

// import { useParams } from "react-router"
// import * as client from "./client";
// import { useCallback, useEffect, useState } from "react";
// import MCQ from "./Questions/MCQ";
// import Blank from "./Questions/Blank";
// import TF from "./Questions/TF";
// import TakeNav from "./TakeNav";
// import { useSelector } from "react-redux";

// displays the question, and the answer options
export default function TakeQuestion() {
  // need to decide, if the take question should take in a question that is loaded in "TAKE.tsx"
  // or should we only fetch it here. I'm leaning towards the former.

  const testAnswers = [
    {
      _id: "1",
      answerText: "answer 1",
    },
    {
      _id: "2",
      answerText: "answer 2",
    },
    {
      _id: "3",
      answerText: "answer 3",
    },
  ];

  return (
    <div className="container">
      <div className="question-header-display bg-light border border-gray ">
        <div className="ms-3 d-flex justify-content-between p-3">
        <h5>
          <b>Question X</b>
        </h5>
        <h5>
          <b>Y Pts</b>
        </h5>
      </div></div>
      <div className="container question-body-display border border-gray p-3">
        <br />
        <div className="question-body-question-display ms-3">
          question text right here like omg ?
        </div>
        <br />
        <div className="question-body-answer-display mt-6">
          {testAnswers.map((answer: any) => (
            <div key={answer._id}>
              <hr />
              <div className="form-check mb-3">
                <input
                  id={answer._id}
                  type="radio"
                  className="form-check-input"
                  name={`question-`}
                />
                <label htmlFor={answer._id} className="form-check-label ms-2">
                  {answer.answerText}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  //     const {qid, qNum} = useParams();
  //     const [question, setQuestion] = useState<any>({});
  //     const [quiz, setQuiz] = useState<any>({});

  //     const {currentUser} = useSelector((state:any) => state.accountReducer);
  //     const [attempt, setAttempt] = useState<any>({})

  //     const fetchQuestion = useCallback(async () => {
  //         if (!qNum) return;
  //         const loadedResponse = await client.getQuestion(qNum);
  //         setQuestion(loadedResponse);
  //     }, [qNum, qid])

  //     const fetchQuiz = useCallback(async () => {
  //         if (!qid) return;
  //         const loadedResponse = await client.getQuiz(qid);
  //         setQuiz(loadedResponse);
  //         const att = await client.findAttempt(currentUser._id, loadedResponse._id);
  //         setAttempt(att);
  //     }, [qid, qNum])

  //     // const fetchAnswers = useCallback(async () => {
  //     //     if (!qNum) return;
  //     //     const loadedResponse = await client.getAnswersFromQuestion(qNum);
  //     //     setAnswers(loadedResponse);
  //     // }, [qid, qNum])

  //     useEffect(() => {
  //         fetchQuestion();
  //         fetchQuiz(); //fetchAnswers();
  //     }, [fetchQuestion, fetchQuiz]) //fetchAnswers

  //     const renderQuestion = () => {
  //         if (question.questionType === "MC") {
  //             return (<MCQ question={question} attempt={attempt}/>)
  //         } else if (question.questionType === "FILLBLANK") {
  //             return (<Blank question={question} />)
  //         } else if (question.questionType === "TRUE-FALSE") {
  //             return (<TF question={question} />)
  //         }
  //     }

  //     return (
  //         <div>
  //             <div className="row">
  //                 <div className="col-9">
  //                     <div>
  //                     {renderQuestion()}
  //                     </div>
  //                 </div>
  //                 <div className="col-3">
  //                     <TakeNav quiz={quiz}/>
  //                 </div>
  //             </div>

  //         </div>
  //     )
}

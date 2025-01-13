import InputText from "../Questions/AnswerTypes/InputText";
import Radio from "../Questions/AnswerTypes/Radio";
import * as client from "../client";

// displays the question, and the answer options
export default function TakeQuestion({question, questionIndex, attemptId} : {question:any, questionIndex:number, attemptId:string}) {
  // need to decide, if the take question should take in a question that is loaded in "TAKE.tsx"
  // or should we only fetch it here. I'm leaning towards the former.

  const saveResponse = async (newResponse: any) => {
    await client.updateAttemptQuestion(attemptId, question._id, newResponse);
  }

  const answerType = () => {
    switch (question.questionType) {
      // notes for when I have more brain power:
      // the questions actually should display the ATTEMPT's answers and not the question's answers. This is to ensure that even after
      // the user has selected their answers, they can still see what they answered. So I will have to restructure that
      case "MC":
        return <Radio answers={question.answers} shuffled={false} questionId={question._id} attemptId={attemptId} saveResponse={saveResponse}/>
      case "TRUE-FALSE":
        return <Radio answers={question.answers} shuffled={false} questionId={question._id} attemptId={attemptId} saveResponse={saveResponse}/>
      case "FILLBLANK":
        return <InputText answers={question.answers} attemptId={attemptId} saveResponse={saveResponse} />
  }
}

  return (
    <div className="container">
      <div className="question-header-display bg-light border border-gray ">
        <div className="ms-3 d-flex justify-content-between p-3">
        <h5>
          <b>Question {questionIndex}</b>
        </h5>
        <h5>
          <b>{question.point} Pts</b>
        </h5>
      </div></div>
      <div className="container question-body-display border border-gray p-3">
        <br />
        <div className="question-body-question-display ms-3">
          {question.questionText}
        </div>
        <br />
        <div className="question-body-answer-display mt-6">
          {answerType()}
        </div>
      </div>
    </div>
  );
}
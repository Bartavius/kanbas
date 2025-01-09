export default function Radio({
  answers,
  shuffled,
  questionId,
}: {
  answers: [];
  shuffled: boolean;
  questionId: string;
}) {
  // need to figure out how to shuffle the answers

  return (
    <div className="answer-display-radio">
      {answers.map((answer: any) => (
        <div>
           <hr />
        <div className="form-check mb-3">
          <input
            id={answer._id}
            type="radio"
            className="form-check-input"
            name={`question-${questionId}`}
          />
          <label htmlFor={answer._id} className="form-check-label ms-2">
            {answer.answerText}
          </label>
        </div></div>
      ))}
    </div>
  );
}

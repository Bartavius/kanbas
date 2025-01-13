export default function InputText({
  answers,
  attemptId,
  saveResponse,
}: {
  answers: [];
  attemptId: string;
  saveResponse: (newResponse: any) => void;
}) {
  return (
    <div>
      <hr className="mb-5" />
      {answers.map((answer: any, index: number) => (
        <div className="mb-3 ms-3 mt-4">
          <label htmlFor={answer._id} className="me-4 d-inline">
            {index + 1}.{" "}
          </label>
          <input
            id={answer._id}
            type="text"
            className="form-control w-25 d-inline"
            onChange={(e) => {saveResponse({userResponse: e.target.value, isCorrect: e.target.value === answer.answerText})}}
          />
        </div>
      ))}
    </div>
  );
}

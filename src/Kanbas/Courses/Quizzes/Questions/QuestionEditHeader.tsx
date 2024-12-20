export default function QuestionEditHeader({
  editQuestion,
  setEditQuestion,
}: {
  editQuestion: any;
  setEditQuestion: (state: any) => void;
}) {
  const handleChange = (e: any) => {
    setEditQuestion({ ...editQuestion, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <b className="mb-3">Question:</b>
      <div className="row">
        <div className="col-9">
          <textarea
            className="form-control"
            rows={7}
            cols={50}
            defaultValue={editQuestion.questionText}
            name="questionText"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="col-3">
          <select
            name="questionType"
            className="form-select pl-3"
            defaultValue={editQuestion.questionType}
            onChange={(e) => handleChange(e)}
          >
            {" "}
            {/* THIS NEEDS TO IMPORT EDITQUESTIONS METHOD SO THAT IT UPDATES COMPONENT RENDER UPON SELECTION */}
            <option value="MC"> Multiple-Choice </option>
            <option value="FILLBLANK"> Fill in the Blank </option>
            <option value="TRUE-FALSE"> True/False </option>
          </select>
          <div className="row mt-3">
            <div className="col-6">
              <label
                htmlFor={`${editQuestion._id}_points_editor`}
                className="form-label d-flex justify-content-end"
              >
                {" "}
                Points:{" "}
              </label>
            </div>
            <div className="col-6">
              <input
                id={`${editQuestion._id}_points_editor`}
                name="point"
                type="number"
                className="form-control"
                defaultValue={editQuestion.point}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

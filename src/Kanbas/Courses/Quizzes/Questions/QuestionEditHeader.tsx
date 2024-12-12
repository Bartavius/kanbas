export default function QuestionEditHeader({ editQuestion, setEditQuestion}: { editQuestion: any, setEditQuestion: (state:any) => (void) }) {
    
  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <textarea
            className="form-control"
            rows={7}
            cols={50}
            defaultValue={editQuestion.questionText}
            onChange={(e) =>
              setEditQuestion({ ...editQuestion, questionText: e.target.value })
            }
          />
        </div>
        <div className="col-3">
          <select
            name="wd-question-type-selector"
            className="form-select pl-3"
            defaultValue={editQuestion.questionType}
            onChange={(e) =>
              setEditQuestion({ ...editQuestion, questionType: e.target.value })
            }
          >
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
          </div><div className="col-6">

          <input
            id={`${editQuestion._id}_points_editor`}
            type="number"
            className="form-control"
            defaultValue={editQuestion.point}
            onChange={(e) => setEditQuestion({...editQuestion, point: e.target.value})}
          /></div></div>
        </div>{" "}
      </div>
        
    </div>
  );
}

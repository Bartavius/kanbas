export default function AssignmentAdder({ dialogTitle, moduleName, setAssignmentName, availableDate, dueDate, points, addAssignment }:
    { dialogTitle: string; moduleName: string; setAssignmentName: (name: string) => void; availableDate: string; 
        dueDate: string; points: number; addAssignment: () => void; }) {
      return (
        <div id="wd-add-module-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {dialogTitle} </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <input className="form-control" defaultValue={moduleName} placeholder="Module Name"
                       onChange={(e) => setAssignmentName(e.target.value)}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Cancel </button>
                <button onClick={addAssignment} type="button" data-bs-dismiss="modal" className="btn btn-danger">
                  Add Module </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
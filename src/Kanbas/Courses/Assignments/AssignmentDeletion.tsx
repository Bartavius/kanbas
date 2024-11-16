export default function AssignmentDeletion({ assignmentName, deleteAssignment }:
    { assignmentName: string; deleteAssignment: () => void }) {
      return (
        <div id="wd-delete-assignment-dialog" className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Delete Assignment </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <h3>Are you sure you want to delete {assignmentName}?</h3>
                <h5>* This action cannot be undone.</h5>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteAssignment}>
                  Yes </button>
                <button type="button" data-bs-dismiss="modal" className="btn btn-secondary" >
                  No </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
    
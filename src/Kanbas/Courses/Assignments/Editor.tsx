import { RxCross2 } from "react-icons/rx";
import { LuCalendarDays } from "react-icons/lu";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as assignmentClient from "./client";
export default function AssignmentEditor( 
) {
  const {currentUser} = useSelector((state:any) => state.accountReducer);
  const navigate = useNavigate();
  if (currentUser.role !== "ADMIN" && currentUser.role !== "FACULTY") {
    console.log(JSON.stringify(currentUser))
    alert("User does not have access to this page.");
    navigate(-1);
  }

  let { cid } = useParams();
  let { aid } = useParams();

  const assignments = useSelector( (state: any) => state.assignmentReducer.assignments);
  const [assignment, setAssignment] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignment = useCallback(async () => {
    if (!cid || !aid) return;
    try {
        const loadedAssignment = await assignmentClient.getAssignmentById(aid);
        setAssignment(loadedAssignment);
    } catch (error) {
        console.error(error);
    }
    setLoading(false);
  }, [cid, aid])

  const updateAssignment = async () => {
    if (!cid || !aid) return;
    try {
        console.log(`Updating: ${JSON.stringify(assignment)}`)
        await assignmentClient.updateAssignment(aid, assignment);
        console.log(`After updating: ${JSON.stringify(assignment)}`)
    } catch (error) {
        console.error(error);
    }
  }///////////////

  useEffect( () => {
    fetchAssignment();
  }, [fetchAssignment]);


  console.log("Page was accessed.");
  console.log(`ASSIGNMENTS: ${JSON.stringify(assignments)}`)
  console.log(`assignment: ${JSON.stringify(assignment)}`);


    return (
      <div id="wd-assignments-editor">
        {loading ? <div>Loading...</div> : <div>
       <label htmlFor="wd-name" className="form-label d-block"><h5>Assignment Name</h5></label>
        
        <input id="wd-name" className="form-control" value={assignment ? assignment.title : ""} onChange={ (e) => setAssignment({ ...assignment, title: e.target.value }) } /> 
        <textarea id="wd-description" className="form-control mt-5" rows={10} value={assignment ? assignment.description : ""} onChange={ (e) => setAssignment({ ...assignment, description: e.target.value }) } />

        <form>
          <div className="mt-5 row g-3">
            <label htmlFor="wd-points" className="form-label col-4 d-flex justify-content-end align-items-end pe-5">Points</label>
            <input type="number" id="wd-points" value={assignment ? assignment.points: ""} className="form-control col " onChange={ (e) => setAssignment({...assignment, points: parseInt(e.target.value)}) }/>
          </div>

          <div className="mt-2 row g-3">
            <label htmlFor="wd-group" className="form-label col-4 d-flex justify-content-end align-items-end pe-5">Assignment Group</label>
            <select value={assignment.assignment_group} name="assignment-group" id="wd-group" className="col form-select" onChange={ (e) => setAssignment( {...assignment, assignment_group: e.target.value}) } >
                <option value="ASSIGNMENT">Assignment</option>
                <option value="QUIZ">Quiz</option>
                <option value="EXAM">Exam</option>
                <option value="PROJECT">Project</option>
            </select>
          </div>

          <div className="mt-2 row g-3">
            <label htmlFor="wd-display-grade-as" className="form-label col-4 d-flex justify-content-end align-items-end pe-5">Display Grade as</label>
            <select value={assignment.display_grade_as} name="display-grade-as" id="wd-display-grade-as" className="col form-select" onChange={ (e) => setAssignment({...assignment, display_grade_as: e.target.value}) }> 
                  <option value="PERCENTAGE"> PERCENTAGE</option>
            </select>
          </div>

          <div className="mt-2 row g-3">
            <label htmlFor="wd-submission-type" className="form-label col-4 d-flex justify-content-end align-text-end pe-5">Submission Type</label>
            <div className="container border border-dark col rounded-1">
              <select value={assignment.submission_type} name="submission-type" id="wd-submission-type" className="form-select ml-3 mt-3 mr-3 mb-3 justify-content-center align-items-center"
              onChange={ (e) => setAssignment({...assignment, submission_type: e.target.value}) }>
                <option value="ONLINE"> 
                  ONLINE
                </option>
                
              </select>

              <div> {/*not sure what this stuff is yet*/}
                <label htmlFor="wd-submission-type-online" className="form-check-label"><h6>Online Entry Options:</h6></label>
                <div className="form-check mb-3">
                  <input type="checkbox" id="wd-text-entry" className="form-check-input"/>
                  <label htmlFor="wd-text-entry" className="form-check-label d-block">Text Entry</label>
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" id="wd-website-url" className="form-check-input" checked/>
                  <label htmlFor="wd-website-url" className="form-check-label">Website URL</label>
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" id="wd-media-recordings" className="form-check-input"/>
                  <label htmlFor="wd-media-recordings" className="form-check-label">Media Recordings</label>
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" id="wd-student-annotation" className="form-check-input"/>
                  <label htmlFor="wd-student-annotation" className="form-check-label">Student Annotation</label>
                </div>
                <div className="form-check mb-3">
                  <input type="checkbox" id="wd-file-upload" className="form-check-input"/>
                  <label htmlFor="wd-file-upload" className="form-check-label">File Uploads</label>
                </div>
              </div>
            </div>

            <div className="mt-2 row g-3">
            <label htmlFor="wd-assign-to" className="form-label col-4 d-flex justify-content-end align-text-end pe-5">Assign</label>
            <div className="container border border-dark col rounded-1">
              <label htmlFor="wd-assign-to" className="form-label mt-3"><h4>Assign to</h4></label>
              <div className="container border border-dark rounded-1">
                <button className="flex btn btn-secondary mt-2 mb-2 disabled" onClick={ () => setAssignment({...assignment, assign_to: "everyone"}) }>
                  {assignment ? assignment.assign_to : ""} <RxCross2 className="float-end"/>
                </button>
              </div>

              <label htmlFor="wd-due-date" className="form-label mt-3"><h4>Due</h4></label>
              <div className="input-group">
                <input type="text" id="wd-due-date" className="input-group-text form-control" value={assignment ? assignment.due_date : ""}
                onChange={ (e) => setAssignment({...assignment, due_date: e.target.value}) }/>
                <label htmlFor= "wd-due-date" className="rounded-1 input-group-text form-label bg-secondary"><LuCalendarDays/></label>
              </div> 

              <div className="row mt-3 mb-3">
                <div className="col-6">
                  <label htmlFor="wd-available-from" className="form-label"><h4>Available from</h4></label>
                  <div className="input-group">
                    <input className="input-group-text rounded-1 form-control" type="text" id="wd-available-from" value={assignment ? assignment.available_from : ""}
                    onChange={ (e) => setAssignment({...assignment, available_from: e.target.value}) }/>
                    <label htmlFor= "wd-available-from" className="rounded-1 input-group-text form-label bg-secondary"><LuCalendarDays/></label>
                  </div>
                </div>

                <div className="col-6 flex">
                  <label htmlFor="wd-available-until" className="form-label"><h4>Until</h4></label>
                  <div className="input-group">
                    <input className="input-group-text rounded-1 form-control" type="text" id="wd-available-until" value={assignment ? assignment.available_until : ""}
                    onChange={ (e) => setAssignment({...assignment, available_until: e.target.value}) }/>
                    <label htmlFor= "wd-available-until" className="rounded-1 input-group-text form-label bg-secondary"><LuCalendarDays/></label>
                  </div>
                </div>
              </div>

            </div>
            </div>


          </div>
          <hr />
          <div id="wd-assignment-submission-buttons">
            <ul className="nav nav-pill float-end">
              <li className="nav-item">
                <Link
                  id="wd-course-home-link" to={`/Kanbas/Courses/${cid}/Assignments`}
                  className={`nav-link text-danger border-0`}>
                  <button className="btn btn-secondary rounded-1">Cancel</button>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  id="wd-course-home-link" to={`/Kanbas/Courses/${cid}/Assignments`}
                  className={`nav-link text-danger border-0`}>
                  <button className="btn btn-danger text-white rounded-1" 
                  onClick={(e) => {
                    updateAssignment();
                  }
                }
                  >Save</button>
                </Link>
              </li>
            </ul>
            
          </div>
        </form>

        </div>}
      </div>
  );}
  
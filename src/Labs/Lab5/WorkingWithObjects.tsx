import { useState } from "react";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

  const [module, setModule] = useState({
    id: 1, name: "Intro to Web Development",
    description: "An introduction to the course",
    course: "CS4550"
  });
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <h5>Assignment: </h5>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>
      <input className="form-control w-75 mb-2" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>

      <a id="wd-update-assignment-score"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}>
      Update Score
      </a>
      <input className="form-control w-75 mb-2" type="number" id="wd-assignment-score"
        defaultValue={assignment.score} onChange={(e) =>
          setAssignment({ ...assignment, score: parseInt(e.target.value) })}/>
      
      <a id="wd-update-assignment-complete"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/complete/${assignment.completed}`}>
      Update Complete
      </a>
      <input className="form-check-input mb-2 me-2" type="checkbox" id="wd-assignment-completed" checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })}/>
      <label htmlFor="wd-assignment-completed" className="form-check-label">Complete</label>
        
      <br /><br />

      <h5>Module: </h5>
      <a id="wd-update-module-title"
         className="btn btn-primary float-end"
         href={`${MODULE_API_URL}/name/${module.name}`}>
        Update Name
      </a>
      <input className="form-control w-75" id="wd-module-title"
        defaultValue={module.name} onChange={(e) =>
          setModule({ ...module, name: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary me-2"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a>
      <a id="wd-retrieve-modules" className="btn btn-danger me-2"
         href={MODULE_API_URL}>
        Get Module
      </a><hr/>
      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary me-2"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Assignment Title
      </a>
      <a id="wd-retrieve-nodule-title" className="btn btn-danger me-2"
         href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a><hr/>


    </div>
);}

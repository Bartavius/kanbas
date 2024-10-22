import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import SectionControlButton from "./SectionControlButton";
import { GrNotes } from "react-icons/gr";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Assignments() {
    const { cid } = useParams();
    const assignments = db.assignments;
    let assignmentNum = 0;
    return (
      <div>
        {/* assignment top */}
        <div className="wd-assignment-top text-nowrap row mt-3 mb-3">
                <div className="col-4 d-flex">
                  <div className="input-group">
                    <label htmlFor="wd-assignment-search-box" className="form-label input-group-text"><FaMagnifyingGlass/></label>
                    <input className="input-group-text rounded-1 form-control" type="text" id="wd-assignment-search-box" placeholder="Search..."/>
                  </div>
                </div>

                <div className="col-8 d-flex justify-content-end align-text-end">
                  <button className="btn btn-danger text-white rounded-1 me-1">
                  <BsPlus className="text-white"/>Assignment</button> 
                  <button className="btn btn-secondary text-dark rounded-1 me-1">
                  <BsPlus />Group</button>
                </div>
              </div>

          {/* assignment section title */}
          <li className="wd-assignment-list list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-assignment-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3"/>
              <GoTriangleDown />
              ASSIGNMENTS {/* currently no directions on if we'll format assignment groups, so that will be tbd */}
              <SectionControlButton />
            </div>

            {/* assignments list */}

            <ul className="wd-assignments list-group rounded-0">
              {assignments
                .filter((assignment: any) => assignment.course === cid)
                .map((assignment: any) => (

                  <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <div className="row">
                    <div className="col-2">
                      <BsGripVertical className="me-2 fs-3" />
                      <GrNotes className="me-2 fs-3 text-success" />
                    </div>
                    <div className="col-8 text-start">
                      <a className="wd-assignment-link" 
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A{++assignmentNum} - {assignment.title}
                      </a>
                      <p>Multiple Modules | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100pts</p>
                      {/* Haven't been given directions on how this part is formatted, so this will be left static until further notice also */}
                    </div>
                    <div className="col-2">
                      <LessonControlButtons />
                    </div>
                  </div>
                </li>

                ))
              }
            </ul>
          </li>
        </div>
    )
  }
        
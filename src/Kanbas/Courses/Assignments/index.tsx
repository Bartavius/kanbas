import { FaMagnifyingGlass } from "react-icons/fa6";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import SectionControlButton from "./SectionControlButton";
import { GrNotes } from "react-icons/gr";
import LessonControlButtons from "../Modules/LessonControlButtons";

export default function Assignments() {
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



        <ul id="wd-assignments-section" className="list-group rounded-0">
          {/* assignment section title */}
          <li className="wd-assignment-list list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-assignment-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3"/>
              <GoTriangleDown />
              ASSIGNMENTS
              <SectionControlButton />
            </div>

            {/* assignments list */}
            <ul className="wd-assignments list-group rounded-0">
                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <div className="row">
                    <div className="col-2">
                      <BsGripVertical className="me-2 fs-3" />
                      <GrNotes className="me-2 fs-3 text-success" />
                    </div>
                    <div className="col-8 text-start">
                      <a className="wd-assignment-link" 
                        href="#/Kanbas/Courses/1234/Assignments/123">
                        A1 - ENV + HTML
                      </a>
                      <p>Multiple Modules | <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at 11:59pm | 100pts</p>
                    </div>
                    <div className="col-2">
                      <LessonControlButtons />
                    </div>
                  </div>
                </li>


                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <div className="row">
                    <div className="col-2">
                      <BsGripVertical className="me-2 fs-3" />
                      <GrNotes className="me-2 fs-3 text-success" />
                    </div>
                    <div className="col-8">
                      <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/124">
                      A2 - CSS + BOOTSTRAP
                      </a>
                      <p>Multiple Modules | <b>Not available until</b> May 13 at 12:00am | <b>Due</b> May 20 at 11:59pm | 100pts</p>
                    </div>
                    <div className="col-2">
                      <LessonControlButtons />
                    </div>
                  </div>
                </li>

                <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                  <div className="row">
                    <div className="col-2">
                      <BsGripVertical className="me-2 fs-3" />
                      <GrNotes className="me-2 fs-3 text-success" />
                    </div>
                    <div className="col-8">
                      <a className="wd-assignment-link" href="#/Kanbas/Courses/1234/Assignments/125">
                      A3 - JAVASCRIPT + REACT
                      </a>
                      <p>Multiple Modules | <b>Not available until</b> May 20 at 12:00am | <b>Due</b> May 27 at 11:59pm | 100pts</p>
                    </div>
                    <div className="col-2">
                      <LessonControlButtons />
                    </div> 
                  </div>
                </li>
            </ul>
          </li>
        </ul>
      </div>
  );
}
  
import { FaMagnifyingGlass, FaPencil } from "react-icons/fa6";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import SectionControlButton from "./SectionControlButton";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import AssignmentControlButtonLeft from "./AssignmentControlButtonLeft";
import AssignmentDeletion from "./AssignmentDeletion";
import AssignmentControlButtons from "./AssignmentControlButtons";
import * as assignmentClient from "./client";
import { useEffect, useState } from "react";
import { useUserAccess } from "../../Account/UserAccess";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<any>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const facultyAccess = useUserAccess() > 1; // admin has same privileges as faculty

  const fetchAssignments = async () => {
    if (!cid) return;
    try {
      const loadedAssignments = await assignmentClient.getAssignmentsFromCourse(
        cid
      );
      setAssignments(loadedAssignments);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };
  const createAssignment = async () => {
    if (!cid) return;
    try {
      console.log(`Before creating: ${cid}`);
      const loadedAssignment = await assignmentClient.createAssignment(cid);
      console.log(`Creating: ${JSON.stringify(loadedAssignment)}`);
      navigate(`/Kanbas/Courses/${cid}/Assignments/${loadedAssignment._id}/Editor`);
      return loadedAssignment;
    } catch (error) {
      console.error(error);
    }
  };
  const deleteAssignmentAxios = async (aid: string) => {
    if (!cid) return;
    try {
      await assignmentClient.deleteAssignment(aid);
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [assignments, reload]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {/* assignment top */}
          <div className="wd-assignment-top text-nowrap row mt-3 mb-3">
            <div className="col-4 d-flex">
              <div className="input-group">
                <label
                  htmlFor="wd-assignment-search-box"
                  className="form-label input-group-text"
                >
                  <FaMagnifyingGlass />
                </label>
                <input
                  className="input-group-text rounded-1 form-control"
                  type="text"
                  id="wd-assignment-search-box"
                  placeholder="Search..."
                />
              </div>
            </div>
            {facultyAccess ? (
              <div className="col-8 d-flex justify-content-end align-text-end faculty-access">
                <button
                  className="btn btn-danger text-white rounded-1 me-1"
                  onClick={() => {
                    createAssignment();
                  }}
                >
                  {<BsPlus className="text-white" />}
                  Assignment
                </button>
                <button className="btn btn-secondary text-dark rounded-1 me-1">
                  <BsPlus /> Group
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
          <div>
            {/* assignment section title */}
            <ul className="wd-assignment-list list-group-item p-0 mb-5 fs-5 border-gray">
              <div className="wd-assignment-title p-3 ps-2 bg-secondary">
                {currentUser.role === "FACULTY" && (
                  <BsGripVertical className="me-2 fs-3" />
                )}
                <GoTriangleDown />
                ASSIGNMENTS
                {/* can make this part more data driven once json format is finalized */}
                <SectionControlButton percent="100" />
              </div>
              <li className="list-group-item">
                {/* assignment list */}
                <ul className="wd-assignments list-group rounded-0">
                  {assignments.map((assignment: any) => (
                    <li className="wd-assignment-list-item list-group-item p-3 ps-1">
                      <div className="row align-items-center">
                        <div className="col-2">
                          {facultyAccess ? (
                            <div className="faculty-access">
                              <AssignmentControlButtonLeft />
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                        <div className="col-8 text-start">
                          <a
                            className="wd-assignment-link"
                            href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                          >
                            {assignment.title}
                          </a>

                          <p>
                            Multiple Modules{" "}
                            {/* not sure what this is to be honest*/}|{" "}
                            <b>Not available until</b>{" "}
                            {assignment.available_from}| <b>Due</b>{" "}
                            {assignment.due_date}| {assignment.points}pts
                          </p>
                        </div>
                        <div className="col-2">
                          {facultyAccess && (
                            <div className="faculty-access float-end">
                              <FaPencil
                                className="text-primary d-inline-block me-2"
                                onClick={() =>
                                  navigate(
                                    `/Kanbas/Courses/${cid}/Assignments/${assignment._id}/Editor`
                                  )
                                }
                              />
                              <div className="d-inline-block">

                              <AssignmentControlButtons 
                                assignmentID={assignment._id}
                              />
                              <AssignmentDeletion
                                assignmentName={assignment.title}
                                assignmentID={assignment._id}
                                deleteAssignment={() =>
                                  deleteAssignmentAxios(assignment._id)
                                }
                              /></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

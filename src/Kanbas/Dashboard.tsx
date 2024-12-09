import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentClient from "./enrollmentClient";
import { useUserAccess } from "./Account/UserAccess";
import CourseDeletion from "./CourseDeletion";

export default function Dashboard() {
  const defaultCourse = {
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New description",
    author: "",
  };

  //----------------------------

  // TODO: FOR ANONYMOUS USER ROLE. TAKE AWAY THEIR ABILITY TO CLICK ON IMAGE TO ACCESS COURSE.
  // design choice: I decided to not implement an unenroll button on courses that the user has permission to delete.
  // I feel like it wouldn't make sense for people who has perms to be able to unenroll and then there's no one else to delete them

  //----------------------------

  const facultyAccess = useUserAccess() === 2; // only faculty level
  const adminAccess = useUserAccess() > 2; // only admins or higher
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showEnrolled, setShowEnrolled] = useState(false);
  const [allCourses, setAllCourses] = useState<any>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<any>([]);
  // reserved for editing when adding courses.
  const [course, setCourse] = useState({ ...defaultCourse });
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<boolean>(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState<any>(null);
  const [reload, setReload] = useState<boolean>(false);

  const fetchCourses = async () => {
    try {
      const courses = await courseClient.findCoursesForUser(currentUser._id);
      setEnrolledCourses(courses);
    } catch (error:any) {
      setError(error.reponse.data.message);
    }
    setLoading(false);
  };

  const fetchAllCourses = async () => {
    try {
      const allCourses = await courseClient.findAllCourses();
      setAllCourses(allCourses);
    } catch (error:any) {
      setError(error.reponse.data.message);
    }
    setLoading(false);
  };

  const courseDelete = async (courseId: string) => {
    try {
      const status = await courseClient.deleteCourse(courseId);
      setAllCourses(allCourses.filter((c: any) => c._id !== courseId));
      setEnrolledCourses(
        enrolledCourses.filter((c: any) => c._id !== courseId)
      );
      setSuccess("Successfully delete the course.")
      setReload(!reload);
    } catch (error:any) {
      setError(error.reponse.data.message);
    }
  };

  const courseUpdate = async () => {
    try {
    await courseClient.updateCourse(course);
    setSuccess("Successfully updated the course.");
    setCourse(defaultCourse);
    setSelectedCourse(false);
    setReload(!reload);
    } catch (error:any) {
      setError(error.reponse.data.message);
    }
  };

  const enrollUser = async (userId: any, courseId: any) => {
    const newEnrollment = await enrollmentClient.enrollUser(userId, courseId);
    setReload(!reload);
  };

  const unenrollUser = async (userId: string, courseId: string) => {
    const deletedUser = await enrollmentClient.unenrollUser(userId, courseId);
    setReload(!reload);
  };

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      setEnrolledCourses([...enrolledCourses, newCourse]);
      setSuccess("Successfully added a new course.");
      setReload(!reload);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser, reload]);

  useEffect(() => {
    fetchAllCourses();
  }, [showEnrolled, reload]);

  return (
    <div id="wd-dashboard">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {!facultyAccess ? (
            <div className="row">
              {/* only faculties level-access cannot see the enrollment button */}
              <h1 id="wd-dashboard-title" className="col-sm-8 col-9 d-inline">
                Dashboard
              </h1>
              <button
                className="btn btn-primary d-inline float-end col-sm-4 col-3"
                onClick={() => setShowEnrolled(!showEnrolled)}
              >
                Enrollments
              </button>
            </div>
          ) : (
            <h1 id="wd-dashboard-title">Dashboard</h1>
          )}
          <hr />
          {error && (
            <div
              id="wd-signin-error-message"
              className="alert alert-danger mb-2 mt-2"
            >
              {error}
            </div>
          )}
          {(facultyAccess || adminAccess) && (
            <div id="course-addition-menu" className="faculty-access">
              {success && (<div id="wd-add-course-success-message" className="alert alert-primary mb-2 mt-2">{success}</div>) }
              <h5>
                New Course
                <button
                  className="btn btn-primary float-end"
                  id="wd-add-new-course-click"
                  onClick={() => {
                    // if (enrolledCourses.find( (c:any) => course._id === c._id )) {
                    //   course._id = new Date().getTime().toString();
                    // } this checks if it exists already, if not then add
                    addNewCourse();
                    // enrollUser(currentUser._id, course._id);
                    setCourse(defaultCourse);
                  }}
                >
                  
                  Add
                </button>
                <button
                  className="btn btn-warning float-end me-2"
                  onClick={() => courseUpdate()}
                  disabled={!selectedCourse}
                  id="wd-update-course-click"
                >
                  Update
                </button>
              </h5>
              <br />
              <input
                value={course.name}
                className="form-control mb-2"
                onChange={(e) => setCourse({ ...course, name: e.target.value })}
              />
              <textarea
                value={course.description}
                className="form-control"
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
              />

              <br />
              <hr />
            </div>
          )}
          <h2 id="wd-dashboard-published">
            Published Courses (
            {showEnrolled ? allCourses.length : enrolledCourses.length})
          </h2>{" "}
          <hr />
          <div id="wd-dashboard-courses" className="row">
            <div className="row row-cols-1 row-cols-md-5 g-4">
              {enrolledCourses.map((c: any) => (
                <div
                  className="wd-dashboard-course col"
                  key={c._id}
                  style={{ width: "300px" }}
                >
                  <div className="course-card card rounded-3 overflow-hidden">
                    <Link
                      to={`/Kanbas/Courses/${c._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <img
                        src={`/images/${c.image}`}
                        width="100%"
                        height={160}
                        alt=""
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {c.name}{" "}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {c.description}{" "}
                      </p>

                      {facultyAccess || adminAccess ? (
                        <div
                          id="course-edit-buttons"
                          className="faculty-access"
                        >
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              navigate(`/Kanbas/Courses/${c._id}/Home`)
                            }
                          >
                            {" "}
                            Go{" "}
                          </button>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                            }}
                            data-bs-toggle="modal" data-bs-target={`#wd-delete-course-dialog-${c._id}`}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setSelectedCourse(true);
                              setCourse(c);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </div>
                      ) : (
                        <div id="course-buttons">
                          <button
                            className="btn btn-primary"
                            onClick={() =>
                              navigate(`/Kanbas/Courses/${c._id}/Home`)
                            }
                          >
                            {" "}
                            Go{" "}
                          </button>
                          <button
                            className="btn btn-danger mt-2 float-end"
                            onClick={() => unenrollUser(currentUser._id, c._id)}
                          >
                            Unenroll
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <CourseDeletion
                                courseName={c.name}
                                courseId={c._id}
                                deleteCourse={() =>
                                  courseDelete(c._id)
                                }
                              />
                </div>
                
              ))}

              {showEnrolled &&
                allCourses
                  .filter(
                    (c: any) =>
                      !enrolledCourses.some(
                        (enrolled: any) => enrolled._id === c._id
                      )
                  )
                  .map((c: any) => (
                    <div
                      className="wd-dashboard-course col"
                      key={c._id}
                      style={{ width: "300px" }}
                    >
                      <div className="course-card card rounded-3 overflow-hidden">
                        <Link
                          to={`/Kanbas/Courses/${c._id}/Home`}
                          className="wd-dashboard-course-link text-decoration-none text-dark"
                        >
                          <img
                            src={`/images/${c.image}`}
                            width="100%"
                            height={160}
                            alt=""
                          />
                        </Link>
                        <div className="card-body">
                          <h5 className="wd-dashboard-course-title card-title">
                            {c.name}{" "}
                          </h5>
                          <p
                            className="wd-dashboard-course-title card-text overflow-y-hidden"
                            style={{ maxHeight: 100 }}
                          >
                            {c.description}{" "}
                          </p>
                          {adminAccess && (
                            <div
                              id="course-edit-buttons"
                              className="faculty-access"
                            >
                              <button
                                className="btn btn-primary"
                                onClick={() =>
                                  navigate(`/Kanbas/Courses/${c._id}/Home`)
                                }
                              >
                                {" "}
                                Go{" "}
                              </button>
                              <button
                                onClick={(event) => {
                                  event.preventDefault();
                                }}
                                className="btn btn-danger float-end"
                                id="wd-delete-course-click"
                                data-bs-toggle="modal" data-bs-target={`#wd-delete-course-dialog-${c._id}`}
                              >
                                Delete
                              </button>
                              <button
                                id="wd-edit-course-click"
                                onClick={(event) => {
                                  event.preventDefault();
                                  setSelectedCourse(true);
                                  setCourse(c);
                                }}
                                className="btn btn-warning me-2 float-end"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                          {currentUser.role !== "USER" && (
                            <button
                              className="btn btn-success mt-2 float-end"
                              onClick={() =>
                                enrollUser(currentUser._id, c._id)
                              }
                            >
                              Enroll
                            </button>
                          )}{" "}
                          {/* preventing anonymous users to register for classes */}
                        </div>
                      </div>
                      <CourseDeletion
                                courseName={c.name}
                                courseId={c._id}
                                deleteCourse={() =>
                                  courseDelete(c._id)
                                }
                              />
                    </div>
                  ))}
                
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

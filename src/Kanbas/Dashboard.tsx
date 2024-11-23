import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentClient from "./enrollmentClient";
import { addEnrollment, deleteEnrollment } from "./reducer";
import { setCourses, addCourse, updateCourse, deleteCourse } from "./Courses/courseReducer";
import { useUserAccess } from "./Account/UserAccess";

export default function Dashboard() {

  const defaultCourse = {
    _id: new Date().getTime().toString(), name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New description",
    }
  const facultyAccess = useUserAccess() === 2; // only faculty level
  const adminAccess = useUserAccess() > 2; // only admins or higher
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer)
  const [ showEnrolled, setShowEnrolled ] = useState(false);
  const [ enrolledCourses, setEnrolledCourses ] = useState<any>([]);
  // reserved for editing when adding courses.
  const [ course, setCourse ] = useState({...defaultCourse});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setEnrolledCourses(courses);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchAllCourses = async () => {
    try {
      const allCourses = await courseClient.findAllCourses();
      dispatch(setCourses(allCourses));
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }
  
  const courseDelete = async (courseId: string) => {
    try {
    const status = await courseClient.deleteCourse(courseId);
    console.log(`Delete course status: ${status}`);
    setEnrolledCourses(enrolledCourses.filter((course: any) => course._id !== courseId));
    dispatch(deleteCourse(courseId) as any);
    } catch (error) {
      console.error(error);
    }
  };
  const courseUpdate = async () => {
    await courseClient.updateCourse(course);
    setEnrolledCourses(enrolledCourses.map((c: any) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    }));
    dispatch(updateCourse(course) as any);
  };

  const enrollUser = async (userId: string, courseId: string) => {
    const newEnrollment = await enrollmentClient.enrollUser(userId, courseId);
    console.log(`Enroll user status: ${JSON.stringify(newEnrollment)}`);
    dispatch(addEnrollment( newEnrollment ));
  }
  const unenrollUser = async (userId: string, courseId: string) => {
    const deletedUser = await enrollmentClient.unenrollUser(userId, courseId);
    console.log(`Unenroll user status: ${JSON.stringify(deletedUser)}`);
    dispatch(deleteEnrollment(deletedUser));
  }

  const addNewCourse = async () => {
    try {
      const newCourse = await userClient.createCourse(course);
      dispatch(addCourse(newCourse));
      setEnrolledCourses([ ...enrolledCourses, newCourse ]);
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser, enrolledCourses, courses]);

  useEffect(() => {
    fetchAllCourses();
  }, [showEnrolled]);

  return (
    <div id="wd-dashboard">
      {loading ? <div>Loading...</div> : 
      <div>{ !facultyAccess ? 
        <div className="row">
          {/* only faculties level-access cannot see the enrollment button */}
          <h1 id="wd-dashboard-title" className="col-sm-8 col-9 d-inline">Dashboard</h1>
          <button className="btn btn-primary d-inline float-end col-sm-4 col-3" onClick={() => setShowEnrolled(!showEnrolled)}>Enrollments</button>
        </div> :
        <h1 id="wd-dashboard-title">Dashboard</h1> 
      }
       <hr />
       {error && (<div id="wd-signin-error-message" className="alert alert-danger mb-2 mt-2">{error}</div>) }

      { facultyAccess || adminAccess ? 
      <div id="course-addition-menu" className="faculty-access">
        <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick= { () => {
                      if (enrolledCourses.find( (c:any) => course._id === c._id )) {
                        course._id = new Date().getTime().toString();
                      }
                      addNewCourse();
                      enrollUser(currentUser._id, course._id);
                      setCourse(defaultCourse);
    }} > Add </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={() => {
                      courseUpdate();
                      setCourse(defaultCourse);
                    }
                    } id="wd-update-course-click">
                    Update
            </button>
        </h5><br />
        <input    value={course.name} className="form-control mb-2" 
        onChange={(e) => setCourse( {...course, name: e.target.value} )}/>
        <textarea value={course.description} className="form-control"
        onChange={(e) => setCourse( {...course, description: e.target.value} )}/>
  
        <br /><hr />
      </div> : <div></div>
    }
      
      <h2 id="wd-dashboard-published">Published Courses ({ showEnrolled ? courses.length : enrolledCourses.length })</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">

          {enrolledCourses.map(
            (course: any) => (
            <div className="wd-dashboard-course col" key={course._id} style={{ width: "300px" }}>
              
              <div className="card rounded-3 overflow-hidden">
                <Link to={`/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <img src={course.image && course.image !== "" ? `/images/${course.image}` : "/images/reactjs.jpg"} width="100%" height={160} alt=""/>
                  </Link>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                      {course.description} </p>

            
                      { facultyAccess || adminAccess ? 
                        <div id="course-edit-buttons" className="faculty-access">
                          <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${course._id}/Home`)}> Go </button>
                          <button onClick={(event) => {
                              event.preventDefault();
                              courseDelete(course._id);
                            }} className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete
                          </button>
                          <button id="wd-edit-course-click"
                            onClick={ (event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end" >
                            Edit
                          </button>
                        </div> : 
                        <div id="course-buttons">
                          <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${course._id}/Home`)}> Go </button>
                          <button className="btn btn-danger float-end"
                            onClick={() => unenrollUser(currentUser._id, course._id)}>
                            Unenroll
                          </button>
                        </div>
                      }
                  </div>
              
              </div>
            </div>
          ))}
        
        {showEnrolled && 
            courses.filter((c: any) => !enrolledCourses.some((enrolled: any) => enrolled._id === c._id))
            .map(
            (course: any) => (
              <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                
                <div className="card rounded-3 overflow-hidden">
                  <Link to={`/Kanbas/Courses/${course._id}/Home`}
                        className="wd-dashboard-course-link text-decoration-none text-dark" >
                    <img src={course.image && course.image !== "" ? `/images/${course.image}` : "/images/reactjs.jpg"} width="100%" height={160} alt=""/>
                    </Link>
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        {course.name} </h5>
                      <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 100 }}>
                        {course.description} </p>
                      
                      { adminAccess ? 

                      <div id="course-edit-buttons" className="faculty-access">
                        <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${course._id}/Home`)}> Go </button>
                        <button onClick={(event) => {
                            event.preventDefault();
                            courseDelete(course._id);
                          }} className="btn btn-danger float-end"
                          id="wd-delete-course-click">
                          Delete
                        </button>
                        <button id="wd-edit-course-click"
                          onClick={ (event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end" >
                          Edit
                        </button>
                      </div>

                        : <span></span> }
                        { currentUser.role != "USER" ?
                        <button className="btn btn-success float-end" onClick={() => enrollUser(currentUser._id, course._id)} >
                          Enroll
                        </button> : <span></span>} {/* preventing anonymous users to register for classes */}
                    </div> 
                </div>
              </div>
            ))}
          </div>

      </div>
  </div>  }</div>);}
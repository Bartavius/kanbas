import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as db from "./Database";
import { useEffect, useState } from "react";
import { enroll, unenroll }
  from "./reducer";
export default function Dashboard(
  { courses, course, setCourse, addNewCourse,
    deleteCourse, updateCourse }: {
    courses: any[]; course: any; setCourse: (course: any) => void;
    addNewCourse: () => void; deleteCourse: (course: any) => void;
    updateCourse: () => void; }) {
  
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentReducer.enrollments);
  const [ showEnrolled, setShowEnrolled ] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ displayedCourses, setDisplayedCourses ] = useState(courses);
  const enrolledCourses = courses.filter(
    (course) => enrollments.some(
        (enrollment: any) =>
        enrollment.user === currentUser._id &&
        enrollment.course === course._id
      ));
      
  useEffect( () => {
    if (showEnrolled) {
    setDisplayedCourses(courses.filter(
      (course) => enrollments.some(
          (enrollment: any) =>
          enrollment.user === currentUser._id &&
          enrollment.course === course._id
        )));
      } else {
        setDisplayedCourses(courses);
      }
    }, [showEnrolled, enrollments]
  )
  

  return (
    <div id="wd-dashboard">
      { currentUser.role === "STUDENT" ? 
        <div className="row">
          <h1 id="wd-dashboard-title" className="col-sm-8 col-9 d-inline">Dashboard</h1>
          <button className="btn btn-primary d-inline float-end col-sm-4 col-3" onClick={() => setShowEnrolled(!showEnrolled)}>Enrollments</button>
        </div> :
        <h1 id="wd-dashboard-title">Dashboard</h1> 
      }
       <hr />

      { currentUser.role === "FACULTY" ? 
      <div id="course-addition-menu" className="faculty-access">
        <h5>New Course
            <button className="btn btn-primary float-end"
                    id="wd-add-new-course-click"
                    onClick={addNewCourse} > Add </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={updateCourse} id="wd-update-course-click">
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
      
      <h2 id="wd-dashboard-published">Published Courses ({ displayedCourses.length })</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map(
            (course) => (
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
              
                    
                    
                      { currentUser.role === "FACULTY" ? 
                        <div id="course-edit-buttons" className="faculty-access">
                          <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${course._id}/Home`)}> Go </button>
                          <button onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }} className="btn btn-danger float-end"
                            id="wd-delete-course-click">
                            Delete
                          </button>
                          <button id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end" >
                            Edit
                          </button>
                        </div> : 
                        <div id="course-buttons">
                          <button className="btn btn-primary" onClick={() => navigate(`/Kanbas/Courses/${course._id}/Home`)}> Go </button>
                          {enrolledCourses.find( (c) => c._id === course._id) ? 
                            <button className="btn btn-danger float-end"
                              onClick={() => {
                                dispatch(unenroll(enrollments.find( (e: any) => e.user === currentUser._id && e.course === course._id)._id))}
                                }>
                              Unenroll</button>
                            : <button className="btn btn-success float-end" onClick={() => dispatch(enroll( {userId: currentUser._id, courseId: course._id}))}>
                              Enroll</button>
                          }
                        </div>
                      }
                  </div>
              
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>);}
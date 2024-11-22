import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as courseClient from "./Courses/client";
import * as userClient from "./Account/client";
import * as enrollmentClient from "./enrollmentClient";

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [ showEnrolled, setShowEnrolled ] = useState(false);
  const [ courses, setCourses ] = useState<any>([]);
  const [ allCourses, setAllCourses ] = useState<any>([]);
  const defaultCourse = {
    _id: new Date().getTime().toString(), name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New description",
    }

  // reserved for editing when adding courses.
  const [ course, setCourse ] = useState({...defaultCourse});

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllCourses = async () => {
    try {
      const allCourses = await courseClient.findAllCourses();
      setAllCourses(allCourses);
    } catch (error) {
      console.error(error);
    }
  }
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course); 
    setCourses([ ...courses, newCourse ]);
  };
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    console.log(`Delete course status: ${status}`);
    setCourses(courses.filter((course: any) => course._id !== courseId));
  };
  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(courses.map((c: any) => {
        if (c._id === course._id) { return course; }
        else { return c; }
    })
  );};

  const enrollUser = async (userId: string, courseId: string) => {
    const status = await enrollmentClient.enrollUser(userId, courseId);
    console.log(`Enroll user status: ${status}`);
    fetchCourses();
  }
  const unenrollUser = async (userId: string, courseId: string) => {
    const status = await enrollmentClient.unenrollUser(userId, courseId);
    console.log(`Unenroll user status: ${status}`);
    fetchCourses();
  }

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  useEffect(() => {
    fetchAllCourses();
  }, [showEnrolled]);

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
                    onClick= { () => {
                      if (courses.find( (c:any) => course._id === c._id )) {
                        course._id = new Date().getTime().toString();
                      }
                      addNewCourse();
                      enrollUser(currentUser._id, course._id);
                      setCourse(defaultCourse);
    }} > Add </button>
            <button className="btn btn-warning float-end me-2"
                    onClick={() => {
                      updateCourse();
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
      
      <h2 id="wd-dashboard-published">Published Courses ({ showEnrolled ? allCourses.length : courses.length })</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">

          {courses.map(
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
            allCourses.filter((c: any) => !courses.some((enrolled: any) => enrolled._id === c._id))
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
                      <button className="btn btn-success float-end" onClick={() => enrollUser(currentUser._id, course._id)} >
                        Enroll
                      </button>
                    </div> 
                </div>
              </div>
            ))}
          </div>

      </div>
    </div>);}
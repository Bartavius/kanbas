import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import "./courses_styles.css";

export default function CoursesNavigation() {
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation">
      <ul className="nav nav-pills fs-5 rounded-0 list-group">
        <li className="nav-item">
          <Link
            id="wd-course-home-link" to="/Kanbas/Courses/1234/Home"
            className={`nav-link text-danger border-0 ${pathname === "/Kanbas/Courses/1234/Home" ? "active" : ""}`}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="wd-course-modules-link" to="/Kanbas/Courses/1234/Modules"
            className={`nav-link text-danger border-0 ${pathname.includes("Modules") ? "active" : ""}`}>
            Modules
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="wd-course-piazza-link" to="/Kanbas/Courses/1234/Piazza"
            className={`nav-link text-danger border-0 ${pathname.includes("Piazza") ? "active" : ""}`}>
            Piazza
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="wd-course-zoom-link" to="/Kanbas/Courses/1234/Zoom"
            className={`nav-link text-danger border-0 ${pathname.includes("Zoom") ? "active" : ""}`}>
            Zoom
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="wd-course-quizzes-link" to="/Kanbas/Courses/1234/Assignments"
            className={`nav-link text-danger border-0 ${pathname.includes("Assignments") ? "active" : ""}`}>
            Assignments
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="wd-course-assignments-link" to="/Kanbas/Courses/1234/Quizzes"
            className={`nav-link text-danger border-0 ${pathname.includes("Quizzes") ? "active" : ""}`}>
            Quizzes
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="wd-course-grades-link" to="/Kanbas/Courses/1234/Grades"
            className={`nav-link text-danger border-0 ${pathname.includes("Grades") ? "active" : ""}`} >
            Grades
          </Link>
        </li>
        <li className="nav-item">
          <Link
            id="wd-course-people-link" to="/Kanbas/Courses/1234/People"
            className={`nav-link text-danger border-0 ${pathname.includes("People") ? "active" : ""}`}>
            People
          </Link>
        </li>
      </ul>
    </div>
  );
}

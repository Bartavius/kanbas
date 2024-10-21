import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { courses } from "../Database";

export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation">
      <ul className="nav nav-pills fs-5 rounded-0 list-group">
        {links.map((link) => 
          <li className="nav-item">
          <Link
            id="wd-course-home-link" to={`/Kanbas/Courses/${course && course._id}/${link}`}
            className={`nav-link text-danger border-0 ${pathname === `/Kanbas/Courses/${course && course._id}/${link}` ? "active-secondary-nav" : ""}`}>
            {link}
          </Link>
        </li>
        )}
      </ul>
    </div>
  );
}

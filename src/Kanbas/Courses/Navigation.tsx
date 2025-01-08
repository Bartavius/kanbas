import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router";

export default function CoursesNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  return (
    <div id="wd-courses-navigation">
      <ul className="nav nav-pills fs-5 rounded-0 list-group">
        {links.map((link) => 
          <li className="nav-item" key={link}>
          <Link
            id="wd-course-home-link" to={`/Kanbas/Courses/${cid}/${link}`}
            className={`nav-link text-danger border-0 ${pathname.includes(`/Kanbas/Courses/${cid}/${link}`) ? "active-secondary-nav" : ""}`}>
            {link}
          </Link>
        </li>
        )}
      </ul>
    </div>
  );
}

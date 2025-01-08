import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const active = (path: string) =>
    pathname.includes(path) ? "active-secondary-nav" : "";

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <ul className="nav nav-pills fs-5 rounded-0 list-group">
        {links.map((link: string) => (
          <li className="nav-item" key={link}>
            <Link
              to={`/Kanbas/Account/${link}`}
              className={`nav-link list-group-item text-danger border-0 mb-3 pl-2 ${active(link)}`}
            >
              {" "}
              {link}{" "}
            </Link>
          </li>
        ))}
        <li className="nav-item" key="Users">
          {currentUser && currentUser.role === "ADMIN" && (
            <Link
              to={`/Kanbas/Account/Users`}
              className={`nav-link text-danger border-0 mb-3 pl-2 ${active("Users")}`}
            >
              {" "}
              Users{" "}
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
}

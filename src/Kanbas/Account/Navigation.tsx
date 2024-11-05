import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  // " Reimplement the Account Navigation sidebar so that it hides the Signin and Signup navigation links
  // if a user is already signed in, and hides the Profile link if a user is not yet signed in.

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <ul className="nav nav-pills fs-5 rounded-0 list-group">
        {links.map( ( link: string ) => (
          <li className="nav-item">
          <Link to={`/Kanbas/Account/${link}`}  className={`nav-link text-danger border-0 mb-3 pl-2 ${pathname.includes(link) ? "active-secondary-nav" : ""}`}> {link}  </Link>
          </li>
        ))}</ul></div>
);}

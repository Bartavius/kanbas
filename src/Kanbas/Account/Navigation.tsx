import { Link } from "react-router-dom";
import { useLocation } from "react-router";
export default function AccountNavigation() {
  const { pathname } = useLocation();
  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <ul className="nav nav-pills fs-5 rounded-0 list-group">
      <li className="nav-item">
      <Link to={"/Kanbas/Account/Signin"}  className={`nav-link text-danger border-0 mb-3 pl-2 ${pathname.includes("Signin") ? "active" : ""}`}> Signin  </Link>
      </li>
      
      <li className="nav-item">
        <Link to={"/Kanbas/Account/Signup"}  className={`nav-link text-danger border-0 mb-3 pl-2 ${pathname.includes("Signup") ? "active" : ""}`}> Signup  </Link>
      </li>
      <li className="nav-item">
      <Link to={"/Kanbas/Account/Profile"} className={`nav-link text-danger border-0 mb-3 pl-2 ${pathname.includes("Profile") ? "active" : ""}`}> Profile </Link>
    </li></ul></div>
);}

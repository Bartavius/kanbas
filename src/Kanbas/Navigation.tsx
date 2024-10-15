import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { useLocation } from "react-router";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }} 
    className="list-group rounded-0 position-fixed
    bottom-0 top-0 d-none d-md-block bg-black z-2">
      
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank" rel="noreferrer"
      className="list-group-item bg-black border-0 text-center">
      <img width = "75px" src="/images/northeastern_icon.png" alt="northeastern university logo" />
      </a>
      
      <Link to="/Kanbas/Account" id="wd-account-link"
      className={`nav-link list-group-item text-center border-0 bg-black text-white ${pathname.includes("Account") ? "active-primary" : ""}`}>
      <FaRegCircleUser className="fs-1 text text-danger" /><br />
      Account</Link>
      
      <Link to="/Kanbas/Dashboard" id="wd-dashboard-link"
      className={`nav-link list-group-item text-center border-0 
      bg-black text-white ${pathname.includes("Dashboard") ? "active-primary" : ""}`}>
      <AiOutlineDashboard className="fs-1 text-danger" /><br />
      Dashboard</Link>
      
      <Link to="/Kanbas/Courses" id="wd-course-link"
      className={`nav-link list-group-item text-center border-0 
        bg-black text-white ${pathname.includes("Courses") ? "active-primary" : ""}`}>
      <LiaBookSolid className="fs-1 text-danger" /><br />
      Courses</Link>

      <Link to="/Kanbas/Calendar" id="wd-calendar-link"
      className={`nav-link list-group-item text-center border-0 
        bg-black text-white ${pathname.includes("Calendar") ? "active-primary" : ""}`}>
      <IoCalendarOutline className="fs-1 text-danger" /><br/>
      Calendar</Link>
      
      <Link to="/Kanbas/Inbox" id="wd-inbox-link"
      className={`nav-link list-group-item text-center border-0 
        bg-black text-white ${pathname.includes("Inbox") ? "active-primary" : ""}`}>
      <FaInbox className="fs-1 text-danger"/><br />
      Inbox</Link>

      <Link to="/Labs" id="wd-labs-link"
      className="list-group-item text-white bg-black text-center border-0">
      <LiaCogSolid className="fs-1 text-danger"/> <br />
      Labs</Link>
    </div>
);}

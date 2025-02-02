import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser, FaLinkedin, FaGithub } from "react-icons/fa6";

export default function KanbasNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard",            path: "/Kanbas/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses",              path: "/Kanbas/Courses",   icon: LiaBookSolid },
    { label: "Calendar",             path: "/Kanbas/Calendar",  icon: IoCalendarOutline },
    { label: "Inbox",                path: "/Kanbas/Inbox",     icon: FaInbox },
    { label: "Notes",                path: "/Kanbas/Notes",     icon: LiaCogSolid },
    // { label: "Labs",              path: "/Labs",             icon: LiaCogSolid },
  ];

  return (
    <div id="wd-kanbas-navigation" style={{ width: 110 }} 
    className="list-group rounded-0 position-fixed
    bottom-0 top-0 d-none d-md-block bg-black z-2">
      
      <a href="https://www.northeastern.edu/" id="wd-neu-link" target="_blank" rel="noreferrer"
      className="list-group-item bg-black border-0 text-center">
      <img width = "75px" src="/images/northeastern_icon.png" alt="northeastern university logo" />
      </a>
      
      <Link to="/Kanbas/Account" className={`list-group-item text-center border-0 bg-black
            ${pathname.includes("Account") ? "bg-white text-danger" : "bg-black text-white"}`}>
        <FaRegCircleUser className={`fs-1 ${pathname.includes("Account") ? "text-danger" : "text-white"}`} />
        <br />
        Account
    </Link>

      {links.map((link) => (
        <Link key={link.path} to={link.path} className={`list-group-item bg-black text-center border-0
              ${pathname.includes(link.label) ? "text-danger bg-white" : "text-white bg-black"}`}>
          {link.icon({ className: "fs-1 text-danger"})}
          <br />
          {link.label}
        </Link>
      ))}

      <a href="https://linkedin.com/in/jlojanarungsiri" target="_blank" className="list-group-item bg-black border-0 text-center text-white">
        <FaLinkedin className="fs-1 text-danger" />
        LinkedIn
      </a>
      <a href="https://github.com/Bartavius" target="_blank" className="list-group-item bg-black border-0 text-center text-white">
        <FaGithub className="fs-1 text-danger" />
        GitHub
      </a>

    </div>
);}

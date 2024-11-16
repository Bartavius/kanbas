import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Courses from "./Courses";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import "./styles.css";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector } from "react-redux";
import ProtectedCourseRoute from "./ProtectedCourseRoute";
export default function Kanbas() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-kanbas">
      <KanbasNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to={ currentUser ? "/Kanbas/Account/Profile" : "/Kanbas/Account/Signin" } />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<ProtectedRoute> <Dashboard/> </ProtectedRoute> } />
          <Route path="/Courses" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> } />
          <Route path="/Courses/:cid/*" element={ <ProtectedRoute> <ProtectedCourseRoute><Courses/></ProtectedCourseRoute> </ProtectedRoute> } />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  )
}

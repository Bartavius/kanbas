import { Routes, Route, Navigate } from "react-router";
import AccountNavigation from "./Navigation";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
export default function Account() {
  return (
    <div id="wd-account-screen">
      <div className="row">
        <div className="col-1">
          <AccountNavigation/>
        </div>
        <div className="col-4 wd-main-content-offset p-1">
          <Routes>
            <Route path="/"
                  element={<Navigate to="/Kanbas/Account/Signin" />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
);}

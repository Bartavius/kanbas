import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [user, setUser] = useState(currentUser);

  const updateProfile = async () => {
    try {
      await client.updateUser(user);
      dispatch(setCurrentUser(user));
      console.log("Update ran");
    } catch (error: any) {
      setError(error.response.data.message || "Error updating profile");
    }
  };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/Kanbas/Account/Signin");
    }
  }, [currentUser, navigate]);

  return (
    <div className="wd-profile-screen">
      {error && <div id="wd-signup-error-message" className="alert alert-danger mb-2 mt-2">{error}</div>}
      <h3>Profile</h3>
      {currentUser && (
        <div>
          <input value={user.username} id="wd-username" placeholder="Username" className="form-control mb-2"
            onChange={(e) => setUser({ ...user, username: e.target.value })}/>
          <input value={user.password} id="wd-password" placeholder="Password" className="form-control mb-2"
            onChange={(e) => setUser({ ...user, password: e.target.value })} />
          <input value={user.firstName} id="wd-firstname"  placeholder="First Name" className="form-control mb-2"
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}/>
          <input value={user.lastName} id="wd-lastname" placeholder="Last Name" className="form-control mb-2"
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}/>
          <input value={user.dob} id="wd-dob" placeholder="Date of Birth" className="form-control mb-2"
            onChange={(e) => setUser({ ...user, dob: e.target.value })} type="date"/>
          <input value={user.email} id="wd-email" placeholder="Email" className="form-control mb-2"
            onChange={(e) => setUser({ ...user, email: e.target.value })}/>
          <select value={user.role} className="form-control mb-2" id="wd-role"
            onChange={(e) => setUser({ ...user, role: e.target.value })}>
            <option value="USER">User Role</option> {/* will have to prevent this also */}
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="TA">Ta</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">Update</button>
          <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">Sign out</button>
        </div>
      )}
    </div>
  );
}

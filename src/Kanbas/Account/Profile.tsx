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

  const updateProfile = async () => {
    try {
      const updatedProfile = await client.updateUser(currentUser);
      dispatch(setCurrentUser(updatedProfile));
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
          <input value={currentUser.username} id="wd-username" placeholder="Username" className="form-control mb-2"
            onChange={(e) => dispatch(setCurrentUser({ ...currentUser, username: e.target.value }))}/>
          <input value={currentUser.password} id="wd-password" placeholder="Password" className="form-control mb-2"
            onChange={(e) => dispatch(setCurrentUser({ ...currentUser, password: e.target.value }))} />
          <input value={currentUser.firstName} id="wd-firstname"  placeholder="First Name" className="form-control mb-2"
            onChange={(e) => dispatch(setCurrentUser({ ...currentUser, firstName: e.target.value }))}/>
          <input value={currentUser.lastName} id="wd-lastname" placeholder="Last Name" className="form-control mb-2"
            onChange={(e) => dispatch(setCurrentUser({ ...currentUser, lastName: e.target.value }))}/>
          <input value={currentUser.dob} id="wd-dob" placeholder="Date of Birth" className="form-control mb-2"
            onChange={(e) => dispatch(setCurrentUser({ ...currentUser, dob: e.target.value }))} type="date"/>
          <input value={currentUser.email} id="wd-email" placeholder="Email" className="form-control mb-2"
            onChange={(e) => dispatch(setCurrentUser({ ...currentUser, email: e.target.value }))}/>
          <select value={currentUser.role} className="form-control mb-2" id="wd-role"
            onChange={(e) => dispatch(setCurrentUser({ ...currentUser, role: e.target.value }))}>
            <option value="USER">User Role</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
          <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">Update</button>
          <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">Sign out</button>
        </div>
      )}
    </div>
  );
}

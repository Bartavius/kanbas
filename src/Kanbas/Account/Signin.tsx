import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/Kanbas/Dashboard");
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div id="wd-signin-screen">
      <h3>Sign in</h3>
      {error && (<div id="wd-signin-error-message" className="alert alert-danger mb-2 mt-2">{error}</div>) }
      <input id="wd-username" placeholder="username" className="form-control mb-2" defaultValue={credentials.username}
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}/>
      <input id="wd-password" placeholder="password" type="password" className="form-control mb-2" defaultValue={credentials.password}
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}/>
      <button onClick={signin}  id="wd-signin-btn" className="btn btn-primary w-100"> Sign in </button>
      <Link  id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
    </div>
);}

import { useEffect, useState } from "react";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams, useNavigate } from "react-router";
import * as client from "../../Account/client";
import { useSelector } from "react-redux";
import { FaPencil } from "react-icons/fa6";
export default function PeopleDetails({ baseLink }: { baseLink: string }) {
  // some comments on design choices:
  // instead of navigate -1, navigate back to user to avoid "stacking" user details when going from one user to another
  // admin CANNOT delete their own account, that just wouldn't make sense so the button is disabled for admin. They also
  // cannot demote themselves because that also wouldn't make sense.

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { uid } = useParams();
  const [user, setUser] = useState<any>({});
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = {
      ...user,
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
    };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    navigate(baseLink);
  };

  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    navigate(baseLink);
  };
  const fetchUser = async () => {
    if (!uid) return;
    const user = await client.findUserById(uid);
    setUser(user);
    setName(`${user.firstName} ${user.lastName}`);
    setRole(`${user.role}`);
    setEmail(`${user.email}`);
    setEditing(false);
  };
  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);
  if (!uid) return null;

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={() => navigate(baseLink)}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && currentUser.role === "ADMIN" && (
          <FaPencil
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={async () => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}

        <div
          className="wd-name"
          onClick={() => {
            !editing && currentUser.role === "ADMIN" && setEditing(true);
          }}
        >
          {user.firstName} {user.lastName}
        </div>

        {user && editing && currentUser.role === "ADMIN" && (
          <div>
            <input
              className="form-control w-50 wd-edit-name"
              defaultValue={`${user.firstName} ${user.lastName}`}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />
            <input
              type="email"
              className="form-control mt-1 w-75 wd-edit-email"
              defaultValue={`${user.email}`}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            />
            <select
              className="form-select w-75 mt-1 mb-1 wd-edit-role"
              disabled={currentUser._id === uid} // cannot edit your own role (wouldn't make sense to be able to demote / promote yourself)
              defaultValue={`${user.role}`}
              onChange={(e) => setRole(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveUser();
                }
              }}
            >
              <option value="USER">Unregistered User</option>
              <option value="STUDENT">Student</option>
              <option value="FACULTY">Faculty</option>
              <option value="TA">Assistant</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
        )}
      </div>
      <b>Email:</b> <span className="wd-email"> {user.email} </span> <br />
      <b>Roles:</b> <span className="wd-roles"> {user.role} </span> <br />
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>
      <br />
      <b>Total Activity:</b>
      <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      {currentUser.role === "ADMIN" && (
        <div id="wd-people-control-buttons">
          <button
            onClick={() => deleteUser(uid)}
            className="btn btn-danger float-end wd-delete"
            disabled={currentUser._id === uid}
          >
            Delete
          </button>
          <button
            onClick={() => navigate(baseLink)}
            className="btn btn-secondary float-start float-end me-2 wd-cancel"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

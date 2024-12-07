import { FaPlus, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PeopleDetails from "./Details";
import { useEffect, useState } from "react";

export default function PeopleTable({ users = []}: { users?: any[] }) {
  const [filteredUsers, setFilteredUsers] = useState<any[]>(users);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const fetchUsers = () => {
    const filteredUsers = users.filter((user: any) => {
      const roleMatch = role ? user.role === role : true;
      const nameMatch = name
        ? user.firstName.toLowerCase().includes(name.toLowerCase()) || user.lastName.toLowerCase().includes(name.toLowerCase())
        : true;
      return roleMatch && nameMatch;
    });
    setFilteredUsers(filteredUsers);
  };

  useEffect(()=> {
    fetchUsers();
  }, [role, name])

  return (
    <div id="wd-people-table">
      <div id="wd-people-filters">
      <input
        onChange={(e) => setName(e.target.value)}
        placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>{" "}
        <option value="USERS">Unregistered Users</option>{" "}
        <option value="STUDENT">Students</option>
        <option value="TA">Assistants</option>{" "}
        <option value="FACULTY">Faculty</option>
        <option value="ADMIN">Administrators</option>
      </select>
    </div>
      <PeopleDetails/>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
            <tbody>
            {filteredUsers.map((user: any) => (
                <tr key={user._id}>
                  <td className="wd-full-name text-nowrap">
                    <Link to={`/Kanbas/Account/Users/${user._id}`} className="text-danger text-decoration-none">
                      <FaUserCircle className="me-2 fs-1 text-secondary" />
                      <span className="wd-first-name">{user.firstName} </span>
                      <span className="wd-last-name">{user.lastName}</span>
                    </Link>
                  </td>
                  <td className="wd-login-id">{user.loginId}</td>
                  <td className="wd-section">{user.section}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="wd-last-activity">{user.lastActivity}</td>
                  <td className="wd-total-activity">{user.totalActivity}</td>
                </tr>
              ))}
            </tbody>
      </table>
    </div> );}
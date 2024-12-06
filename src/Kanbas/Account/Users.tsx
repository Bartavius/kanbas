import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { useSelector } from "react-redux";
export default function Users() {
  const {currentUser} = useSelector((state:any) => state.accountReducer);
  const navigate = useNavigate();
  if (currentUser.role != "ADMIN") {
    alert("User cannot access this page.");
    navigate(-1);
  }


  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const { uid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const fetchAllUsers = async () => {
    const allNewUsers = await client.findAllUsers();
    setAllUsers(allNewUsers);
    setUsers(allNewUsers);
  };

  const fetchUsers = async () => {
    const filteredUsers = allUsers.filter((user: any) => {
      const roleMatch = role ? user.role === role : true;
      const nameMatch = name
        ? user.firstName.toLowerCase().includes(name.toLowerCase()) || user.lastName.toLowerCase().includes(name.toLowerCase())
        : true;
      return roleMatch && nameMatch;
    });
    setUsers(filteredUsers);
  };


  useEffect(() => {
    fetchAllUsers();
    setLoading(false);
  }, [uid]);

  useEffect(()=> {
    fetchUsers();
    setLoading(false);
  }, [role, name, users])

  return (
    <div>
      <h2>Users</h2>
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
      {loading ? <h4>Loading...</h4> : <PeopleTable users={users} />}
    </div>
  );
}

import { useState, useEffect } from "react";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
export default function Users() {
    // const navigate = useNavigate();
    // const {currentUser} = useSelector((state:any) => state.account.reducer);
    // const access = currentUser.role === "ADMIN";
    // if (!access) {
    //     alert("User does not have access to this page.") // change to modal in future impl
    //     navigate(-1);
    // }

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  const fetchAllUsers = async () => {
    const allNewUsers = await client.findAllUsers();
    setAllUsers(allNewUsers);
    setUsers(allNewUsers);
    setLoading(false);
  }

  const fetchUsers = async () => {
    const filteredUsers = allUsers.filter((user: any) => {
      const roleMatch = role ? user.role === role : true;
      const nameMatch = name
        ? user.firstName.toLowerCase().includes(name.toLowerCase()) || user.lastName.toLowerCase().includes(name.toLowerCase())
        : true;
      return roleMatch && nameMatch;
    });
    setUsers(filteredUsers);
    setLoading(false);
  };

  const filterUsersByRole = async (role: string) => {
    setRole(role);
  };

  const filterUsersByName = async (name: string) => {
    setName(name);
  };


  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(()=> {
    fetchUsers();
  }, [role, name, users])


  // comments on design choice:
  // filtering is done locally instead because I don't see the efficientcy in calling the API every time the input changes.
  // it makes sense to fetch all users from the API and then filter locally instead.


  return (
    <div>
      <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
        <FaPlus className="me-2" />
        Users
      </button>
      <input
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="form-control float-start w-25 me-2 wd-filter-by-name"
      />
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
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

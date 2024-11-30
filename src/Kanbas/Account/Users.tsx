import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
export default function Users() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const { uid } = useParams();

  const fetchAllUsers = async () => {
    const allUsers = await client.findAllUsers();
    setAllUsers(allUsers);
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
  }, [uid]);

  useEffect(()=> {
    fetchUsers();
  }, [role, name])


  return (
    <div>
      <h3>Users</h3>
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

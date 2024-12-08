import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
export default function Users() {
  const {currentUser} = useSelector((state:any) => state.accountReducer);
  const navigate = useNavigate();
  if (currentUser.role !== "ADMIN") {
    alert("User cannot access this page.");
    navigate(-1);
  }

  const [allUsers, setAllUsers] = useState<any[]>([]);
  const { uid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllUsers = async () => {
    const allNewUsers = await client.findAllUsers();
    setAllUsers(allNewUsers);
    setLoading(false);
  };
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${allUsers.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${allUsers.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setAllUsers([...allUsers, user]);
  };


  useEffect(() => {
    fetchAllUsers();
  }, [uid]);

  return (
    <div key={Date.now()}>
      <h2>Users</h2>
      {loading ? <h4>Loading...</h4> : 
      <div>
        <button onClick={createUser} className="float-end btn btn-danger wd-add-people">
          <FaPlus className="me-2" /> Users
        </button>
        <PeopleTable users={allUsers} baseLink={"/Kanbas/Account/Users"}/>
      </div>
      }
    </div>
  );
}

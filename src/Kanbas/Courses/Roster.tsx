import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import PeopleTable from "../Courses/People/Table";
import * as client from "./client";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";
export default function Roster() {
  const {currentUser} = useSelector((state:any) => state.accountReducer);
  const navigate = useNavigate();
  if (currentUser.role !== "ADMIN") {
    alert("User cannot access this page.");
    navigate(-1);
  }

  const [roster, setRoster] = useState<any[]>([]);
  const { cid, uid } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchRoster = async () => {
    if (!cid) return;
    try {
    const allNewUsers = await client.findPeopleFromCourse(cid);
    setRoster(allNewUsers);
    setLoading(false);
    } catch (error) {
        console.error();
    }
  };
  // create students (enroll students)
//   const createUser = async () => {
//     const user = await client.createUser({
//       firstName: "New",
//       lastName: `User${allUsers.length + 1}`,
//       username: `newuser${Date.now()}`,
//       password: "password123",
//       email: `email${allUsers.length + 1}@neu.edu`,
//       section: "S101",
//       role: "STUDENT",
//     });
//     setAllUsers([...allUsers, user]);
//   };


  useEffect(() => {
    fetchRoster();
  }, [uid]);

  return (
    <div key={Date.now()}>
      <h2>Roster</h2>
      {loading ? <h4>Loading...</h4> : 
      <div className="container" id="wd-kanbas-roster">
        {currentUser.role === "ADMIN" &&
        <button onClick={() => {/*createUser should be enrollUser but not sure how to design this yet. Maybe have it open a new users tab
            with all users and then just filter through them and have enroll/unenroll button next to them?*/}} className="float-end btn btn-danger wd-add-people">
          <FaPlus className="me-2" /> Users
        </button> }
        <PeopleTable users={roster} baseLink={`/Kanbas/Courses/${cid}/People`}/>
      </div>
      }
    </div>
  );
}

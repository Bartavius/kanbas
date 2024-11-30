import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as enrollmentClient from "../../enrollmentClient";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUserAccess } from "../../Account/UserAccess";

export default function PeopleTable({ users = [] }: { users?: any[] }) {

  const { cid } = useParams();
  const { currentUser } = useSelector( (state: any) => state.accountReducer );

  // const [people, setPeople] = useState<any>(users);
  const [editing, setEditing] = useState(false);
  const editPrivilege = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  // const fetchPeople = async() => {
  //   if (!cid) return;
  //   try {
  //     const allPeople = await enrollmentClient.findPeopleInCourse(cid);
  //     setPeople(allPeople);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(
  //   () => {
  //     fetchPeople();
  //   }, [cid, currentUser] // this needs to update the table when i update my OWN profile // eventually, when I update anyone's profile
  // )
  // console.log(`Current User: ${JSON.stringify(currentUser)}`);
  // console.log(`All People in ${cid}: ${JSON.stringify(people)}`);

  return (
    <div id="wd-people-table">
      { editPrivilege ? <button className="btn btn-primary float-end me-4 mb-3">Add User</button>: <span></span> }
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {editPrivilege ? <th>Edit User</th> : <th></th>}
          </tr>
        </thead>
            <tbody>
            {users.map((user: any) => (
                <tr key={user._id}>
                  <td className="wd-full-name text-nowrap">
                    <FaUserCircle className="me-2 fs-1 text-secondary" />
                    <span className="wd-first-name">{user.firstName} </span>
                    <span className="wd-last-name">{user.lastName}</span>
                  </td>
                  <td className="wd-login-id">{user.loginId}</td>
                  <td className="wd-section">{user.section}</td>
                  <td className="wd-role">{user.role}</td>
                  <td className="wd-last-activity">{user.lastActivity}</td>
                  <td className="wd-total-activity">{user.totalActivity}</td>

                  {editPrivilege ?
                  <td className="wd-people-edit-user">
                    <button className="btn btn-warning me-1" onClick={() => setEditing(true)}>Edit</button>
                    <button className="btn btn-danger me-1">Delete</button> {/* delete user and also add form below when selecting a user that appears at the bottom */}
                  </td> : <th></th>
                  }
                </tr>
              ))}
            </tbody>
      </table>

      {/*
      - would need to load the person clicked in edit
      - need a local person variable specifically for editing
      */}

      {/* {editing && 
      <div>
        <div className="row mb-3">
          <input type="text" className="form-control w-25 d-inline col" placeholder="First Name" onChange={() => updatePerson}/>
          <input type="text" className="form-control w-25 d-inline col" placeholder="First Name" onChange={() => updatePerson}/>
        </div>
         {useUserAccess() > 2 && <div>
          <input type="text" className="form-control w-50 mb-3" placeholder={person.loginID} />
          <input type="text" className="form-control w-50 mb-3" placeholder={person.section} />
          </div>
         }
        <select name="wd-course-role-edit" id="course-role-edit" onChange={() => updatePerson} disabled={person.role === "ADMIN"}> 
          <option selected={person.role === "STUDENT"} value="STUDENT">Student</option>
          <option selected={person.role === "TA"} value="TA">TA</option>
          <option selected={person.role === "FACULTY"} value="FACULTY">Faculty</option>
          <option selected={person.role === "ADMIN"} value="ADMIN">ADMIN</option>
        </select>
        {useUserAccess() > 2 && <div>
          <input type="text" className="form-control w-50 mb-3" placeholder={person.lastActivity} />
          <input type="text" className="form-control w-50 mb-3" placeholder={person.totalActivity} />
          </div>
        }
        
      
      </div>
      } */}


    </div> );}
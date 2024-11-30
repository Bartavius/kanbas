import { Navigate } from "react-router";
import { useUserAccess } from "../../Account/UserAccess";

export default function ProtectedPrivilegeRoute( {level, children} : {level: number, children: any}) {
    const facultyAccess = useUserAccess() >= level; // minimum access level, 0 = anonymous, 1 = student, 2 = TA, 3 = Faculty, 4 = Admin
    if (!facultyAccess) {
        alert("User does not have access to this page.") // change to modal in future impl
        return <Navigate to="/Kanbas/Dashboard"/>
    } else {
        return children;
    }
}
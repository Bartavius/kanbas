import { Navigate } from "react-router";
import { useUserAccess } from "../../Account/UserAccess";

export default function ProtectedPrivilegeRoute( {children} : {children: any}) {
    const facultyAccess = useUserAccess() < 1; // if user is not at least the same level as a faculty
    if (!facultyAccess) {
        alert("User does not have access to this page.") // change to modal in future impl
        return <Navigate to="/Kanbas/Dashboard"/>
    } else {
        return children;
    }
}
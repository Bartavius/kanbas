import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
export default function ProtectedCourseRoute({ children }: { children: any }) {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const enrollments = useSelector((state:any) => state.enrollmentReducer.enrollments);
    const { cid } = useParams();
    const userIsEnrolled = enrollments.find( (e: any) => currentUser._id === e.user && cid === e.course);
    if (userIsEnrolled) {
        return children;
    } else {
        alert("You are not enrolled in that course.");
        return <Navigate to="/Kanbas/Dashboard" />;
    }

}
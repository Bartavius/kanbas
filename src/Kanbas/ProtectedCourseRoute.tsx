import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import * as enrollmentClient from "./enrollmentClient";
import { useEffect, useState } from "react";
import { setEnrollment } from "./reducer";

export default function ProtectedCourseRoute({ children }: { children: any }) {
    const dispatch = useDispatch();
    const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const { cid } = useParams();

    const [loading, setLoading] = useState(true);

    const getEnrollments = async () => {
        try {
            const newEnrollments = await enrollmentClient.getEnrollments();
            dispatch(setEnrollment(newEnrollments));
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
        
    };

    useEffect(() => {
        getEnrollments();
    }, [dispatch]);

    // Wait until enrollments are loaded
    if (loading || enrollments.length === 0) {
        return <div>Loading...</div>;
    }
    const userIsEnrolled = enrollments.find((e: any) => currentUser._id === e.user && cid === e.course);
    if (userIsEnrolled) {
        return children;
    } else {
        alert("You are not enrolled in that course.");
        return <Navigate to="/Kanbas/Dashboard" />;
    }
}

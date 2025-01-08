import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export default function ProtectedUsersRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser.role === "ADMIN") {
    return children;
  } else {
    return <Navigate to="/Kanbas/Account/Profile" />;
  }
}

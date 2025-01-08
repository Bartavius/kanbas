import { useSelector } from "react-redux";

export function useUserAccess() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    if (currentUser.role === "ADMIN") {
        return 3;
    } else if (currentUser.role === "FACULTY") {
        return 2;
    } else if (currentUser.role === "TA") {
        return 1;
    } else {
        return 0;
    }
}
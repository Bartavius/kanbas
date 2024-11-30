import { useSelector } from "react-redux";

export function useUserAccess() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    // could potentially update in the future to an array and then take in ROLE then compare index
    if (currentUser && currentUser.role === "ADMIN") {
        return 4;
    } else if (currentUser && currentUser.role === "FACULTY") {
        return 3;
    } else if (currentUser && currentUser.role === "TA") {
        return 2;
    } else if (currentUser && currentUser.role === "STUDENT") {
        return 1;
    } else {
        return 0;
    }
}
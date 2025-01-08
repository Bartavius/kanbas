import { useSelector } from "react-redux";
import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
    const { currentUser } = useSelector( (state: any) => state.accountReducer );
    return (
        <div>
            <h2>Home</h2>
            <div className="d-flex" id="wd-home">
                <div className="flex-fill">
                    <Modules />
                </div>
                {currentUser.role === "FACULTY" ? 
                    <div className="d-none d-xxl-block">
                        <CourseStatus />
                    </div>
                    : <div></div>
                }
            </div>
        </div>
    )
}
  
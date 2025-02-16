import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import { useSelector } from "react-redux";
import Assignment from "./Assignments/Assignment";
import Roster from "./People/Roster";
import Quizzes from "./Quizzes";
import Quiz from "./Quizzes/Quiz";
import QuizEditor from "./Quizzes/Editor";
import Take from "./Quizzes/Take";
import TakeQuestion from "./Quizzes/TakeQuestion";

export default function Courses() {
    const { cid } = useParams();
    const { pathname } = useLocation();
    const { courses }  = useSelector((state:any) => state.coursesReducer);
    const course = courses.find((c: any) => cid === c._id);

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
            <FaAlignJustify className="me-4 fs-4 mb-1" />
            {course && course.name} &gt; {pathname.split("/")[4]} </h2><hr />
            <div className="d-flex">
                <div className="d-none d-md-block">
                    <CoursesNavigation />
                </div>
                <div className="flex-fill">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        {/* in the future, the student should be able to click the assignment with the aid, and redirect to a page
                        that is not the editor. So, the current editor's route will have to change to .../edit at the end
                        and there should be a new, separate link for assignment viewing */}
                        <Route path="Assignments/:aid" element={<Assignment /> } />
                        <Route path="Assignments/:aid/Editor" element={<AssignmentEditor />} />
                        <Route path="Zoom" element={<h2>Zoom</h2>} />
                        <Route path="Quizzes" element={<Quizzes />} />
                        <Route path="Quizzes/:qid" element={<Quiz />} />
                        <Route path="Quizzes/:qid/Take/*" element={<Take />} />
                        <Route path="Quizzes/:qid/Take/:qNum" element={<TakeQuestion />} />
                        <Route path="Quizzes/:qid/Editor" element={<QuizEditor />} />
                        <Route path="Grades" element={<h2>Grades</h2>} />
                        <Route path="Piazza" element={<h2>Piazza</h2>} />
                        <Route path="People" element={<Roster />} />
                        <Route path="People/:uid" element={<Roster />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}
import { useParams } from "react-router";
import * as quizClient from "./client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import SectionControlButton from "../Assignments/SectionControlButton";
import { Link } from "react-router-dom";

export default function Quizzes() {
  const { cid } = useParams();
  const [quizzes, setQuizzes] = useState<any>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);

  // TODO: if faculty / admin, can edit quizzes

  const fetchQuizzes = async () => {
    if (!cid) return;
    try {
      const loadedQuizzes = await quizClient.getQuizzesFromCourse(cid);
      setQuizzes(loadedQuizzes);
      console.log(quizzes);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuizzes();
  }, [cid]);

  return (
    <div className="list-group-item p-0 mb-5 fs-5 border-gray">
      {loading ? (
        <h5>...Loading</h5>
      ) : (
        <div id="wd-quizzes-list">
          <p>
            ADD SEARCH AND +QUIZ BUTTON HERE. THE SEARCH SHOULD BE FULLY
            FUNCTIONAL AS A NAME FILTER
          </p>
          <div className="wd-assignment-title p-3 ps-2 bg-secondary">
            {(currentUser.role === "FACULTY" ||
              currentUser.role === "ADMIN") && (
              <BsGripVertical className="me-2 fs-3" />
            )}
            <GoTriangleDown />
            QUIZZES
            <SectionControlButton percent="100" />
            {/* MIGHT HAVE TO CHANGE THIS */}
          </div>
          <ul className="list-group">
            {quizzes.map((quiz: any) => (
              <li className="list-group-item list-group-item p-3 ps-1 rounded-0">
                <div className="row align-items-center">
                  <div className="col-2">
                    {/* SECTION BUTTONS GO RIGHT HERE*/}
                  </div>
                  <div className="col-8 text-start">
                    <Link to={`${quiz._id}`}>{quiz.title}</Link>
                    <p>
                      NEED TO ADD OTHER DETAILS LIKE QUIZ TAKEN, GRADE ETC.
                      RIGHT IN THIS DIV. MAKE SURE TO ADD SECTION BUTTONS,
                      FILTERS, EDIT BUTTONS, PUBLISH BUTTON, ETC.
                    </p>
                  </div>
                  <div className="col-2">
                    <p>
                      CONTROL BUTTONS RIGHT HERE. EDIT, PUBLISH, DELETE, AND
                      THREE DOTS SHOULD BE HERE
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

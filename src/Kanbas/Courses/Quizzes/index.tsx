import { useNavigate, useParams } from "react-router";
import * as quizClient from "./client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import SectionControlButton from "../Assignments/SectionControlButton";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaPlus, FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { SlRocket } from "react-icons/sl";
import { ImCross } from "react-icons/im";

export default function Quizzes() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<any>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);
  const [menuVisible, setMenuVisible] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [allQuizzes, setAllQuizzes] = useState<any>([]);
  const handleContextMenu = (quizId: string) => {
    setMenuVisible(menuVisible === quizId ? null : quizId);
  };

  // TODO: if faculty / admin, can edit quizzes

  const fetchAllQuizzes = async () => {
    if (!cid) return;
    try {
      const loadedQuizzes = await quizClient.getQuizzesFromCourse(cid);
      if (currentUser.role !== "STUDENT") {
        setAllQuizzes(loadedQuizzes);
        setQuizzes(loadedQuizzes);
      } else {
        const publishedQuizzes = loadedQuizzes.filter((quiz: any) => quiz.published);
        setAllQuizzes(publishedQuizzes);
        setQuizzes(publishedQuizzes);
      }
    
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const fetchQuizzes = () => {
      const filteredQuizzes = allQuizzes.filter((quiz: any) => {
        const nameMatch = name
          ? quiz.title.toLowerCase().includes(name.toLowerCase())
          : true;
        return nameMatch;
      });
      setQuizzes(filteredQuizzes);
    }
  
  const createQuiz = async () => {
    if (!cid) return;
    try {
      const newQuiz = await quizClient.addQuizToCourse(cid);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${newQuiz._id}/Editor`);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuiz = async (qid: String) => {
    try {
      await quizClient.deleteQuiz(qid);
      setMenuVisible(null);
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  const publishQuiz = async (qid: String, newPublished: boolean) => {
    try {
      await quizClient.updateQuiz(qid, { published: newPublished });
      setMenuVisible(null);
      setReload(!reload);
    } catch (error) {
      console.error(error);
    }
  };

  const displayAvailability = (quiz: any) => {
    const today = new Date();
  const availableFrom = new Date(quiz.available_from);
  const availableUntil = new Date(quiz.available_until);
    if (availableFrom <= today && availableUntil >= today) {
      return "Available";
    } else if (availableFrom > today) {
      return `Not Available until ${availableFrom.toString()}`;
    } else {
        return "Closed";
      }
  }

  const getScore = async (qid: string) => {
    try {
    const last =  await quizClient.getLastAttempt(currentUser._id, qid);
    const score = last.responses.filter((question: any) => question.isCorrect === true).length;
    return score;
    } catch (error) {
      return "-";
    }
  
  }


  useEffect(() => {
    fetchAllQuizzes();
  }, [cid, reload]);

  useEffect(() => {
    fetchQuizzes();
  }, [name]);

  return (
    <div>
      {loading ? (
        <h5>...Loading</h5>
      ) : (
        <div id="wd-quizzes-list">
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="Search quiz"
            className="form-control float-start w-25 me-2 wd-filter-by-name"
          />
          { currentUser.role!=="STUDENT" && <button
            onClick={createQuiz}
            className="float-end btn btn-danger wd-add-quiz mb-1 me-1"
          >
            <FaPlus className="me-2" /> Quiz
          </button>}
          <br />
          <br />

          <ul className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="list-group-item">
              <div className="wd-quiz-title p-3 ps-2 bg-secondary">
                {(currentUser.role === "FACULTY" ||
                  currentUser.role === "ADMIN") && (
                  <BsGripVertical className="me-2 fs-3" />
                )}
                <GoTriangleDown />
                QUIZZES
                <SectionControlButton percent="100" />
                {/* MIGHT HAVE TO CHANGE THIS */}
              </div>
              <ul className="wd-quiz-list-items list-group">
                {quizzes.map((quiz: any) => (
                  <li
                    className="wd-quiz-list-item list-group-item list-group-item p-3 ps-1 rounded-0"
                    key={quiz._id}
                  >
                    <div className="row align-items-center">
                      <div className="col-2 wd-quiz-left-section-control justify-content-center">

                      <SlRocket className="text-success fs-2 ms-3"/>

                      </div>
                      <div className="col-8 text-start">
                        <Link to={`${quiz._id}`}>{quiz.title}</Link>
                        <p>
                          <b> {displayAvailability(quiz)} </b> | <b> Due </b> {quiz.due_date} | {quiz.points} pts | {quiz.questions.length} Questions | 
                          {currentUser.role==="STUDENT" ? ` Score ${getScore(quiz._id)}/${quiz.questions.length}` : ""}
                        </p>
                      </div>
                      <div className="col-2">

                      
                        <IoEllipsisVertical
                          className="fs-3 float-end me-3"
                          onClick={() => handleContextMenu(quiz._id)}
                        />
                        {quiz.published ? 
                            < FaCheckCircle className="text-success fs-3 float-end me-4"/> :
                                  <ImCross className="text-danger fs-3 float-end me-4" />
                                
                              }
                        {menuVisible === quiz._id && (
                          <div
                            className="dropdown-menu show"
                            style={{ position: "absolute" }}
                          >
                            <button
                              className="dropdown-item"
                              onClick={() => navigate(`${quiz._id}/Editor`)}
                            >
                              <FaPencil className="text-primary" /> Edit
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => deleteQuiz(quiz._id)}
                            >
                              <FaTrash className="text-danger" /> Delete
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() =>
                                publishQuiz(quiz._id, !quiz.published)
                              }
                            >
                              {quiz.published ? (
                                <span>
                                  <ImCross className="text-danger" />
                                  {" "}Unpublish
                                </span>
                              ) : (
                                <span>
                                  < FaCheckCircle className="text-success"/>
                                  {" "}Publish
                                </span>
                              )}
                            </button>
                            <button
                              className="dropdown-item"
                              onClick={() => setMenuVisible(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

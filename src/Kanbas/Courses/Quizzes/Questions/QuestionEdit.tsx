import {
  FaCheck,
  FaPlus,
  FaRegEye,
  FaRegEyeSlash,
  FaTrash,
} from "react-icons/fa";
import * as client from "../client";
import { useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import QuestionEditorBox from "./QuestionEditorBox";

export default function QuestionEdit({ quiz }: { quiz: any }) {
  const [questions, setQuestions] = useState<any>([]);
  const [reload, setReload] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const addQuestion = async (qid: string) => {
    const loadedQuestion = await client.addQuestionToQuiz(qid);
    setQuestions([...questions, loadedQuestion]);
  };

  const deleteQuestion = async (quesId: string) => {
    await client.deleteQuestion(quesId);
    setQuestions(questions.filter((q: any) => q._id !== quesId));
  };

  const updateQuestion = async (quesId: string, newQuestion: any) => {
    await client.updateQuestion(quesId, newQuestion);
    const updateAndResetEdit = questions.map((q: any) =>
      q._id === quesId ? { ...q, ...newQuestion, edited: false } : q
    );
    setQuestions(updateAndResetEdit);
    console.log(JSON.stringify(updateAndResetEdit));
    setReload(!reload);
  };

  const fetchQuestions = async () => {
    try {
      const loadedQuestions = await client.getQuestionsFromQuiz(quiz._id);
      setQuestions(loadedQuestions);
      setLoading(false);
      console.log(loadedQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  const editQuestionMode = (quesId: string) => {
    setQuestions(
      questions.map((q: any) =>
        q._id === quesId ? { ...q, editing: q.editing ? !q.editing : true } : q
      ) as any
    );
  };

  const formatQuestionType = (qType: string) => {
    switch (qType) {
      case "MC":
        return "Multiple Choice";
      case "FILLBLANK":
        return "Fill in the Blank";
      case "TRUE-FALSE":
        return "True or False";
    }
  };

  const questionEditorComponent = (
    <div>
      <div className="wd-add-question-button d-block d-flex justify-content-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={() => addQuestion(quiz._id)}
        >
          <FaPlus />
          New Question
        </button>
      </div>
      <hr />

      <ul className="list-group rounded-1">
        {questions.map((question: any) => (
          <li
            className="list-group-item mt-5 border rounded-1"
            key={`${question._id}`}
          >
            <div className={`wd-question-preview pb-3 pt-2 rounded-1 ${ !question.editing || question.editing === false ? "bg-light" : ""}`}>
              <div className="ms-3">
                {!question.editing && (
                  <>
                    <span className="d-block">
                      <b>{formatQuestionType(question.questionType)}</b>
                    </span>
                    <span>{question.questionText}</span>
                  </>
                )}
                <FaPencil
                  className="float-end text-primary me-3 fs-4"
                  onClick={() => editQuestionMode(question._id)}
                />
                <FaTrash
                  className="float-end text-danger me-3 fs-4"
                  onClick={() => deleteQuestion(question._id)}
                />
              </div>
            </div>

            <div className="mt-2">
              {question.editing ? (
                <div className="wd-question-edit-mode">
                  <QuestionEditorBox
                    question={question}
                    updateQuestion={updateQuestion}
                    editQuestionMode={editQuestionMode}
                  />
                </div>
              ) : (
                <div className="wd-quiz-question-answer-section">
                  {question.answers.map((a: any, i: number) => (
                    <div className="row">
                      <div className="col-4 me-3">
                        {a.display ? (
                          <FaRegEye className="text-secondary me-2" />
                        ) : (
                          <FaRegEyeSlash className="text-secondary me-2" />
                        )}
                        {a.isCorrect ? (
                          <FaCheck className="text-success me-2" />
                        ) : (
                          <ImCross className="text-danger me-2" />
                        )}
                        <span className="col-8">
                          {i + 1}. {a.answerText}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  useEffect(() => {
    fetchQuestions();
  }, [reload, loading]);

  return (
    <div className="wd-question-editor">
      <div>{loading ? <span> ...Loading </span> : questionEditorComponent}</div>
    </div>
  );
}

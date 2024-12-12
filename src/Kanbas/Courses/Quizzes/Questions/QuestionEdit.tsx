import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";
import * as client from "../client";
import { useCallback, useEffect, useState } from "react";
import { FaPencil } from "react-icons/fa6";
import MCQEditor from "./MCQEditor";
import TFEditor from "./TFEditor";
import BlankEditor from "./BlankEditor";
import { ImCross } from "react-icons/im";

export default function QuestionEdit({ quiz }: { quiz: any }) {
  const [questions, setQuestions] = useState<any>([]);
  const [answers, setAnswers] = useState([]);
  const [reload, setReload] = useState<boolean>(false);

  const fetchAnswers = async () => {
    const answers = await client.getAnswers(quiz._id);
    setAnswers(answers);
  }

  const addQuestion = async () => {
    const loadedQuestion = await client.addQuestionToQuiz(quiz._id);
    setQuestions([...questions, loadedQuestion]);
  };

  const deleteQuestion = async (quesId: string) => {
    await client.deleteQuestion(quesId);
    setQuestions(questions.filter((q:any) => q._id !== quesId));
  }

  const updateQuestion = async (quesId: string, newQuestion:any) => {
    const updated = await client.updateQuestion(quesId, newQuestion);
    setQuestions(questions.map((q:any) => (q._id === quesId ? {...updated, edited: false} : q)));
  }

  const fetchQuestions = async () => {
    try {
      const loadedQuestions = await client.getQuestionsFromQuiz(quiz._id);
      setQuestions(loadedQuestions);
      console.log(loadedQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  const answerFormat = (question: any) => {
    switch (question.questionType) {
    case "MC":
      return question.answers.map((answer: any, index: number) => (
        <div>
          <input
            type="radio"
            name={`MCQ_${question._id}`}
            id={`${question._id}_${index}`}
            className="form-check-input pt2"
          />
          <label
            htmlFor={`${question._id}_${index}`}
            className="pl-3 pt-2 form-check-label"
          >
            {answer.answerText}
          </label>
        </div>
      ));
     case "TRUE-FALSE":
      return (
        <div>
          <input
            type="radio"
            name={`TF_${question._id}`}
            id={`${question._id}_TRUE`}
            className="form-check-input pt2"
          />
          <label
            htmlFor={`${question._id}_TRUE`}
            className="pl-3 pt-2 form-check-label"
          >
            {" "}
            True{" "}
          </label>
          <input
            type="radio"
            name={`TF_${question._id}`}
            id={`${question._id}_FALSE`}
            className="form-check-input pt2"
          />
          <label
            htmlFor={`${question._id}_FALSE`}
            className="pl-3 pt2 form-check-label"
          >
            {" "}
            False{" "}
          </label>
        </div>
      );
      // return select true or select false
    case "FILLBLANK":
      return (
        <div>
          {question.answers.map((a: any, index: number) => (
            <div>
              <label htmlFor="" className="form-check-label pt-2">
                {index + 1}.
              </label>
              <input
                type="text"
                className="form-check-input w-25 pt-2 pl-3"
                id={`${question._id}_${index}`}
              />
            </div>
          ))}
        </div>
      );
    }
      // return empty textboxes
    }
  

  const renderQuestionEdit = (question: any) => {
    switch (question.questionType) {
      case "MC":
        return (<MCQEditor question={question} updateQuestion={updateQuestion}/>)
      case "TRUE-FALSE":
        return (<TFEditor question={question}/>)
      case "FILLBLANK":
        return (<BlankEditor question={question}/>)
    }
  }

  const editQuestion = (quesId: string) => {
    setQuestions(
      questions.map((q: any) =>
        q._id === quesId ? { ...q, editing: true } : q
      ) as any
    );
  };

  useEffect(() => {
    fetchQuestions();
    fetchAnswers();
  }, [reload]);

  return (
    <div className="wd-question-editor">
      <div className="wd-add-question-button d-block d-flex justify-content-center mt-3">
        <button className="btn btn-secondary" onClick={addQuestion}>
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

<div className="wd-question-preview">
              {!question.editing && <span>{question.questionText}</span> }
              <div>
              
              
              <FaPencil
                className="float-end text-primary me-3 fs-4"
                onClick={() => editQuestion(question._id)}
              />
              <FaTrash
                className="float-end text-danger me-3 fs-4"
                onClick={() => deleteQuestion(question._id)}
              />
              </div></div>

            {question.editing ? 
            <div className="ed-question-edit-mode">
                {renderQuestionEdit(question)}
            </div> :

              <div className="wd-quiz-question-answer-section">
                {answers.filter((a:any) => a.question === question._id)
                .map((a: any, i: number) => (
                  <div className="row">
                    <div className="col-4">
                    { a.isCorrect ? 
                    <FaCheck className="text-success"/>  :
                    <ImCross className="text-danger"/>
                    }
                    <span>{i+1}. {a.answerText}</span></div>
                    
                  </div>
                ))}
                
                
              </div>
            }





          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from "react";
import QuestionEditHeader from "./QuestionEditHeader";
import MCQEditor from "./MCQEditor";
import TFEditor from "./TFEditor";
import BlankEditor from "./BlankEditor";

export default function QuestionEditorBox({
  question,
  updateQuestion,
  editQuestionMode,
}: {
  question: any;
  updateQuestion: (quesId: string, quesNew: any) => void;
  editQuestionMode: (quesId: string) => void;
}) {
  const [editQuestion, setEditQuestion] = useState<any>(question);

  const addAnswer = () => {
    const newAnswer = {
        _id: `${editQuestion.answers.length}`,
        answerText: `New Answer ${editQuestion.answers.length}`,
        isCorrect: true,
        display: true,
      }
    setEditQuestion({
      ...editQuestion,
      answers: [...editQuestion.answers, newAnswer]
    });
  };

  const deleteAnswer = (index: Number) => {
    setEditQuestion({
      ...editQuestion,
      answers: editQuestion.answers.filter(
        (answer: any) => answer._id !== `${index}`
      ),
    });
  };

  const toggleAnswer = (index: Number) => {
    setEditQuestion({
      ...editQuestion,
      answers: editQuestion.answers.map((a: any) =>
        a._id === `${index}` ? { ...a, isCorrect: !a.isCorrect } : a
      ),
    });
  };

  const determineBody = () => {
    switch (editQuestion.questionType) {
      case "MC":
        return (
          <MCQEditor
            question={editQuestion}
            setQuestion={setEditQuestion}
            updateQuestion={updateQuestion}
            setEditing={() => editQuestionMode(question._id)} // duplicate name for obj and function
            addAnswer={addAnswer}
            deleteAnswer={deleteAnswer}
            toggleAnswer={toggleAnswer}
          />
        );

      // all other cases are still in progress
      case "TRUE-FALSE":
        return (
          <TFEditor
            question={editQuestion}
            updateQuestion={updateQuestion}
            setEditing={() => editQuestionMode(question._id)}
          />
        );
      case "FILLBLANK":
        return (
          <BlankEditor
            question={editQuestion}
            setQuestion={setEditQuestion}
            updateQuestion={updateQuestion}
            setEditing={() => editQuestionMode(question._id)}
            addAnswer={addAnswer}
            deleteAnswer={deleteAnswer}
            toggleAnswer={toggleAnswer}
          />
        );
    }
  };

  return (
    <div className="wd-question-editor-box">
      <div className="wd-question-editor-box-header">
        <QuestionEditHeader
          editQuestion={editQuestion}
          setEditQuestion={setEditQuestion}
        />
      </div>
      <div className="wd-question-editor-box-body">{determineBody()}</div>
    </div>
  );
}

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
    setEditQuestion({
      ...editQuestion,
      answer: editQuestion.answers.push({
        _id: `${editQuestion.answers.length}`,
        answerText: `New Answer ${editQuestion.answers.length}`,
        isCorrect: true,
        display: true,
      }),
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
          />
        );

    // all other cases are still in progress
      case "TRUE-FALSE":
        return (
          <TFEditor
            question={editQuestion}
            setQuestion={setEditQuestion}
            updateQuestion={updateQuestion}
            setEditing={() => editQuestionMode(question._id)}
          />
        );
      case "FILLBLANK":
        return (
          <BlankEditor
            question={editQuestion}
            updateQuestion={updateQuestion}
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
      <div className="wd-question-editor-box-body">
        {determineBody()}
      </div>
    </div>
  );
}

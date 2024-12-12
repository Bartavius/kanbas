export default function TakeNav({quiz} : {quiz:any}) {
return (
    <div>
        <ul className="nav nav-pills">

        
        {quiz.questions.map((q:any, i:number) => (
            <li key={q._id} className="nav-item">
                <a href={`#/Kanbas/Courses/${q.course}/Quizzes/${q._id}/Take/${i+1}`} className="nav-link">
                {`Question ${i + 1}`}</a>
            </li>
        ))}
</ul>
    </div>
)
}
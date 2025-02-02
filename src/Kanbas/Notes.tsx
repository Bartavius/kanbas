export default function Notes() {
    return (
        <div className="container">
            <h1><b>Developer Notes</b></h1>
            <h4>This project is a web app replication of the functionalities of the educational app, <b>Canvas</b>.</h4>
            <p><i>Built by Jirath "Bart" Lojanarungsiri while under the guidance of Jose Annunziato. </i></p>

            <hr />

            <h4><b>Currently implemented functions: </b></h4>
            <span>
                <b>User Information:</b>
                <ul>
                    <li>User authentication / registration</li>
                    <li>User profile information</li>
                    <li>User profile modification (admin permission)</li>
                    <li>User information lookup filtration</li>
                    <li>User role-specific permissions (FACULTY and ADMIN are allowed to modify data and have access to more functionalities over a STUDENT/TA role)</li>
                </ul>
            </span>

            <span>
                <b>Course Information: </b>
                <ul>
                    <li>Course display</li>
                    <li>User-specific course enrollments/unenrollments</li>
                    <li>Course modifications (add, edit delete)</li>
                </ul>
            </span>
            
            <span>
                <b>Course Modules:</b>
                <ul>
                    <li>Course-specific modules modification (add, edit delete)</li>
                </ul>
            </span>

            <span>
                <b>Course Assignment</b>
                <ul>
                    <li>Course-specific assignments list display</li>
                    <li>Course-specific assignments modification (Add, edit, delete)</li>
                    <li>The ability to read assignment details</li>
                </ul>
            </span>

            <span>
                <b>Course Quizzes</b>
                <ul>
                    <li>Course-specific quizzes display (can adjust 'publication status' to display on STUDENT webpage)</li>
                    <li>Course-specific quizzes modification (add, edit, delete)</li>
                    <li>quiz question and answers modification (add, edit types/details, delete; add answers, edit answer display/correct, delete answer)</li>
                    <li>
                        <span>quiz taking (faculty and admins can display a preview, while students can take graded quizzes with saved attempts depending on the question details)</span>
                        <ul>
                            <b>*** There are currently some bugs within quiz-taking that will be looked at. In the meantime, please do not try to answer any questions ***</b>
                            <li>latest attempt is saved when a quiz is permitted to be taken multiple times</li>
                            <li>practice quizzes will not be saved</li>
                            <li>time limits are placed based on the quiz detail</li>
                            <li>students will not be able to take the quiz until it is published and is within an allotted time period that is specified in the quiz detail</li>
                            <li>fill in the blanks, true/false, and multiple-choice questions are the only available question types at the moment</li>
                        </ul>
                    </li>
                </ul>
            </span>

            <hr />

            <span>
                <h5><b>Currently worked on implementations:</b></h5>
                <ul>
                    <li>Auto grading quizzes</li>
                    <li>submitting quizzes</li>
                    <li>resuming quizzes saved states</li>
                    <li>time limits that are persistent across sessions</li>
                    <li>single question per page / all questions on one page display</li>
                    <li>shuffled questions</li>
                </ul>
            </span>

            <hr />

            <span>
                <h5><b>Future Implementations: </b></h5>
                <ul>
                    <li>more question types (short answers)</li>
                    <li>grading systems for assignments including the ability to submit works</li>
                    <li>ChatGPT API integration</li>
                    <li>course image upload</li>
                    <li>private messaging system</li>
                </ul>
            </span>

            <hr />

            <span>
                <h5><b>Tech Stack: </b></h5>
                <ul>
                    <li>React - Framework</li>
                    <li>Node.js - Server-side</li>
                    <li>Express.js - Server Framework</li>
                    <li>Axios - HTTP client</li>
                    <li>MongoDB - Database</li>
                    <li>Bootstrap - Styling </li>
                    <li>Redux - Specifically user state management</li>
                </ul>
                <i>Written in TS/JS, HTML/CSS</i>
            </span>

            <hr />

            <span>
                <b>Disclaimer:</b>
                <i>
                    This project was built while (and in order to) learning the aforementioned technologies and languages, as such there may be areas of code that looks "unoptimized" or "unclean." It may be rough around the edges, but it retains the functionalities of what it is intended to be.
                </i>
            </span>
        </div>
    )
}
The server-side of the project is hosted on: https://cs4550-node-server-mongodb.onrender.com

The web app is hosted on: https://kanbas-mern.netlify.app/

This project is a web app replication of the functionalities of the educational app, 'Canvas.' Currently implemented functions include,

**User Information:**
- User authentication / registration
- User profile information
- User profile modification (admin permission)
- User information lookup filtration
- User role-specific permissions (FACULTY and ADMIN are allowed to modify data and have access to more functionalities over a STUDENT/TA role)

**Course Information:**
- Course display
- User-specific course enrollments / unenrollment
- Course modification (add, edit, delete)

**Course Modules:**
- Course-specific Modules modification (add, edit, delete)

**Course Assignments:**
- Course-specific Assignment display
- Course-specific Assignments modification (Add, edit, delete)

**Course quizzes:**
- Course-specific quizzes display (can adjust 'publication status' to display on STUDENT webpage)
- Course-specific quizzes modification (add, edit, delete)
- quiz question and answers modification (add, edit types/details, delete; add answers, edit answer display/correct, delete answer)
- quiz taking (faculty and admins can display a preview, while students can take graded quizzes with saved attempts depending on the question details)
  - practice quizzes will not be saved
  - single question per page / display all questions at once are implemented functionalities
  - time limits are placed based on the quiz detail
  - students will not be able to take the quiz until it is published and is within an allotted time period that is specified in the quiz detail
  - fill in the blanks, true/false, and multiple-choice questions are the only available question types at the moment
 
========================================================================================================================================================
 
Future implementation that are planned includes more question types (short answers), grading systems for assignments including the ability to submit works, ChatGPT API integration, course image upload, private messaging system.

**The technologies used in this project includes:**
  - React – Building dynamic, component-based UIs.
  - Node.js – Server-side JavaScript runtime.
  - Express.js – Web server framework for Node.js APIs.
  - Axios – HTTP client for making API requests.
  - MongoDB – NoSQL database for flexible data storage.
  - Bootstrap – Front-end framework for responsive design.
  - Redux – State management with a centralized store for predictable state changes.

 **Languages used:** HTML/CSS, Typescript, Javascript

**Disclaimer**: This project was built while (and in order to) learning the aforementioned technologies and languages, as such there may be areas of code that looks "unoptimized" or "unclean." It may be rough around the edges, but it retains the functionalities of what it is intended to be.

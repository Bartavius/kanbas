import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
            <img src="/images/reactjs.jpg" alt="reactjs" width={200} />
            <div id="wd-dashboad-course-CS1234">
                <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/10000/Home">
                CS1234 React JS
                </Link>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
          </div>
        </div>

        <div className="wd-dashboard-course"> 
            <img src="/images/japanese.jpg" alt="natsuiro matsuri from hololive" width={200} />
            <div id="wd-dashboard-course-JPL1000">
                <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/10001/Home">
                JPL1000 Introduction to Japanese
                </Link>
                <p className="wd-dashboard-course-title">
                    Introduction to Japanese
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course"> 
            <img src="/images/geoguessr.jpg" alt="geoguessr logo" width={200} />
            <div id="wd-dashboard-course-GEO9999">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/10002/Home">
                GEO9999 Geoguessr
                </Link>
                <p className="wd-dashboard-course-title">
                    Geoguessing where we are in the world
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/guitar.jpg" alt="a dude playing a guitar" width={200} />
            <div id="wd-dashboard-course-GUIT2000">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/10003/Home">
                GUIT2000 Guitar Class
                </Link>
                <p className="dw-dashboard-course-title">
                    Learn the ultimate charismatic charm of playing the guitar
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/ballroom_dancing.jpg" alt="a couple ballroom-dancing" width={200} />
            <div id="wd-dashboard-course-DNCE1001">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/10004/Home">
                DNCE1001 Ballroom Dancing
                </Link>
                <p className="wd-dashboard-course-title">
                    Ultimate Ballroom dancing
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/algorithm.jpg" alt="some gears" width={200} />
            <div id="wd-dashboard-course-CS3000">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/10005/Home">
                CS3000 Algorithms
                </Link>
                <p className="wd-dashboard-course-title">
                    Algorithms and Data
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/chess.jpg" alt="a chess board" width={200} />
            <div id="wd-dashboard-course-chss3500">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/10006/Home">
                CHSS3500 Chess
                </Link>
                <p className="wd-dashboard-course-title">
                    Path to Grandmaster
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/bird.jpg" alt="a birdd" width={200} />
            <div id="wd-dashboard-course-FLYN5000">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/10007/Home">
                FLYN5000 Flying class
                </Link>
                <p className="wd-dashboard-course-title">
                    Grow a pair of wings and fly
                </p>
            </div>
        </div>
      </div>
    </div>
  );
}



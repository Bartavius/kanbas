import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">

        <div className="wd-dashboard-course">
            <img src="/images/reactjs.jpg" width={200} />
            <div id="wd-dashboad-course-CS1234">
                <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/CS1234/Home">
                CS1234 React JS
                </Link>
                <p className="wd-dashboard-course-title">
                    Full Stack software developer
                </p>
          </div>
        </div>

        <div className="wd-dashboard-course"> 
            <img src="/images/japanese.jpg" width={200} />
            <div id="wd-dashboard-course-JPL1000">
                <Link className="wd-dashboard-course-link"
                to="/Kanbas/Courses/JPL1000/Home">
                JPL1000 Introduction to Japanese
                </Link>
                <p className="wd-dashboard-course-title">
                    Introduction to Japanese
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course"> 
            <img src="/images/geoguessr.jpg" width={200} />
            <div id="wd-dashboard-course-GEO9999">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/GEO9999/Home">
                GEO9999 Geoguessr
                </Link>
                <p className="wd-dashboard-course-title">
                    Geoguessing where we are in the world
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/guitar.jpg" width={200} />
            <div id="wd-dashboard-course-GUIT2000">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/GUIT2000/Home">
                GUIT2000 Guitar Class
                </Link>
                <p className="dw-dashboard-course-title">
                    Learn the ultimate W Rizz of playing the guitar
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/ballroom_dancing.jpg" width={200} />
            <div id="wd-dashboard-course-DNCE1001">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/DNCE1001/Home">
                DNCE1001 Ballroom Dancing
                </Link>
                <p className="wd-dashboard-course-title">
                    Ultimate dancing rizz: Ballroom dancing
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/algorithm.jpg" width={200} />
            <div id="wd-dashboard-course-CS3000">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/CS3000/Home">
                CS3000 Algorithms
                </Link>
                <p className="wd-dashboard-course-title">
                    Algorithms and Data
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/chess.jpg" width={200} />
            <div id="wd-dashboard-course-chss3500">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/CHSS3500/Home">
                CHSS3500 Chess
                </Link>
                <p className="wd-dashboard-course-title">
                    Path to Grandmaster
                </p>
            </div>
        </div>

        <div className="wd-dashboard-course">
            <img src="/images/bird.jpg" width={200} />
            <div id="wd-dashboard-course-FLYN5000">
                <Link className="wd-dashboard-course-link" to="/Kanbas/Dashboard/FLYN5000/Home">
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


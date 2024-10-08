import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <div className="container">
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-4 g-4">
            <div className="wd-dashboard-course col-12 col-xsm-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style={{ width: "250px" }}>
                <div className="card rounded-3 overflow-hidden">
                    <div id="wd-dashboad-course-CS1234">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                        to="/Kanbas/Courses/1234/Home">
                            <img className="card-img-top" src="/images/reactjs.jpg" alt="" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS1234 React JS
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Full Stack software developer
                                </p>
                                <button className="btn btn-primary"> Go </button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="wd-dashboard-course col-12 col-xsm-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style={{ width: "250px" }}> 
                <div className="card rounded-3 overflow-hidden">
                    <div id="wd-dashboard-course-JPL1000">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark"
                        to="/Kanbas/Courses/1000/Home">
                            <img className="card-img-top" src="/images/japanese.jpg" alt="" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    JPL1000 Japanese
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Introduction to Japanese
                                </p>
                                <button className="btn btn-primary">Go</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="wd-dashboard-course col-12 col-xsm-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style={{ width: "250px" }}> 
                <div className="card rounded-3 overflow-hidden">
                    <div id="wd-dashboard-course-GEO9999">
                        <Link className="wd-dashboard-course-link text-decoration-none text-dark" to="/Kanbas/Courses/9999/Home">
                            <img className="card-img-top" src="/images/geoguessr.jpg" alt="" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    GEO9999 Geoguessr
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Geolocating where we are in the world!
                                </p>
                                <button className="btn btn-primary">Go</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="wd-dashboard-course col-12 col-xsm-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style={{ width: "250px" }}>
                <div className="card rounded-3 overflow-hidden">
                    <div id="wd-dashboard-course-GUIT2000">
                        <Link className="wd-dashboard-course-link text-decorator-none text-dark" to="/Kanbas/Courses/2000/Home">
                            <img className="card-img-top" src="/images/guitar.jpg" alt="" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    GUIT2000 Guitar Class
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Learn the ultimate W Rizz of playing the guitar!
                                </p>
                                <button className="btn btn-primary">Go</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
    
            <div className="wd-dashboard-course col-12 col-xsm-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style={{ width: "250px" }}>
                <div className="card rounded-3 overflow-hidden">
                    <div id="wd-dashboard-course-DNCE1001">
                        <Link className="wd-dashboard-course-link text-decorator-none text-dark" to="/Kanbas/Courses/1001/Home">
                            <img className="card-img-top" src="/images/ballroom_dancing.jpg" alt="" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    DNCE1001 Ballroom Dancing
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Ultimate dancing rizz: Ballroom dancing
                                </p>
                                <button className="btn btn-primary">Go</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="wd-dashboard-course col-12 col-xsm-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style={{ width: "250px" }}>
                <div className="card rounded-3 overflow-hidden">
                    
                    <div id="wd-dashboard-course-CS3000">
                        <Link className="wd-dashboard-course-link text-decorator-none text-dark" to="/Kanbas/Courses/3000/Home">
                            <img className="card-img-top" src="/images/algorithm.jpg" alt="" width="100%" height={160} />
                            <div className="card-body"> 
                                <h5 className="wd-dashboard-course-title card-title">
                                    CS3000 Algorithms and Data
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    pseudocoding into oblivion...
                                </p>
                                <button className="btn btn-primary">Go</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="wd-dashboard-course col-12 col-xsm-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style={{ width: "250px" }}>
                <div className="card rounded-3 overflow-hidden">   
                    <div id="wd-dashboard-course-chss3500">
                        <Link className="wd-dashboard-course-link text-decorator-none text-dark" to="/Kanbas/Courses/3500/Home">
                            <img className="card-img-top" src="/images/chess.jpg" alt="" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    CHSS3500 Chess Openings
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    The opening path to Grandmaster
                                </p>
                                <button className="btn btn-primary">Go</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="wd-dashboard-course col-12 col-xsm-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3" style={{ width: "250px" }}>
                <div className="card rounded-3 overflow-hidden">
                    <div id="wd-dashboard-course-FLYN5000">
                        <Link className="wd-dashboard-course-link text-decorator-none text-dark" to="/Kanbas/Courses/5000/Home">
                        <img className="card-img-top" src="/images/bird.jpg" alt="" width="100%" height={160} />
                            <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                    FLYN5000 Flying Class
                                </h5>
                                <p className="wd-dashboard-course-title card-text">
                                    Grow a pair of wings and soar through the skies yourself!
                                </p>
                                <button className="btn btn-primary">Go</button>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
  );
}


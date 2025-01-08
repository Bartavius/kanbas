import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import * as assignmentClient from "./client";

export default function Assignment() {
    const {cid, aid} = useParams();

    const [loading, setLoading] = useState(true);
    const [assignment, setAssignment] = useState<any>([]);

    const fetchAssignment = useCallback(async () => {
        if (!cid || !aid) return;
        try {
            const loadedAssignment = await assignmentClient.getAssignmentById(aid);
            setAssignment(loadedAssignment);
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }, [cid, aid])

    useEffect( () => {
        fetchAssignment();
    }, [fetchAssignment]);

    return (
        <div className="container">
            {
                loading ? <div>Loading...</div> :
                <div className="wd-assignment-header">
                    <h2>{assignment.title}</h2>
                    <hr />
                    <div className="row w-75">
                        <span className="col-4"><h5><b className="me-2">Due</b> {assignment.due_date}</h5></span>
                        <span className="col-3"><h5><b className="me-2">Points</b> {assignment.points}</h5></span>
                        <span className="col-5"><h5><b className="me-2">Submitting</b> {assignment.submission_type}</h5></span>
                    </div>
                    <div className="row w-75">
                        <span className="col"><h5><b className="me-2">Available</b> {assignment.available_from} - {assignment.available_until}</h5></span>
                    </div>
                    <hr />
                    <div>
                        {assignment.description}
                    </div>
                </div>
            }

        </div>
    );
}
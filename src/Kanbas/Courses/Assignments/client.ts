import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;

export const getAssignmentsFromCourse = async (courseId: string) => {
    const { data } = await axios.get(`${ASSIGNMENT_API}/${courseId}`);
    return data
}
  
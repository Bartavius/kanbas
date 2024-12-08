import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const getAssignmentById = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.get(`${ASSIGNMENT_API}/${assignmentId}`);
    return data
}

export const createAssignment = async (courseId: string) => {
    const { data } = await axiosWithCredentials.post(`${ASSIGNMENT_API}/courses/${courseId}`);
    return data;
}

export const deleteAssignment = async (assignmentId: string) => {
    const { data } = await axiosWithCredentials.delete(`${ASSIGNMENT_API}/${assignmentId}`);
    return data
}

export const updateAssignment = async (assignmentId: string, newAssignment: any) => {
    const { data } = await axiosWithCredentials.put(`${ASSIGNMENT_API}/${assignmentId}`, newAssignment);
    return data
}

export const getAssignmentsFromCourse = async (courseId: string) => {
    const { data } = await axiosWithCredentials.get(`${ASSIGNMENT_API}/courses/${courseId}`);
    return data
}

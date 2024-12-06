import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ASSIGNMENT_API = `${REMOTE_SERVER}/api/assignments`;

export const getAssignmentById = async (courseId: string, assignmentId: string) => {
    const { data } = await axios.get(`${ASSIGNMENT_API}/${courseId}/${assignmentId}`);
    return data
}

export const createAssignment = async (courseId: string, assignmentId: string) => {
    const { data } = await axios.post(`${ASSIGNMENT_API}/${courseId}/${assignmentId}`);
    return data;
}

export const deleteAssignment = async (courseId: string, assignmentId: string) => {
    const { data } = await axios.delete(`${ASSIGNMENT_API}/${courseId}/${assignmentId}`);
    return data
}

export const updateAssignment = async (courseId: string, assignmentId: string, newAssignment: any) => {
    const { data } = await axios.put(`${ASSIGNMENT_API}/${courseId}/${assignmentId}`, newAssignment);
    return data
}

export const getAssignmentsFromCourse = async (courseId: string) => {
    const { data } = await axios.get(`${ASSIGNMENT_API}/${courseId}`);
    return data
}

import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUser = async (userId: string, courseId: string) => {
    const {data} = await axios.post(`${ENROLLMENT_API}/${userId}/${courseId}`);
    return data;
}

export const unenrollUser = async (userId: string, courseId: string) => {
    const {data} = await axios.delete(`${ENROLLMENT_API}/${userId}/${courseId}`);
    return data;
}

export const getEnrollments = async () => {
    const {data} = await axios.get(ENROLLMENT_API);
    return data;
}



  
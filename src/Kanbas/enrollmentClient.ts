import axios from "axios";

export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENT_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const enrollUser = async (userId: String, courseId: String) => {
    const {data} = await axiosWithCredentials.post(`${ENROLLMENT_API}/${courseId}/${userId}`);
    return data;
}

export const unenrollUser = async (userId: String, courseId: String) => {
    const {data} = await axiosWithCredentials.delete(`${ENROLLMENT_API}/${courseId}/${userId}`);
    return data;
}

export const getEnrollments = async () => {
    const {data} = await axios.get(ENROLLMENT_API);
    return data;
}

export const findPeopleInCourse = async (courseId: String) => {
    const {data} = await axios.get(`${ENROLLMENT_API}/${courseId}`);
    return data;
}



  
import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });


export const getQuizzesFromCourse = async (cid: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${cid}`);
    return data
}

export const addQuizToCourse = async (cid: String) => {
    const {data } = await axiosWithCredentials.post(`${QUIZZES_API}/${cid}`);
    return data;
}
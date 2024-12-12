import axios from "axios";

const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const getQuiz = async (qid: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/detail/${qid}`);
    return data;
  };

export const getQuizzesFromCourse = async (cid: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${cid}`);
  return data;
};


export const addQuizToCourse = async (cid: String) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${cid}`);
  return data;
};

export const deleteQuiz = async (qid: String) => {
  const { data } = await axiosWithCredentials.delete(
    `${QUIZZES_API}/${qid}`
  );
  return data;
};

export const updateQuiz = async (qid: String, newUpdate: any) => {
    const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${qid}`, newUpdate);
    return data;
  };

  export const getLastAttempt = async (uid: String, qid: string) => {
    const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${uid}/${qid}`);
    return data;
  }

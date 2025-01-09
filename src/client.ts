import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;

export const findConnection = async () => {
  const response = await axios.get(`${REMOTE_SERVER}/`);
  return response.data;
};
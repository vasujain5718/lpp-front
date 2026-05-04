import axios from "axios";

export const solveLPP = async (payload) => {
  const res = await axios.post("http://localhost:8000/solve", payload);
  return res.data;
};
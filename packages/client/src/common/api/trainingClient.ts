import axios from "axios";

export const trainingClient = axios.create({
  baseURL: "http://localhost:3001/api",
});

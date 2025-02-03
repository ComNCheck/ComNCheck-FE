import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
export const instance = axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default instance;

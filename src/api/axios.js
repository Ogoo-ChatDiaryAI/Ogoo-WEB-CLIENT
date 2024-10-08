import axios from "axios";
import { useNavigate } from "react-router-dom";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      //accessToken이 잘못된 형식일때를 대비
      const token = JSON.parse(accessToken);
      return token;
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      return "";
    }
  }
};

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

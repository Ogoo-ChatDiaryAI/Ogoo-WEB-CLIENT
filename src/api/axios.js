import axios from "axios";
import { useNavigate } from "react-router-dom";

const getAccessToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  console.log("엑세스 토큰: ", accessToken);
  if (accessToken) {
    try {
      //accessToken이 잘못된 형식일때를 대비
      const token = accessToken;
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
    "Content-Type": "application/json",
  },
});

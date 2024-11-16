import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const KakaoAuth = () => {
  const { login } = useAuth();

  const code = new URL(window.location.href).searchParams.get("code");
  localStorage.setItem("kakao_code", code);
  const navigate = useNavigate();
  // //테스트를 위해 무조건 넘어가도록 구현
  // login();
  // navigate("/home");

  //그냥 fetch로 구현해 봄 (fetch는 status code로는 에러를 모름)
  const getAccessToken = async () => {
    const kakao_code = localStorage.getItem("kakao_code");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/accounts/kakao/login/callback/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            //Authorization: accessToken ? `Bearer ${accessToken}` : null,
          },
          body: JSON.stringify({
            code: kakao_code,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("로그인 실패");
      }
      //json으로 변환해야함
      const data = await response.json();
      // console.log(data);
      localStorage.setItem("accessToken", data.access_token);
      login();
      navigate("/home");
      //window.location.reload();
    } catch (error) {
      // console.log("during login Error: ", error);
      navigate("/");
    }
  };

  getAccessToken();
  // alert("로그인중");
  return <div></div>;
};

export default KakaoAuth;

import React from "react";
import { useNavigate } from "react-router-dom";

const KakaoAuth = () => {
  const code = new URL(window.location.href).searchParams.get("code");
  const navigate = useNavigate();

  //그냥 fetch로 구현해 봄 (fetch는 status code로는 에러를 모름)
  const getAccessToken = async () => {
    const kakao_code = localStorage.getItem("kakao_code");
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/특정서버주소`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: accessToken ? `Bearer ${accessToken}` : null,
        },
        body: JSON.stringify({
          code: kakao_code,
        }),
      });
      if (!response.ok) {
        throw new Error("로그인 실패");
      }
      localStorage.setItem("accessToken", response.data.acessToken);
      navigate("/home");
    } catch (error) {
      console.log("during login Error: ", error);
      navigate("/");
    }
  };

  return <div></div>;
};

export default KakaoAuth;

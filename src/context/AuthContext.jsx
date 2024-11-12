import React, { createContext, useState } from "react";

const AuthContext = createContext();

//얘도 결국 새로고침, or 브라우저에 직접 입력을 하면 전역 상태라서 날라감. 로그인 상태 유지하고 싶으면 localStorage 이용해야함
export const AuthProvider = ({ children }) => {
  const isLogin = localStorage.getItem("accessToken");
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("kakao_code");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;

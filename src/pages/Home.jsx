import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Content = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-left: 100px; /* 사이드바의 너비만큼 마진을 줍니다 */
  margin-bottom: 64px; /* 푸터의 높이만큼 마진을 줍니다 */
  overflow-y: auto; /* 세로 스크롤 허용 */
  padding: 50px;
`;

function Home() {
  return (
    <HomeContainer>
      <Header text={"홈"} />
      <Sidebar activeItem={"home"} />
      <Content>{}</Content>
      <Footer />
    </HomeContainer>
  );
}

export default Home;

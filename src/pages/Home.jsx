import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Quote from "../components/Quote";
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
  margin: 60px 0 64px 100px;
  overflow-y: auto; /* 세로 스크롤 허용 */
  padding: 50px;
`;

function Home() {
  return (
    <HomeContainer>
      <Header text={"홈"} />
      <Sidebar activeItem={"home"} />
      <Content>
        <Quote />
      </Content>
      <Footer />
    </HomeContainer>
  );
}

export default Home;

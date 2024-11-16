import React from "react";
import { FaEnvelope, FaGithub, FaInstagram } from "react-icons/fa";
import styled from "styled-components";

const FooterContainer = styled.div`
  padding: 15px 20px;
  background-color: #777;
  width: 100%;
  text-align: center;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
`;

const FooterText = styled.div`
  font-size: 18px;
  user-select: none;
`;

const IconContainer = styled.div`
  padding-right: 40px;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 25px;
  margin-left: 30px;
  color: white;
  cursor: pointer;
`;

const Footer = () => {
  const handleClick = () => {
    // Contact Us
    // GitHub, E-mail, Instagram 등 추가 예정
    // 모달창으로 구현
  };

  return (
    <FooterContainer>
      <FooterText>Hongik Univ. Computer Engineering @ 2024. All rights reserved.</FooterText>
      <IconContainer>
        <Icon onClick={handleClick}>
          <FaEnvelope />
        </Icon>
        <Icon onClick={handleClick}>
          <FaInstagram />
        </Icon>
        <Icon onClick={handleClick}>
          <FaGithub />
        </Icon>
      </IconContainer>
    </FooterContainer>
  );
};

export default Footer;

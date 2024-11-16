import React, { useState } from "react";
import { FaBook, FaCog, FaComment, FaHome, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/useAuth";
import Modal from "./Modal";

const SidebarContainer = styled.div`
  width: 100px;
  height: calc(100% - 84px);
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  user-select: none;
`;

const IconGroupTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IconGroupBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  position: relative;
  cursor: pointer;
`;

const ActiveBar = styled.div`
  width: 5px;
  height: 100%;
  background-color: #4caf50;
  position: absolute; /* 부모 요소 내에서 절대 위치 */
  left: 0;
  display: ${(props) => (props.active ? "block" : "none")};
`;

const Icon = styled.div`
  font-size: 24px;
  margin-top: 10px;
  color: ${(props) => (props.active ? "#4CAF50" : "#777")};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 10px; /* 아이콘과 바 사이의 간격 */
  width: 100%;
`;

const IconText = styled.span`
  font-size: 18px;
  margin-top: 5px;
  color: ${(props) => (props.active ? "#4CAF50" : "#777")};
`;

const LargeUserIcon = styled(FaUserCircle)`
  font-size: 48px;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.div`
  color: black;
  font-size: 32px;
`;

const ModalContent = styled.div`
  color: black;
  font-family: Inter;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ModalButton = styled.button`
  background-color: ${(props) => (props.active ? "#4caf50" : "#ccc")};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
`;

const Sidebar = ({ activeItem }) => {
  const [activeIcon, setActiveIcon] = useState(activeItem);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleSettings = () => {
    setActiveIcon("settings");
  };

  const handleLogout = () => {
    setActiveIcon("user");
  };

  const handleCloseModal = () => {
    setActiveIcon();
  };

  return (
    <>
      <SidebarContainer>
        <IconGroupTop>
          <IconWrapper onClick={() => navigate("/home")}>
            <ActiveBar active={activeItem === "home"} />
            <Icon active={activeItem === "home"}>
              <FaHome />
              <IconText active={activeItem === "home"}>홈</IconText>
            </Icon>
          </IconWrapper>
          <IconWrapper onClick={() => navigate("/chat")}>
            <ActiveBar active={activeItem === "chat"} />
            <Icon active={activeItem === "chat"}>
              <FaComment />
              <IconText active={activeItem === "chat"}>채팅</IconText>
            </Icon>
          </IconWrapper>
          <IconWrapper onClick={() => navigate("/diary")}>
            <ActiveBar active={activeItem === "diary"} />
            <Icon active={activeItem === "diary"}>
              <FaBook />
              <IconText active={activeItem === "diary"}>나의 일기장</IconText>
            </Icon>
          </IconWrapper>
        </IconGroupTop>
        <IconGroupBottom>
          <IconWrapper onClick={handleSettings}>
            <Icon active={activeIcon === "settings"}>
              <FaCog />
              <IconText active={activeIcon === "settings"}>설정</IconText>
            </Icon>
          </IconWrapper>
          <IconWrapper onClick={handleLogout}>
            <Icon active={activeIcon === "user"}>
              <LargeUserIcon />
            </Icon>
          </IconWrapper>
        </IconGroupBottom>
      </SidebarContainer>
      {activeIcon === "settings" ? (
        <Modal onClose={handleCloseModal}>
          <ModalContainer>
            <ModalTitle>설정</ModalTitle>
            <ModalContent>
              <p>다크 모드</p>
            </ModalContent>
            <ModalButton active onClick={handleCloseModal}>
              확인
            </ModalButton>
          </ModalContainer>
        </Modal>
      ) : activeIcon === "user" ? (
        <Modal onClose={handleCloseModal}>
          <ModalContainer>
            <ModalTitle>로그아웃 하시겠어요?</ModalTitle>
            <ModalButtonContainer>
              <ModalButton active onClick={() => logout()}>
                네!
              </ModalButton>
              <ModalButton onClick={handleCloseModal}>아니요!</ModalButton>
            </ModalButtonContainer>
          </ModalContainer>
        </Modal>
      ) : null}
    </>
  );
};

export default Sidebar;

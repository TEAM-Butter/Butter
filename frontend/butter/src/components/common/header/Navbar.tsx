import styled from "@emotion/styled";
// npm i framer-motion 설치
import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { StreamingModal } from "../modals/StreamingModal";
import { SchedulePlusModal } from "../modals/SchedulePlusModal";
import { useUserStore } from "../../../stores/UserStore";
import { useCrewStore } from "../../../stores/UserStore";
import { removeAccessToken } from "../../../apis/auth";
import bell from "../../../assets/user/bell.png"
import { Alert } from "./Alert";
import { useNavigate } from "react-router-dom";
import default_profile from "../../../assets/user/default_profile.jpg"

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 55px;
  position: fixed;
  top: 0;
  color: white;
`;

const Col = styled.div``;

const Col_r = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: center;

  /* @media (max-width: 768px) {
        display: none;
        } */
`;

// logo motion(hover 애니메이션)사용
const Logo = styled(motion.div)`
  padding: 0 20px;
  font-size: 30px;
  font-weight: bold;
  color: var(--butter);
`;

const Items = styled.ul`
  display: flex;
  font-size: 15px;
  font-weight: medium;
  height: 100%;
  align-items: center;
`;

const Item = styled.li`
  width: 120px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  align-items: center;
`;

const Profile = styled.li`
  width: 120px;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  #iconBox {
    display:flex;
    align-items: center;
    gap: 5px;
  }

  #profileImg , #default_profile {
    justify-content: flex-end;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    margin-left: 10px;
  }
`;

const SubProfile = styled(motion.ul)`
  overflow: hidden;
  right: 3px;
  position: absolute;
  top: 55px;
  margin-top: 3px;
  width: 170px;
  border-radius: 10px;
  background-color: #040a14;
  padding: 5px 0;
`;

const SubItem = styled(motion.div)`
  width: 160px;
  display: block;
  padding: 10px 0 10px 15px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #202226;
  }
`;

const SubItemComment = styled.li`
  width: 160px;
  padding: 10px 0 10px 15px;
  border-bottom: 1px solid white;
`;

const Bar = styled(motion.span)`
  position: absolute;
  width: 120px;
  height: 2px;
  background-color: var(--butter);
  bottom: -15px;
  border-radius: 30px;
`;

const logoVariants = {
  normal: {
    opacity: 1,
  },
  active: {
    opacity: 0.8,
  },
};

const subProfileVariants = {
  normal: {
    opacity: 0,
    // as const를 통해 변경할 수 없는 리터럴 값임을 명시 *안할 경우, 코드는 돌아가지만 "hidden", "visible"을 string으로 착각하여 variants에 오류가 뜸
    visibility: "hidden" as const,
  },
  active: {
    opacity: 1,
    visibility: "visible" as const,
    transition: { duration: 0.3 },
  },
};

function Navbar() {
  //useUserStore
  const memberType = useUserStore((state) => state.memberType);
  const profileImg = useUserStore((state) => state.profileImage);
  const nickname = useUserStore((state) => state.nickname);
  const isLogin = useUserStore((state) => state.isLogin);
  const logout = useUserStore((state) => state.logout);
  const crewLogout = useCrewStore((state) => state.logout);
  const navigate = useNavigate();

  const homeMatch = useMatch("");
  const buskingMatch = useMatch("busking");
  const streamMatch = useMatch("stream-list");
  const crewMatch = useMatch("crew/list");
  const clipMatch = useMatch("video/clip");
  const loginMatch = useMatch("auth/login");
  // isLogin이 true일 경우 profile dropdown 적용, false일 경우 login link만 렌더링링
  const [isHovered, setIsHovered] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const crewId = useCrewStore((state) => state.id)

  const memberLogout = () => {
    logout();
    crewLogout();
    removeAccessToken();
    navigate("/auth/login");
  };

  return (
    <>
      <Nav>
        <Col>
          {/* variants, whileHover를 통해 Hover시 동작할 모션 정의 초기값(initial)은 normal*/}
          <Link to="/">
            <Logo variants={logoVariants} initial="normal" whileHover="active">
              B
            </Logo>
          </Link>
        </Col>
        <Col_r>
          <Items>
            <Link to="/">
              <Item>HOME {homeMatch && <Bar layoutId="bar" />}</Item>
            </Link>
            {isLogin && <>
              <Link to="/busking">
                <Item>MAP {buskingMatch && <Bar layoutId="bar" />}</Item>
              </Link>
              <Link to="/stream-list">
                <Item>STREAMING {streamMatch && <Bar layoutId="bar" />}</Item>
              </Link>
              <Link to="/crew/list">
                <Item>CREW {crewMatch && <Bar layoutId="bar" />}</Item>
              </Link>
              <Link to="/video/clip">
                <Item>CLIP {clipMatch && <Bar layoutId="bar" />}</Item>
              </Link>
            </>
            }
          </Items>
          <Items>
            {isLogin ? (
              <Profile
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div id="iconBox">
                  <img src={bell} alt="Alert" onClick={() => {
                    setIsToggle(!isToggle)
                    setIsHovered(false)
                  }} />
                  {profileImg === "null" ?
                    <img id="default_profile" src={default_profile} alt="profileImg"/>
                    :
                    <img id="profileImg" src={profileImg || ""} alt="profileImg" />
                  }
                </div>
                <SubProfile
                  variants={subProfileVariants}
                  initial="normal"
                  animate={isHovered ? "active" : "normal"}
                >
                  <SubItemComment>
                    안녕하세요,
                    <br /> {nickname || "guest"}님!
                  </SubItemComment>
                  <Link to="/crew/myCalendar">
                    <SubItem>마이 캘린더</SubItem>
                  </Link>
                  {/* <Link to="/">
                    <SubItem>마이 크루</SubItem>
                  </Link> */}
                  {memberType == "crew" ? (
                    <>
                      <Link to={`/crew/detail/${crewId}`}>
                        <SubItem>마이 크루</SubItem>
                      </Link>
                      <Link to={`/crew/highlight/${crewId}`}>
                        <SubItem>마이 하이라이트</SubItem>
                      </Link>
                      <Link to={`/crew/video-edit/${crewId}`}>
                        <SubItem>하이라이트 편집</SubItem>
                      </Link>
                      <SubItem
                        className="openModalBtn"
                        onClick={() => {
                          setModalType("streaming");
                        }}
                      >
                        스트리밍 라이브
                      </SubItem>
                      <SubItem
                        onClick={() => {
                          setModalType("schedulePlus");
                        }}
                      >
                        버스킹 일정 등록
                      </SubItem>
                    </>
                  ) : (
                    <Link to="/crew/register">
                      <SubItem>크루 등록</SubItem>
                    </Link>
                  )}
                  <Link to="/bread/charge">
                    <SubItem>브레드 충전</SubItem>
                  </Link>
                  <Link to="/member/detail/guest">
                    <SubItem>회원정보 수정</SubItem>
                  </Link>
                  <SubItem onClick={memberLogout}>로그아웃</SubItem>
                </SubProfile>
              </Profile>
            ) : (
              <Link to="/auth/login">
                <Item>LOGIN {loginMatch && <Bar layoutId="bar" />}</Item>
              </Link>
            )}
          </Items>
        </Col_r>
      </Nav>
      {modalType === "streaming" && (
        <StreamingModal
          width="450px"
          height="230px"
          setModalType={setModalType}
        ></StreamingModal>
      )}
      {modalType === "schedulePlus" && <SchedulePlusModal width="600px" height="500px" setModalType={setModalType} id={crewId}></SchedulePlusModal>}
      <Alert isToggle={isToggle} />
    </>
  );
}

export default Navbar;

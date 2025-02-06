import styled from "@emotion/styled";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserExtraInfoModal } from "../../components/common/modals/UserExtraInfoModal";

const MemberDetailPageWrapper = styled.div`
  height: 100%;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MDContainer = styled.div`
  display:grid;
  width: 500px;
  background-color: black;
  overflow: hidden;
`

const MDHeader = styled.header`
  height: 55px;
  border-bottom: 1px dashed var(--darkgray);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`

const MDBody = styled.div`
  display: grid;
  grid-template-rows: 100px 1fr;
  background-color: rgba(0,0,0,0.8);

  /* height: 200px; */
  `

const MDUpper = styled.div`
  padding: 20px 20px 0;
  display: flex;
  align-items: center;
  gap: 15px;
  `
const MDLower = styled.div`
  padding: 10px 20px;
`
const MDLowerInfo = styled.div`
  display: flex;
  gap: 20px;
  padding: 5px 0;

  span {
    width: 80px;
    text-align: center;
    border-right: 1px solid white;
  }
`
const ChangePasswordLink = styled.div`
  display: flex;
  height: 30px;
  justify-content: flex-end;
  align-items: flex-end;
  transition: all ease-in-out 0.2s;
  
  div {
    padding: 5px 15px;
    background: var(--liner);
    color: black;
  }

  &:hover {
    opacity: 0.8;
  }
`

const ProfileLt = styled.div``
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--gray-bright);
  `
const ProfileRt = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  `
const Username = styled.div`
  font-size: 30px;
  `
const UserEmail = styled.div`
  font-weight: 200;
  `

const GenreContainer = styled.div`
  background: var(--liner);
  color: black;
  padding: 15px;
  border-radius: 15px 15px 0 0;
`
const GenreComment = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  gap: 5px;
  font-weight: 600;
  margin-bottom: 5px;
`

const GenreWrapper = styled.div`
  display: flex;
  gap: 5px;
`
const Genre = styled.div`
  padding: 5px 20px;
  background-color: black;
  color: var(--butter);
  border-radius: 30px;
`

const ExtraEditBtn = styled.div`
  width: 500px;
  height: 55px;
  background: var(--liner);
  display: flex;
  justify-content: center;
  padding-left: 15px;
  color: black;
  font-size: 20px; 
  flex-direction: column;
  transition: all ease-in-out 0.2s;

  span {
    font-size: 13px;
  }

  &:hover {
    opacity: 0.8;
  }
`

const MemberDetailPage = () => {
  const sampleUserInfo = {
    id: "guest-id",
    email: "guest@naver.com",
    nickname: "guest",
    genres: ["R&B", "Indie", "Pop"],
    birth: "20001028",
    gender: "woman",
    pet: "pet1",
  }

  const [userInfo, setUserInfo] = useState({})
  const [userId, setUserId] = useState<number | null>(null)
  useEffect(() => {
    const getUserInfo = async () => {
      try{  
        const response = await axios.get(`/api/v1/member/detail/${userId}`);
        setUserInfo(response.data)
      } catch (error) {
        console.error('회원정보 페이지_getUserInfo_api_error :', error)
      }
    }
  })

  const [modalType, setModalType] = useState<string>("");
  return (
  <>
  <MemberDetailPageWrapper>
    <MDContainer>
      <MDHeader>회원 정보</MDHeader>
      <MDBody>
        <MDUpper>
          <ProfileLt>
            <ProfileImg />
          </ProfileLt>
          <ProfileRt>
            <Username>{sampleUserInfo.nickname}</Username>
            <UserEmail>{sampleUserInfo.email}</UserEmail>
          </ProfileRt>
        </MDUpper>
        <MDLower>
          <MDLowerInfo><span>id</span>{sampleUserInfo.id}</MDLowerInfo>
          <MDLowerInfo><span>gender</span>{sampleUserInfo.gender}</MDLowerInfo>
          <MDLowerInfo><span>birth</span>{sampleUserInfo.birth}</MDLowerInfo>
          <ChangePasswordLink><Link to="/"><div>비밀번호 변경</div></Link></ChangePasswordLink>
        </MDLower>
        <GenreContainer>
          <GenreComment>회원님이 선호하는 장르 입니다!</GenreComment>
          <GenreWrapper>
            { sampleUserInfo.genres.map( genre => 
              <Genre>{genre}</Genre>
            )}
          </GenreWrapper>
        </GenreContainer>
      </MDBody>
    </MDContainer>
    <ExtraEditBtn onClick={()=> { setModalType("extraInfo")}}>
      EDIT EXTRA INFO
      <span>#profile #nickname #genre #pet</span>
    </ExtraEditBtn>
  </MemberDetailPageWrapper>
  {modalType === "extraInfo" && <UserExtraInfoModal width="800px" height="400px" setModalType={setModalType}></UserExtraInfoModal>}
  </>
  );
};

export default MemberDetailPage;

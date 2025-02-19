import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { UserExtraInfoModal_v2 } from "../../components/common/modals/UserExtraInfoModal";
import { memberDetailRequest } from "../../apis/request/member/memberRequest";
import { MemberDetailResponseDto } from "../../apis/response/member";
import { ChangePSModal } from "../../components/common/modals/ChangePSModal";
import { useUserStore } from "../../stores/UserStore";


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
  padding: 10px 20px 120px 20px;
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
  padding: 0 10px 10px 0;
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

const NoneProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: var(--gray-bright);
  `
const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
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

interface UserInfoDto {
  id: string;
  email: string;
  birth: string;
  gender: string;
}

const MemberDetailPage = () => {
  const nickname = useUserStore(state => state.nickname)
  const genres = useUserStore(state => state.genres)
  const profileImg = useUserStore(state => state.profileImage)
  const avatarType = useUserStore(state => state.avatarType)
  const [userInfo, setUserInfo] = useState<UserInfoDto>({
    id: "",
    email: "",
    birth: "",
    gender: "",
  })

  useEffect(() => {
    memberDetailRequest().then((responseBody: MemberDetailResponseDto | null) => {
      if (!responseBody) return;
      // console.log(responseBody)

      setUserInfo({
        id: String(responseBody.loginId ?? ""),
        email: String(responseBody.email ?? ""),
        birth: String(responseBody.birthdate ?? ""),
        gender: String(responseBody.gender ?? ""),
      });

    })
  }, [])

  const [modalType, setModalType] = useState<string>("");
  return (
    <>
      <MemberDetailPageWrapper>
        <MDContainer>
          <MDHeader>회원 정보</MDHeader>
          <MDBody>
            <MDUpper>
              <ProfileLt>
                {profileImg === "" ?
                  <NoneProfileImg />
                  : <ProfileImg src={profileImg || ""} alt="Profile" style={{ width: 80, height: 80, borderRadius: "50%" }} />
                }
              </ProfileLt>
              <ProfileRt>
                <Username>{nickname}</Username>
                <UserEmail>{userInfo.email}</UserEmail>
              </ProfileRt>
            </MDUpper>
            <MDLower>
              <MDLowerInfo><span>id</span>
                {userInfo.id === "" ?
                  "Social-login" :
                  `${userInfo.id}`
                }
              </MDLowerInfo>
              <MDLowerInfo><span>gender</span>{userInfo.gender}</MDLowerInfo>
              <MDLowerInfo><span>birth</span>{userInfo.birth.split(",").join("-")}</MDLowerInfo>
            </MDLower>
            {userInfo.id !== "" && <ChangePasswordLink onClick={() => { setModalType("changePs") }} ><div>비밀번호 변경</div></ChangePasswordLink>}
            <GenreContainer>
              <GenreComment>회원님이 선호하는 장르 입니다!</GenreComment>
              <GenreWrapper>
                {genres.map(genre =>
                  <Genre key={genre}>{genre}</Genre>
                )}
              </GenreWrapper>
            </GenreContainer>
          </MDBody>
        </MDContainer>
        <ExtraEditBtn onClick={() => { setModalType("extraInfo") }}>
          EDIT EXTRA INFO
          <span>#profile #nickname #genre #pet</span>
        </ExtraEditBtn>
      </MemberDetailPageWrapper>
      {modalType === "extraInfo" && <UserExtraInfoModal_v2 width="800px" height="400px" setModalType={setModalType}></UserExtraInfoModal_v2>}
      {modalType === "changePs" && <ChangePSModal width="500px" height="400px" setModalType={setModalType} ></ChangePSModal>}
    </>
  );
};

export default MemberDetailPage;

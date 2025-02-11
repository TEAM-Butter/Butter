import styled from "@emotion/styled";
import NaverLogin from "../../components/user/Naver/NaverLogin";
const HomePageWrapper = styled.div`
  // styles here
`;

const HomePage = () => {
  return (<>
    <NaverLogin />
    <HomePageWrapper>Homepage</HomePageWrapper>
  </>);
};

export default HomePage;

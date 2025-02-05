import styled from "@emotion/styled";
import { UserExtraInfoModal } from "../../components/common/modals/UserExtraInfoModal";
import { useState } from "react";

const HomePageWrapper = styled.div`
  // styles here
`;

const HomePage = () => {
  const [modalType, setModalType] = useState<string>("");
  return (<>
  <HomePageWrapper>Homepage</HomePageWrapper>
  {modalType === "extraInfo" && <UserExtraInfoModal width="800px" height="400px" setModalType={setModalType}></UserExtraInfoModal>}
  </>);
};

export default HomePage;

import styled from "@emotion/styled";
const BreadChargePageWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const MDContainer = styled.div`
  display: grid;
  width: 500px;
  background-color: black;
  overflow: hidden;
`;

const MDHeader = styled.header`
  height: 55px;
  border-bottom: 1px dashed var(--darkgray);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const MDLowerHeader = styled.div`
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const MDBody = styled.div`
  display: grid;
  padding: 20px;
  grid-template-rows: 100px 1fr;
  background-color: rgba(0, 0, 0, 0.8);

  /* height: 200px; */
`;

const MDUpper = styled.div`
  padding: 20px 20px 0;
  display: flex;
  align-items: center;
  gap: 15px;
`;
const MDLower = styled.div`
  background-color: aliceblue;
  margin: 10px;
  color: black;
  padding: 15px 20px;
`;

const BreadInfo = styled.div`
  background-color: aliceblue;
  display: flex;
  justify-content: space-between;
  margin: 10px;
  color: black;
  font-weight: bold;
  padding: 15px 20px;
`;

const MDLowerInfo = styled.div`
  display: flex;
  border-bottom: 1px dashed var(--darkgray);
  gap: 10px;
  padding: 5px 0;
  margin: 10px;

  span {
    width: 80px;
    text-align: center;
    border-right: 1px solid white;
  }
`;

const ProfileRt = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
`;
const Username = styled.div`
  font-size: 30px;
`;

const PayWrapper = styled.div`
  display: flex;
  justify-content: end;
`;

const PayBtn = styled.div`
  width: 100px;
  height: 30px;
  font-size: 18px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--yellow);
  border-radius: 15px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
interface MemberDetailResponseDto {
  loginId: string;
  email: string;
  birthdate: string;
  gender: string;
  profileImage: string;
  nickname: string;
  genres: string[];
  avatarType: string;
  isExtraInfoRegistered: boolean;
}

import { loadPaymentWidget } from "@iamport/payment"; // 아임포트 SDK 추가
import { axiosInstance } from "../../apis/axiosInstance";
import { useUserStore } from "../../stores/UserStore";
import { useEffect, useState } from "react";
import { memberDetailRequest } from "../../apis/request/member/memberRequest";
import { getBreadAmount } from "../../apis/request/bread/breadRequest";
interface BreadResponseDto {
  impUid: string;
}

const BreadChargePage = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const priceMap = { 100: 100, 500: 100, 1000: 100 } as const;
  const breads = [100, 500, 1000, 5000, 10000];
  const [userBread, setUserBread] = useState(0);
  const nickname = useUserStore((state) => state.nickname);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBreadAmount();
      setUserBread(response.breadAmount);
    };
    fetchData();
  });

  const handlePayment = async () => {
    const price = priceMap[selectedAmount as keyof typeof priceMap];

    if (!window.IMP) {
      alert("결제 모듈을 불러오지 못했습니다.");
      return;
    }

    const IMP = window.IMP;
    IMP.init("imp05627177"); // 본인의 아임포트 가맹점 식별코드로 변경

    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: `order_${new Date().getTime()}`, // 주문 번호 (고유 값)
        name: "빵 구매",
        amount: price,
        buyer_email: "test@example.com",
        buyer_name: nickname,
        // buyer_tel: "010-1234-5678",
        // buyer_addr: "서울특별시 강남구",
        // buyer_postcode: "123-456",
      },
      async (response: any) => {
        if (response.success) {
          const verifyResponse = await axiosInstance
            .post("/bread/verify-payment", { impUid: response.imp_uid })
            .then((response) => {
              const responseBody: BreadResponseDto = response.data;
              alert("결제가 성공적으로 완료되었습니다.");

              return responseBody;
            })
            .catch((error) => {
              console.log("MemberExtraInfo api error:", error);
              alert("결제 검증에 실패했습니다. 고객센터에 문의하세요.");
              return null;
            });

          console.log(verifyResponse);
        } else {
          alert(`결제 실패: ${response.error_msg}`);
        }
      }
    );
  };

  useEffect(() => {
    memberDetailRequest().then(
      (responseBody: MemberDetailResponseDto | null) => {
        if (!responseBody) return;
        console.log(responseBody);
      }
    );
  }, []);
  return (
    <>
      <BreadChargePageWrapper>
        <MDContainer>
          <MDHeader>충전하기</MDHeader>
          <MDBody>
            <MDUpper>
              <ProfileRt>
                <Username>{nickname}</Username>
                <div>님의 캐시함</div>
              </ProfileRt>
            </MDUpper>
            <BreadInfo>
              <div>보유빵</div>
              <div>{userBread} bread</div>
            </BreadInfo>
            <MDLower>
              <MDLowerHeader>충전 단위 선택</MDLowerHeader>
              {breads.map((bread) => {
                console.log(bread);
                return (
                  <MDLowerInfo key={bread}>
                    <input
                      type="radio"
                      name="bread"
                      value={bread}
                      checked={selectedAmount === bread}
                      onChange={() => setSelectedAmount(bread)}
                    />{" "}
                    {bread} bread
                  </MDLowerInfo>
                );
              })}

              <PayWrapper>
                <PayBtn onClick={handlePayment}>결제하기</PayBtn>
              </PayWrapper>
            </MDLower>
          </MDBody>
        </MDContainer>
      </BreadChargePageWrapper>
    </>
  );
};

export default BreadChargePage;

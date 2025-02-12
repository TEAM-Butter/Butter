import styled from "@emotion/styled";
import { useState } from "react";
import { loadPaymentWidget } from "@iamport/payment"; // 아임포트 SDK 추가

const SignupPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
`;

const LtContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  gap: 15px;
`;

const RtContainer = styled.div``;

const SignupFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 40px;
  min-width: 400px;
  border-radius: 30px;
  background: var(--liner);

    h3 {
    color: black;
  }
`;

const StyledLabel = styled.label`
  color: black;
`;


const BreadRechargePage = () => {
  const [selectedAmount, setSelectedAmount] = useState(100);
  const priceMap = { 100: 1100, 500: 5500, 1000: 11000 } as const;
  
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
        buyer_name: "홍길동",
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구",
        buyer_postcode: "123-456",
      },
      async (response: any) => {
        if (response.success) {
          try {
            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ imp_uid: response.imp_uid }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              alert("결제가 성공적으로 완료되었습니다.");
            } else {
              alert("결제 검증에 실패했습니다. 고객센터에 문의하세요.");
            }
          } catch (error) {
            console.error("결제 검증 오류:", error);
            alert("결제 검증 중 오류가 발생했습니다.");
          }
        } else {
          alert(`결제 실패: ${response.error_msg}`);
        }
      }
    );
  };

  return (
    <SignupPageWrapper>
      <LtContainer>
        <SignupFormWrapper>
          <h3>구매할 빵의 개수를 선택하세요</h3>
          <StyledLabel>
            <input
              type="radio"
              name="bread"
              value="100"
              checked={selectedAmount === 100}
              onChange={() => setSelectedAmount(100)}
            />{" "}
            100개
          </StyledLabel>
          <StyledLabel>
            <input
              type="radio"
              name="bread"
              value="500"
              checked={selectedAmount === 500}
              onChange={() => setSelectedAmount(500)}
            />{" "}
            500개
          </StyledLabel>
          <StyledLabel>
            <input
              type="radio"
              name="bread"
              value="1000"
              checked={selectedAmount === 1000}
              onChange={() => setSelectedAmount(1000)}
            />{" "}
            1000개
          </StyledLabel>
          <button onClick={handlePayment}>결제하기</button>
        </SignupFormWrapper>
      </LtContainer>
      <RtContainer></RtContainer>
    </SignupPageWrapper>
  );
};

export default BreadRechargePage;

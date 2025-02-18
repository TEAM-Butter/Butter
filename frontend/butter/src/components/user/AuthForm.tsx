import styled from "@emotion/styled";
import { useState } from "react";
import { LoginRequestDto } from "../../apis/request/auth/authDto";
import { signupRequest } from "../../apis/request/member/memberRequest";
import { loginRequest } from "../../apis/request/auth/authRequest";
import { LoginResponseDto } from "../../apis/response/auth";
import { SignUpRequestDto } from "../../apis/request/member/memberDto";
import { setAccessToken } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/UserStore";
import { useCrewStore } from "../../stores/UserStore";
import NaverLogin from "./Naver/NaverLogin";

const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const LgText = styled.div<ColorProps>`
  min-height: 100px;
  display: flex;
  flex-direction: column-reverse;
  font-size: 35px;
  color: ${(props) => props.textColor};
  font-weight: 200;
`;

const TextInput = styled.input`
  background-color: transparent;
  border: none;
  border-bottom: 1px solid black;
  padding: 15px 5px;
  font-size: 17px;
  font-weight: 500;
  margin-top: 10px;

  &::placeholder {
    color: var(--darkgray);
}
`;

const FormBtn = styled.button<ColorProps>`
  border: none;
  background-color: ${(props) => props.bgColor};
  width: 100%;
  height: 50px;
  border-radius: 30px;
  font-size: 18px;
  color: white;
  margin-top: 12px;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: transparent;
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.6);
  }
`;

interface ColorProps {
  bgColor?: string;
  textColor?: string;
}

const WrongComment = styled.div`
  flex: 1;
  min-height: 30px;
`;

// Login Css
const ForgetComment = styled.div`
  color: #6d6d6d;
  font-size: 14px;
  padding: 10px 0 15px 0;
`;

interface ModalProps {
  setModalType: React.Dispatch<React.SetStateAction<string>>;
}

export const LoginForm = ({ setModalType }: ModalProps) => {
  const setUser = useUserStore((state) => state.setUser);
  const setCrew = useCrewStore((state) => state.setCrew);
  const navigator = useNavigate();

  const [loginId, setLoginId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const LoginBtnHandler = () => {
    const requestBody: LoginRequestDto = { loginId, password };
    loginRequest(requestBody).then((responseBody: LoginResponseDto | null) => {
      const { accessToken } = responseBody as LoginResponseDto;
      setAccessToken(accessToken);
      navigator(`/`);

      setUser(
        true,
        String(responseBody?.authenticatedMemberInfo.nickname),
        String(responseBody?.authenticatedMemberInfo.profileImage),
        String(responseBody?.authenticatedMemberInfo.avatarType),
        String(responseBody?.authenticatedMemberInfo.memberType),
        Boolean(responseBody?.authenticatedMemberInfo.isExtraInfoRegistered),
        responseBody?.authenticatedMemberInfo.genres || []
      );

      setCrew(
        Number(responseBody?.authenticatedMemberInfo.crew.id),
        String(responseBody?.authenticatedMemberInfo.crew.name),
        String(responseBody?.authenticatedMemberInfo.crew.description),
        String(responseBody?.authenticatedMemberInfo.crew.imageUrl),
        String(responseBody?.authenticatedMemberInfo.crew.promotionUrl),
        String(responseBody?.authenticatedMemberInfo.crew.createDate),
        Number(responseBody?.authenticatedMemberInfo.crew.followerCnt)
      );
    });
  };
  return (
    <FormWrapper
      onSubmit={(e) => {
        e.preventDefault();
        LoginBtnHandler();
      }}
    >
      <LgText textColor="black">
        Log into
        <br />
        your account
      </LgText>
      <TextInput
        required
        type="text"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        placeholder="type your id."
      />
      <TextInput
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="type your password."
      />
      <ForgetComment
        className="openModalBtn"
        onClick={() => {
          setModalType("forgotAuth");
        }}
      >
        아이디/ 비밀번호를 잊어버리셨나요?
      </ForgetComment>
      <WrongComment></WrongComment>
      <FormBtn
        bgColor="rgba(0,0,0,0.4)"
        type="button"
        onClick={LoginBtnHandler}
      >
        Log in
      </FormBtn>
      <FormBtn bgColor="black">
        <NaverLogin />
      </FormBtn>
    </FormWrapper>
  );
};

const RadioWrapper = styled.div`
  display: flex;
  gap: 5px;
  padding: 10px 0;
`;

const InputLabel = styled.label`
  color: var(--darkgray);
  display: flex;
  align-items: center;
  gap: 3px;
`;
const RadioInput = styled.input``;
const BirthInput = styled.input`
  margin-left: 5px;
`;

export const SignupForm = () => {
  const navigator = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setCrew = useCrewStore((state) => state.setCrew);
  const [loginId, setLoginId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  const LoginHandler = () => {
    const requestBody: LoginRequestDto = { loginId, password };
    loginRequest(requestBody).then((responseBody: LoginResponseDto | null) => {
      const { accessToken } = responseBody as LoginResponseDto;
      setAccessToken(accessToken);
      navigator(`/`);
      setUser(
        true,
        String(responseBody?.authenticatedMemberInfo.nickname),
        String(responseBody?.authenticatedMemberInfo.profileImage),
        String(responseBody?.authenticatedMemberInfo.avatarType),
        String(responseBody?.authenticatedMemberInfo.memberType),
        Boolean(responseBody?.authenticatedMemberInfo.isExtraInfoRegistered),
        responseBody?.authenticatedMemberInfo.genres || []
      );

      setCrew(
        Number(responseBody?.authenticatedMemberInfo.crew.id),
        String(responseBody?.authenticatedMemberInfo.crew.name),
        String(responseBody?.authenticatedMemberInfo.crew.description),
        String(responseBody?.authenticatedMemberInfo.crew.imageUrl),
        String(responseBody?.authenticatedMemberInfo.crew.promotionUrl),
        String(responseBody?.authenticatedMemberInfo.crew.createDate),
        Number(responseBody?.authenticatedMemberInfo.crew.followerCnt)
      );
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requestBody: SignUpRequestDto = {
      loginId,
      password,
      email,
      gender,
      birthDate,
    };
    signupRequest(requestBody).then(() => {
      LoginHandler();
    });
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <LgText textColor="black">
        Sign up
        <br />
        your account
      </LgText>
      <TextInput
        required
        type="text"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        placeholder="type your id."
      />
      <TextInput
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="type your email."
      />
      <TextInput
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="type your password."
      />
      <RadioWrapper>
        <InputLabel>
          <RadioInput
            required
            type="radio"
            id="female"
            name="gender"
            value="FEMALE"
            onChange={(e) => setGender(e.target.value)}
          />
          woman
        </InputLabel>
        <InputLabel>
          <RadioInput
            required
            type="radio"
            id="male"
            name="gender"
            value="MALE"
            onChange={(e) => setGender(e.target.value)}
          />
          man
        </InputLabel>
      </RadioWrapper>
      <InputLabel>
        Birth Date
        <BirthInput
          required
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          aria-required="true"
        />
      </InputLabel>
      <WrongComment></WrongComment>
      <FormBtn bgColor="rgba(0,0,0,0.4)" type="submit">
        Sign up
      </FormBtn>
    </FormWrapper>
  );
};

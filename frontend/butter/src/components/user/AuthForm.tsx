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
import { CheckLoginIdRequest } from "../../apis/request/member/memberRequest";
import { CheckLoginIdResponseDto } from "../../apis/response/member";
import NaverLogin from "./Naver/NaverLogin";
import { motion } from "framer-motion";
import { Password } from "@mui/icons-material";

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

const ErrorComment = styled(motion.div)`
  flex: 1;
  min-height: 30px;
  color: var(--red);

  display: flex;
  flex-direction: column-reverse;
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

  const [errorComment, setErrorComment] = useState("");
  const [changeSensor, setChangeSensor] = useState(true);

  const CheckExistId = () => {
    CheckLoginIdRequest({ loginId: loginId })
      .then((responseBody: CheckLoginIdResponseDto | null) => {
        if (responseBody?.exists) {
          LoginBtnHandler();
        } else {
          setChangeSensor(!changeSensor);
          setErrorComment("존재하지 않는 아이디 입니다. 아이디와 비밀번호를 정확히 입력해주세요.");
        }
      })
  }

  const LoginBtnHandler = () => {
    const requestBody: LoginRequestDto = { loginId, password };

    loginRequest(requestBody)
      .then((responseBody: LoginResponseDto | null) => {
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
      })
      .catch(() => {
        setChangeSensor(!changeSensor);
        setErrorComment("잘못된 비밀번호입니다. 다시 시도하거나 비밀번호 찾기를 클릭하여 재설정하세요.");
      })
  };
  return (
    <FormWrapper
      onSubmit={(e) => {
        e.preventDefault();
        CheckExistId();
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
        placeholder="아이디를 입력해 주세요."
      />
      <TextInput
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해 주세요."
      />
      <ForgetComment
        className="openModalBtn"
        onClick={() => {
          setModalType("forgotAuth");
        }}
      >
        아이디/ 비밀번호를 잊어버리셨나요?
      </ForgetComment>
      <ErrorComment
        key={changeSensor ? "true" : "false"}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >{errorComment ? errorComment : ""}</ErrorComment>
      <FormBtn
        bgColor="rgba(0,0,0,0.4)"
        type="submit"
      >
        Log in
      </FormBtn>
      <FormBtn bgColor="black">
        <NaverLogin />
      </FormBtn>
    </FormWrapper>
  );
};


//회원가입 폼

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

const IdInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > input {
    flex: 1
  }

  #checkIdBtn {
    width: 70px;
    height: 30px;
    border-radius: 20px;
    font-weight: 300;
    font-size: 15px;
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: black;
  }
`

const PasswordInfo = styled.div`
  color: #b5d584;
  font-size: 15px;
  margin-top: 5px;
`

export const SignupForm = () => {
  const navigator = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const setCrew = useCrewStore((state) => state.setCrew);
  const [loginId, setLoginId] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [birthDate, setBirthDate] = useState<string>("");

  const [isIdChecked, setIsIdChecked] = useState(false);
  const [errorComment, setErrorComment] = useState("");
  const [changeSensor, setChangeSensor] = useState(true);

  const CheckExistId = () => {
    CheckLoginIdRequest({ loginId: loginId })
      .then((responseBody: CheckLoginIdResponseDto | null) => {
        if (responseBody?.exists) {
          LoginHandler();
          setChangeSensor(!changeSensor);
          setErrorComment("이미 존재하는 아이디 입니다.");
        } else {
          setChangeSensor(!changeSensor);
          setErrorComment("존재하지 않는 아이디 입니다.");
          setIsIdChecked(true);
        }
      })
  }

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

  const handleSignUp = () => {
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
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}[\]:;"'<>,.?/\\|`~]).{8,}$/;
    const isValidateEmail = emailRegex.test(email);
    const isValidateBirth = new Date(birthDate) < new Date();
    const isValidatePS = passwordRegex.test(password);


    if (!isIdChecked) {
      setChangeSensor(!changeSensor);
      setErrorComment("아이디를 확인해 주세요.");
      return;
    } else if (!isValidateEmail) {
      setChangeSensor(!changeSensor);
      setErrorComment("유효한 이메일을 기입해 주세요.");
      return;
    } else if (!isValidatePS) {
      setChangeSensor(!changeSensor);
      setErrorComment("유효한 비밀번호를 기입해 주세요.");
      return;
    } else if (!isValidateBirth) {
      setChangeSensor(!changeSensor);
      setErrorComment("유효한 생년월일을 기입해 주세요.");
      return;
    } else {
      handleSignUp();
    }

  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <LgText textColor="black">
        Sign up
        <br />
        your account
      </LgText>
      <IdInputWrapper>
        <TextInput
          required
          type="text"
          value={loginId}
          onChange={(e) => setLoginId(e.target.value)}
          placeholder="아이디를 입력해 주세요."
        />
        <div id="checkIdBtn" onClick={CheckExistId}>확인</div>
      </IdInputWrapper>
      <TextInput
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일을 입력해 주세요."
      />
      <TextInput
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력해 주세요."
      />
      <PasswordInfo>※ 영문자/숫자/특수문자 혼용 8자 이상</PasswordInfo>
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
      <ErrorComment
        key={changeSensor ? "true" : "false"}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >{errorComment ? errorComment : ""}</ErrorComment>
      <FormBtn bgColor="rgba(0,0,0,0.4)" type="submit">
        Sign up
      </FormBtn>
    </FormWrapper>
  );
};

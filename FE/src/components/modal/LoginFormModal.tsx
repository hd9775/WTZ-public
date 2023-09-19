import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import { login } from "../../api/axios/usersApiCall";
import { useState } from "react";
import { useAccessTokenState } from "../../context/accessTokenContext";
import loginBox from "../../assets/img/home/loginBox.png";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import loginBtn from "../../assets/img/home/loginBtn2.png";
import { SFX, playSFX } from "../../utils/audioManager";

const LoginFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken, setUserSeq, setNickname } = useAccessTokenState();

  const emailHandleChange = (newValue: string) => {
    setEmail(newValue);
  };
  const passwordHandleChange = (newValue: string) => {
    setPassword(newValue);
  };

  const clearAllInput = () => {
    setEmail("");
    setPassword("");
  };

  const onLogin = async () => {
    if (email === "" || password === "") {
      toast.warn("이메일, 비밀번호를 입력하세요.");
      return;
    }

    const { accessToken, userSeq, nickname } = await login(email, password);
    setAccessToken(accessToken);
    setUserSeq(userSeq);
    setNickname(nickname);
    showModalHandler(Modal_Category_Map.NONE);
    clearAllInput();
  };

  const debouncedOnLogin = debounce(onLogin, 500);
  const debouncedOnSignup = debounce(() => {
    showModalHandler(Modal_Category_Map.SIGNUP);
    clearAllInput();
  }, 500);

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.LOGIN}
      onClose={() => {
        showModalHandler(Modal_Category_Map.NONE);
        setEmail("");
        setPassword("");
      }}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={1}
      height={1}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{ backgroundColor: "transparent" }}
    >
      <img
        src={loginBox}
        className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:min-w-[560px] min-w-[448px] 3xl:h-[480px] h-[384px] bg-transparent"
      />
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:min-w-[560px] min-w-[448px] 3xl:h-[480px] h-[384px] 3xl:py-[32px] py-[25.6px] 3xl:px-[60px] px-[48px] bg-transparent">
        <h2 className="text-center font-bold 3xl:text-[48px] text-[38.4px] 3xl:mb-[36px] mb-[28.8px]">로그인</h2>
        <InputForm label="이메일" value={email} handleChange={emailHandleChange} />
        <InputForm
          label="비밀번호"
          value={password}
          handleChange={passwordHandleChange}
          isTypePassword={true}
          onKeyUpEvent={debouncedOnLogin}
        />
        <div className="flex 3xl:mt-[30px] mt-[24px] justify-around">
          <button
            className={`text-black rounded-lg transition-colors bg-cover duration-500 font-bold mx-2 3xl:text-[24px] text-[19.2px] 3xl:w-[180px] w-[144px] 3xl:h-[62px] h-[49.6px]`}
            style={{
              backgroundImage: `url("${loginBtn}")`,
            }}
            onClick={() => {
              debouncedOnLogin();
              playSFX(SFX.CLICK);
            }}
          >
            로그인
          </button>
          <button
            className={`text-black rounded-lg transition-colors bg-cover duration-500 font-bold mx-2 3xl:text-[24px] text-[19.2px] 3xl:w-[170px] w-[136px] 3xl:h-[62px] h-[49.6px]`}
            style={{
              backgroundImage: `url("${loginBtn}")`,
            }}
            onClick={() => {
              debouncedOnSignup();
              playSFX(SFX.CLICK);
            }}
          >
            회원가입
          </button>
        </div>
        <div className="text-center">
          <div
            className=" 3xl:text-[18px] text-[14.4px] 3xl:mt-[10px] mt-[8px] text-slate-400 hover:text-slate-800 transition-colors duration-500 "
            onClick={() => {
              showModalHandler(Modal_Category_Map.RESET_PASSWORD);
              clearAllInput();
            }}
          >
            비밀번호를 잊으셨나요?
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default LoginFormModal;

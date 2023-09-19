import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import useFormField from "../../hooks/useFormField";
import { validateEmail, validateNickname, validatePassword } from "../../utils/validateForm";
import { FORM_FIELD_MAP } from "../../constants/home/FormFieldMap";
import { useState } from "react";
import { toast } from "react-toastify";
import { sendEmailVerificationCodeWithSignup, signup } from "../../api/axios/usersApiCall";
import signupBox from "../../assets/img/home/signupBox.png";
import { debounce } from "lodash";
import codeBtn from "../../assets/img/home/loginBtn2.png";
import signupBtn from "../../assets/img/home/loginBtn2.png";
import { SFX, playSFX } from "../../utils/audioManager";

const SignupFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const emailField = useFormField("", validateEmail);
  const nicknameField = useFormField("", validateNickname);
  const passwordField = useFormField("", validatePassword);
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendEmailVerificationCode, setIsSendEmailVerificationCode] = useState(false);

  const isValidList = [passwordField.isValid, confirmPasswordField.isValid, nicknameField.isValid];

  const onSendVerificationCode = async () => {
    if (!emailField.isValid) {
      toast.warn("이메일형식이 올바르지 않습니다.");
      return;
    }

    await sendEmailVerificationCodeWithSignup(emailField.value);
    setIsSendEmailVerificationCode(true);
  };

  const onSignup = async () => {
    if (!isSendEmailVerificationCode) {
      toast.warn("이메일 인증코드를 발송하지 않았습니다.");
      return;
    }
    const inValidIndex = isValidList.findIndex((isValid) => !isValid);
    switch (inValidIndex) {
      case FORM_FIELD_MAP.PASSWORD:
        toast.warn("비밀번호는 숫자와 영문이 포함 6자리 이상으로 입력해주세요.");
        return;
      case FORM_FIELD_MAP.CONFIRM_PASSWORD:
        toast.warn("비밀번호가 일치하지 않습니다.");
        return;
      case FORM_FIELD_MAP.NICKNAME:
        toast.warn("닉네임은 10자리이하로 입력해주세요.");
        return;
    }

    await signup(emailField.value, passwordField.value, nicknameField.value, verificationCode);
    showModalHandler(Modal_Category_Map.LOGIN);
  };

  const debouncedOnSignup = debounce(onSignup, 500);
  const debouncedOnSendVerificationCode = debounce(onSendVerificationCode, 500);

  const clearAllInput = () => {
    emailField.clear();
    nicknameField.clear();
    passwordField.clear();
    confirmPasswordField.clear();
    setVerificationCode("");
  };

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.SIGNUP}
      onClose={() => {
        showModalHandler(Modal_Category_Map.NONE);
        clearAllInput();
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
        src={signupBox}
        className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:min-w-[580px] min-w-[464px] 3xl:h-[700px] h-[560px]"
      />
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[460px] w-[368px] 3xl:h-[700px] h-[560px]">
        <h2 className="text-center font-bold 3xl:text-[48px] text-[38.4px] 3xl:my-[24px] my-[19.2px]">회원가입</h2>

        <div className="flex items-end ">
          <div className="3xl:mb-[8px] mb-[6.4px] w-[69%]">
            <label className="3xl:ml-[4px] ml-[3.2px] 3xl:text-[24px] text-[19.2px]">이메일</label>
            <input
              className=" 3xl:h-[40px] h-[32px] border-solid border-black 3xl:border-[2px] border-[1.6px] w-full 3xl:text-[24px] text-[19.2px] 3xl:px-[10px] px-[8px]"
              onChange={(e) => emailField.onChange(e.target.value)}
              value={emailField.value}
            />
          </div>
          <button
            className={`text-black rounded-lg transition-colors bg-cover duration-500 font-bold 3xl:mx-[10px] mx-[8px] 3xl:my-[5px] my-[4px] 3xl:text-[20px] text-[16px] 3xl:w-[130px] w-[104px] 3xl:h-[46px] h-[36.8px]`}
            style={{
              backgroundImage: `url("${codeBtn}")`,
            }}
            onClick={() => {
              debouncedOnSendVerificationCode();
              playSFX(SFX.CLICK);
            }}
          >
            인증요청
          </button>
        </div>

        <div className="3xl:mb-[8px] mb-[6.4px] w-full">
          <label className="3xl:ml-[4px] ml-[3.2px] 3xl:text-[24px] text-[19.2px]">인증코드</label>
          <input
            className=" 3xl:h-[40px] h-[32px] border-solid border-black 3xl:border-[2px] border-[1.6px] w-full 3xl:text-[24px] text-[19.2px] 3xl:px-[10px] px-[8px]"
            onChange={(e) => setVerificationCode(e.target.value)}
            value={verificationCode}
          />
        </div>

        <InputForm
          label="비밀번호"
          value={passwordField.value}
          handleChange={passwordField.onChange}
          isTypePassword={true}
        />
        <InputForm
          label="비밀번호 확인"
          value={confirmPasswordField.value}
          handleChange={confirmPasswordField.onChange}
          isTypePassword={true}
        />
        <InputForm
          label="닉네임"
          value={nicknameField.value}
          handleChange={nicknameField.onChange}
          onKeyUpEvent={debouncedOnSignup}
        />

        <div className="flex justify-around 3xl:mt-[20px] mt-[16px]">
          <button
            className={`text-black rounded-lg transition-colors bg-cover duration-500 font-bold mx-2 3xl:text-[24px] text-[19.2px] 3xl:w-[180px] w-[144px] 3xl:h-[62px] h-[49.6px]`}
            style={{
              backgroundImage: `url("${signupBtn}")`,
            }}
            onClick={() => {
              debouncedOnSignup();
              playSFX(SFX.CLICK);
            }}
          >
            회원가입
          </button>
          <button
            className={`text-black rounded-lg transition-colors bg-cover duration-500 font-bold mx-2 3xl:text-[24px] text-[19px] 3xl:w-[180px] w-[144px] 3xl:h-[62px] h-[49.6px]`}
            style={{
              backgroundImage: `url("${signupBtn}")`,
            }}
            onClick={() => {
              clearAllInput();
              showModalHandler(Modal_Category_Map.LOGIN);
            }}
          >
            로그인 하기
          </button>
        </div>
        <div className="text-center">
          <div
            className=" 3xl:mt-[8px] mt-[6.4px] 3xl:text-[18px] text-[14.4px] text-slate-400 hover:text-slate-800 transition-colors duration-500 "
            onClick={() => {
              clearAllInput();
              showModalHandler(Modal_Category_Map.RESET_PASSWORD);
            }}
          >
            비밀번호를 잊으셨나요?
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default SignupFormModal;

import { InputForm } from "./InputForm";
import Rodal from "rodal";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import { FormModalProps } from "../../types/FormModalProps";
import { useState } from "react";
import useFormField from "../../hooks/useFormField";
import { validateEmail, validatePassword } from "../../utils/validateForm";
import { toast } from "react-toastify";
import { resetPassword, sendEmailVerificationCodeWithResetPw } from "../../api/axios/usersApiCall";
import { FORM_FIELD_MAP } from "../../constants/home/FormFieldMap";
import resetPwBox from "../../assets/img/home/resetPwBox.png";
import { debounce } from "lodash";
import codeBtn from "../../assets/img/home/loginBtn2.png";
import updateBtn from "../../assets/img/home/loginBtn2.png";
import { SFX, playSFX } from "../../utils/audioManager";

const ResetPwFormModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  const emailField = useFormField("", validateEmail);
  const passwordField = useFormField("", validatePassword);
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const [verificationCode, setVerificationCode] = useState("");
  const [isSendEmailVerificationCode, setIsSendEmailVerificationCode] = useState(true);

  const onSendVerificationCode = async () => {
    if (!emailField.isValid) {
      toast.warn("이메일 형식이 올바르지 않습니다.");
      return;
    }

    await sendEmailVerificationCodeWithResetPw(emailField.value);
    setIsSendEmailVerificationCode(true);
  };

  const isValidList = [passwordField.isValid, confirmPasswordField.isValid];

  const onResetPw = async () => {
    if (!isSendEmailVerificationCode) {
      toast.warn("이메일 인증코드를 발송해주세요.");
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
    }

    await resetPassword(emailField.value, passwordField.value, verificationCode);
    showModalHandler(Modal_Category_Map.LOGIN);
  };

  const debouncedOnSendVerificationCode = debounce(onSendVerificationCode, 500);
  const debouncedOnResetPw = debounce(onResetPw, 500);

  const clearAllInput = () => {
    emailField.clear();
    passwordField.clear();
    confirmPasswordField.clear();
    setVerificationCode("");
  };

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.RESET_PASSWORD}
      onClose={() => {
        showModalHandler(Modal_Category_Map.NONE);
        emailField.clear();
        passwordField.clear();
        confirmPasswordField.clear();
        setVerificationCode("");
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
        src={resetPwBox}
        className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:min-w-[580px] min-w-[464px] 3xl:h-[600px] h-[480px]"
      />
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[460px] w-[368px] 3xl:h-[600px] h-[480px]">
        <h2 className="text-center font-bold 3xl:text-[48px] text-[38.4px] 3xl:my-[24px] my-[19.2px]">비밀번호 찾기</h2>

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
          label="새 비밀번호"
          value={passwordField.value}
          handleChange={passwordField.onChange}
          isTypePassword={true}
        />
        <InputForm
          label="새 비밀번호 확인"
          value={confirmPasswordField.value}
          handleChange={confirmPasswordField.onChange}
          isTypePassword={true}
        />

        <div className="flex justify-around 3xl:mt-[20px] mt-[16px]">
          <button
            className={`text-black rounded-lg transition-colors bg-cover duration-500 font-bold mx-2 3xl:text-[24px] text-[19.2px] 3xl:w-[180px] w-[144px] 3xl:h-[62px] h-[49.6px]`}
            style={{
              backgroundImage: `url("${updateBtn}")`,
            }}
            onClick={() => {
              debouncedOnResetPw();
              playSFX(SFX.CLICK);
            }}
          >
            비밀번호 변경
          </button>
        </div>
        <div className="text-center">
          <div
            className=" 3xl:mt-[8px] mt-[6.4px] 3xl:text-[18px] text-[14.4px] text-slate-400 hover:text-slate-800 transition-colors duration-500 "
            onClick={() => {
              showModalHandler(Modal_Category_Map.LOGIN);
              clearAllInput();
            }}
          >
            로그인하러 가기
          </div>
        </div>
      </div>
    </Rodal>
  );
};

export default ResetPwFormModal;

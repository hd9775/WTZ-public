import useFormField from "../../hooks/useFormField";
import { validatePassword } from "../../utils/validateForm";
import { ProfileInputForm } from "./ProfileInputForm";
import { toast } from "react-toastify";
import { useUsersApiCall } from "../../api/axios/useUsersApiCall";
import { motion } from "framer-motion";
import { PROFILE_MAP } from "../../constants/profile/ProfileMap";
import { SFX, playSFX } from "../../utils/audioManager";

interface ProfileUpdateProps {
  onSetViewMain: (num: number) => void;
}

export const ProfileUpdate = ({ onSetViewMain }: ProfileUpdateProps) => {
  const { changePassword } = useUsersApiCall();
  const passwordField = useFormField("", validatePassword);
  const newPasswordField = useFormField("", validatePassword);
  const confirmNewPasswordField = useFormField("", (value) => value === newPasswordField.value);

  const onUpdatePassword = async () => {
    if (!confirmNewPasswordField.isValid) {
      playSFX(SFX.ERROR);
      toast.warn("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    playSFX(SFX.CLICK);
    await changePassword(passwordField.value, newPasswordField.value);
    passwordField.clear();
    newPasswordField.clear();
    confirmNewPasswordField.clear();
  };
  return (
    <motion.div>
      <div className="flex flex-col justify-around items-center h-full 3xl:p-[40px] p-[32px] 3xl:text-[40px] text-[32px] 3xl:mt-[40px] mt-[32px]">
        <ProfileInputForm text="기존 비밀번호" handleChange={passwordField.onChange} value={passwordField.value} />
        <ProfileInputForm text="새 비밀번호" handleChange={newPasswordField.onChange} value={newPasswordField.value} />
        <ProfileInputForm
          text="비밀번호 확인"
          handleChange={confirmNewPasswordField.onChange}
          value={confirmNewPasswordField.value}
        />
        <div className="flex justify-around w-[100%] 3xl:pt-[20px] pt-[16px] px-[10%]">
          <p
            className="text-green-200 border-solid 3xl:border-[10px] border-[8px] border-gray-600 3xl:p-[20px] p-[16px]  hover:text-green-300"
            onClick={onUpdatePassword}
          >
            비밀번호 변경
          </p>
          <p
            className="text-white border-solid 3xl:border-[10px] border-[8px] border-gray-600 3xl:p-[20px] p-[16px]  hover:text-gray-200"
            onClick={() => {
              onSetViewMain(PROFILE_MAP.PROFILE_BASIC);
              playSFX(SFX.CLICK);
            }}
          >
            취소
          </p>
        </div>
      </div>
    </motion.div>
  );
};

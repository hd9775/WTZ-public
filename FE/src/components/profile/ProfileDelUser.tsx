import { ProfileInputForm } from "./ProfileInputForm";
import useFormField from "../../hooks/useFormField";
import { toast } from "react-toastify";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { useNavigate } from "react-router-dom";
import { useUsersApiCall } from "../../api/axios/useUsersApiCall";
import { PROFILE_MAP } from "../../constants/profile/ProfileMap";
import { SFX, playSFX } from "../../utils/audioManager";

interface ProfileDelUserProps {
  onSetViewMain: (num: number) => void;
}

const ProfileDelUser = ({ onSetViewMain }: ProfileDelUserProps) => {
  const { deleteUser } = useUsersApiCall();
  const passwordField = useFormField("");
  const confirmPasswordField = useFormField("", (value) => value === passwordField.value);
  const { setAccessToken } = useAccessTokenState();
  const navigate = useNavigate();

  const onDeleteUser = async () => {
    if (!confirmPasswordField.isValid) {
      playSFX(SFX.ERROR);
      toast.warn("비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    playSFX(SFX.CLICK);

    await deleteUser(passwordField.value);
    setAccessToken("");
    navigate("/");
  };
  return (
    <div className=" 3xl:p-[80px] p-[64px] 3xl:text-[40px] text-[32px] flex flex-col justify-around items-center h-full">
      <ProfileInputForm text="비밀번호" handleChange={passwordField.onChange} value={passwordField.value} />
      <ProfileInputForm
        text="비밀번호 확인"
        handleChange={confirmPasswordField.onChange}
        value={confirmPasswordField.value}
      />
      <div className="flex justify-around w-[100%] 3xl:pt-[20px] pt-[16px] px-[10%]">
        <p
          className="text-red-200 border-solid 3xl:border-[10px] border-[8px] border-gray-600 3xl:p-[20px] p-[16px]  hover:text-red-300"
          onClick={onDeleteUser}
        >
          회원 탈퇴
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
  );
};
export default ProfileDelUser;

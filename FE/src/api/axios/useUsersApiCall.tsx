import { AxiosError } from "axios";
import { useAxiosIntercept } from "./useAxiosIntercept";
import usersUrl from "../url/usersUrl";
import { toast } from "react-toastify";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";

export const useUsersApiCall = () => {
  const interceptAxiosInstance = useAxiosIntercept();

  const changePassword = async (password: string, newPassword: string) => {
    const url = usersUrl.changePw();
    const body = { password, newPassword };
    try {
      await toast.promise(interceptAxiosInstance.patch(url, body), {
        pending: "비밀번호를 변경중입니다.",
        success: "비밀번호가 변경되었습니다.",
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.IN_VALID_PASSWORD:
          toast.error("비밀번호가 일치하지 않습니다.");
          break;
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("이미 탈퇴한 회원입니다.");
          break;
        case ERROR_CODE_MAP.IN_VALID_INPUT:
          toast.error("비밀번호 형식이 올바르지 않습니다.");
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };

  const deleteUser = async (password: string) => {
    const url = usersUrl.delUser();
    const body = { password };
    try {
      await toast.promise(interceptAxiosInstance.delete(url, { data: body }), {
        pending: "회원탈퇴 중입니다.",
        success: "회원탈퇴 되었습니다.",
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.IN_VALID_PASSWORD:
          toast.error("비밀번호가 일치하지 않습니다.");
          break;
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("이미 탈퇴한 회원입니다.");
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };

  const getMyInfo = async () => {
    const url = usersUrl.getMyInfo();
    try {
      const res = await interceptAxiosInstance.get(url);
      const myInfo = res.data;
      return myInfo;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("유저 정보가 존재하지 않습니다.");
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };

  const logout = async () => {
    const url = usersUrl.logout();
    try {
      await toast.promise(interceptAxiosInstance.post(url), {
        pending: "로그아웃 중입니다.",
        success: "로그아웃 되었습니다.",
      });
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.NOT_FOUND:
          toast.error("유저 정보가 존재하지 않습니다.");
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };
  return {
    changePassword,
    deleteUser,
    getMyInfo,
    logout,
  };
};

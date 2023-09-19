import axios, { AxiosError } from "axios";
import usersUrl from "../url/usersUrl";
import { toast } from "react-toastify";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";

export const reissueAccessToken = async () => {
  const url = usersUrl.reissueAccessToken();
  const res = await axios.post(url, {}, { withCredentials: true });
  const { accessToken, userSeq, nickname } = res.data;
  return { newAccessToken: accessToken, userSeq, nickname };
};

export const sendEmailVerificationCodeWithSignup = async (email: string) => {
  const url = usersUrl.sendEmailVerificationCodeWhenSignup();
  const body = { email };
  try {
    await toast.promise(axios.post(url, body), {
      pending: "인증코드를 발송중입니다.",
      success: "인증코드가 발송되었습니다.",
    });
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.DUPLICATED:
        toast.error("이미 가입된 이메일입니다.");
        break;
      case ERROR_CODE_MAP.IN_VALID_INPUT:
        toast.error("이메일 형식이 올바르지 않습니다.");
        break;
      case ERROR_CODE_MAP.EXCEEDED_SEND_COUNT:
        toast.error("인증코드 발송 횟수를 초과하였습니다.");
        break;
      case ERROR_CODE_MAP.SERVER_ERROR:
        toast.error("서버 문제로 이메일 전송에 실패했습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
        break;
    }
    throw error;
  }
};

export const signup = async (email: string, password: string, nickname: string, emailVerificationCode: string) => {
  const url = usersUrl.signUp();
  const body = { email, password, nickname, emailVerificationCode };
  try {
    await toast.promise(axios.post(url, body), {
      pending: "회원가입 중입니다.",
      success: "회원가입 되었습니다.",
    });
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_VERIFICATION_CODE:
        toast.error("인증코드가 만료되었거나 일치하지 않습니다.");
        break;
      case ERROR_CODE_MAP.DUPLICATED:
        toast.error("이미 가입된 이메일입니다.");
        break;
      case ERROR_CODE_MAP.IN_VALID_INPUT:
        toast.error("입력 형식이 올바르지 않습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
        break;
    }
    throw error;
  }
};

export const login = async (email: string, password: string) => {
  const url = usersUrl.login();
  const body = { email, password };
  try {
    const res = await toast.promise(axios.post(url, body), {
      pending: "로그인 중입니다.",
      success: "로그인 되었습니다.",
    });
    const { accessToken, userSeq, nickname } = res.data;
    return { accessToken, userSeq, nickname };
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_PASSWORD:
        toast.error("비밀번호가 일치하지 않습니다.");
        break;
      case ERROR_CODE_MAP.DUPLICATED_LOGIN:
        toast.error("이미 로그인된 계정입니다.");
        break;
      case ERROR_CODE_MAP.NOT_FOUND:
        toast.error("가입되지 않은 이메일입니다.");
        break;
      case ERROR_CODE_MAP.SERVER_INSPECTING:
        toast.error("서버 점검중입니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
        break;
    }
    throw error;
  }
};

export const sendEmailVerificationCodeWithResetPw = async (email: string) => {
  const url = usersUrl.sendEmailVerificationCodeWhenResetPw();
  const body = { email };
  try {
    await toast.promise(axios.post(url, body), {
      pending: "인증코드를 발송중입니다.",
      success: "인증코드가 발송되었습니다.",
    });
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.EXCEEDED_SEND_COUNT:
        toast.error("인증코드 발송 횟수를 초과하였습니다.");
        break;
      case ERROR_CODE_MAP.SERVER_ERROR:
        toast.error("서버 문제로 이메일 전송에 실패했습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
        break;
    }
    throw error;
  }
};

export const resetPassword = async (email: string, password: string, emailVerificationCode: string) => {
  const url = usersUrl.resetPw();
  const body = { email, password, emailVerificationCode };
  try {
    await toast.promise(axios.post(url, body), {
      pending: "비밀번호를 변경중입니다.",
      success: "비밀번호가 변경되었습니다.",
    });
  } catch (error: unknown) {
    const { status } = (error as AxiosError).response!;
    switch (status) {
      case ERROR_CODE_MAP.IN_VALID_VERIFICATION_CODE:
        toast.error("인증코드가 만료되었거나 일치하지 않습니다.");
        break;
      case ERROR_CODE_MAP.NOT_FOUND:
        toast.error("이미 탈퇴한 회원입니다.");
        break;
      case ERROR_CODE_MAP.IN_VALID_INPUT:
        toast.error("입력 형식이 올바르지 않습니다.");
        break;
      default:
        toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
        break;
    }
    throw error;
  }
};

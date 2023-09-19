import axios from "axios";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../url/baseUrl";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { reissueAccessToken } from "./usersApiCall";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";

export const useAxiosIntercept = () => {
  const { accessToken, setAccessToken, setUserSeq, setNickname } = useAccessTokenState();
  const navigate = useNavigate();
  // Axios 인스턴스를 생성합니다.
  const interceptAxiosInstance = axios.create({
    baseURL: baseUrl,
  });

  // 요청 인터셉터를 설정합니다.
  interceptAxiosInstance.interceptors.request.use(
    (config) => {
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터를 설정합니다.
  interceptAxiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: unknown) => {
      const axiosError = error as AxiosError;
      const { config } = axiosError;
      const { data } = axiosError.response!;
      const { message } = data as { message: string };

      // 액세스 토큰이 만료된 경우 새로운 액세스 토큰을 요청합니다.
      if (message === "Token Has Expired") {
        try {
          const originalRequest = config!;
          const { newAccessToken, userSeq, nickname } = await reissueAccessToken();
          setAccessToken(newAccessToken);
          setUserSeq(userSeq);
          setNickname(nickname);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return interceptAxiosInstance(originalRequest);
        } catch (error: unknown) {
          const { status } = (error as AxiosError).response!;
          switch (status) {
            case ERROR_CODE_MAP.NO_COOKIE:
              return;
            case ERROR_CODE_MAP.IN_VALID_REFRESH_TOKEN:
              toast.error("다시 로그인 해주세요.");
              navigate("/");
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
      }

      // 그 외의 경우 originalRequest의 catch로 에러를 전달합니다.
      throw error;
    }
  );

  return interceptAxiosInstance;
};

import recordUrl from "../url/recordUrl";
import { useAxiosIntercept } from "./useAxiosIntercept";
import { toast } from "react-toastify";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { AxiosError } from "axios";

export const useRecordApiCall = () => {
  const interceptAxiosInstance = useAxiosIntercept();
  const getRecentlyGameDataList = async () => {
    const url = recordUrl.recent();
    try {
      const res = await interceptAxiosInstance.get(url);
      const recentlyGameDataList = res.data;
      return recentlyGameDataList;
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

  const getTotalWinRate = async () => {
    const url = recordUrl.totalWinRate();
    try {
      const res = await interceptAxiosInstance.get(url);
      const winRate = res.data;
      return winRate;
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

  const getJobWinRate = async () => {
    const url = recordUrl.jobWinRate();
    try {
      const res = await interceptAxiosInstance.get(url);
      const winRate = res.data;
      return winRate;
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
    getRecentlyGameDataList,
    getTotalWinRate,
    getJobWinRate,
  };
};

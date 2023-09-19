import { AxiosError } from "axios";
import shopUrl from "../url/shopUrl";
import { useAxiosIntercept } from "./useAxiosIntercept";
import { toast } from "react-toastify";
import { ERROR_CODE_MAP } from "../../constants/error/ErrorCodeMap";
import { ShopAllItemType, ShopItemType } from "../../types/ShopType";

export const useShopApiCall = () => {
  const interceptAxiosInstance = useAxiosIntercept();

  const getShopAllItem = async () => {
    const capUrl = shopUrl.getCapList();
    const faceUrl = shopUrl.getFaceList();
    const clothingUrl = shopUrl.getClothingList();
    try {
      const capList = (await interceptAxiosInstance.get(capUrl)).data;
      const faceList = (await interceptAxiosInstance.get(faceUrl)).data;
      const clothingList = (await interceptAxiosInstance.get(clothingUrl)).data;
      return { capList, faceList, clothingList };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
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

  const buyItems = async (itemSeqList: number[]) => {
    const url = shopUrl.buyItems();
    const body = {
      items: itemSeqList,
    };
    try {
      await interceptAxiosInstance.post(url, body);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.CAN_NOT_PURCHASE:
          const { data } = axiosError.response!;
          const { message } = data as { message: string };
          if (message === "Insufficient Point") {
            toast.error("코인이 부족합니다.");
          }
          if (message === "Already Purchased") {
            toast.error("이미 구매한 아이템입니다.");
          }
          break;
        default:
          toast.error("알 수 없는 에러가 발생했습니다, 관리자에게 문의해주세요.");
          break;
      }
      throw error;
    }
  };

  const getCoin = async () => {
    const url = shopUrl.getCoin();
    try {
      const { data } = await interceptAxiosInstance.get(url);
      return data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
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

  const getEquippedItems = async () => {
    const url = shopUrl.getEquipped();
    try {
      const { data } = await interceptAxiosInstance.get(url);
      const equippedCap = data.find((item: ShopItemType) => item.itemSeq >= 101 && item.itemSeq <= 199);
      const equippedFace = data.find((item: ShopItemType) => item.itemSeq >= 201 && item.itemSeq <= 299);
      const equippedClothing = data.find((item: ShopItemType) => item.itemSeq >= 301 && item.itemSeq <= 399);
      return {
        equippedCap,
        equippedFace,
        equippedClothing,
      };
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
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

  const equipItems = async (equippedItemList: ShopItemType[], shopAllItem: ShopAllItemType) => {
    const url = shopUrl.equip();
    const isDefaultEquipped = (itemSeq: number) => itemSeq % 100 === 0;
    const allItemsArray = [...shopAllItem.capList, ...shopAllItem.faceList, ...shopAllItem.clothingList];
    const equippedSeq = equippedItemList.map((item) => item.itemSeq);
    const selectedItemsWithBuy = allItemsArray.filter((item) => equippedSeq.includes(item.itemSeq));
    const possibleEquip = selectedItemsWithBuy.filter((item) => item.sold || isDefaultEquipped(item.itemSeq));
    if (possibleEquip.length === 0) return;
    const body = { items: possibleEquip };
    try {
      await interceptAxiosInstance.patch(url, body);
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      const { status } = axiosError.response!;

      switch (status) {
        case ERROR_CODE_MAP.NOT_POSSESS_ITEM:
          toast.error("보유하지 않은 아이템은 장착 할 수 없습니다.");
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

  return {
    getShopAllItem,
    buyItems,
    getCoin,
    getEquippedItems,
    equipItems,
  };
};

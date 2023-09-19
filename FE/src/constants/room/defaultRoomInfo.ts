import { SeatInfo, CurSeats } from "../../types/RoomSettingType";

export const defaultJobSetting = {
  "3": true,
  "4": true,
  "5": true,
  "6": true,
  "7": true,
};

export const defaultSeatInfo: SeatInfo = {
  order: 0,
  userSeq: 0,
  nickname: "",
  state: 0,
  equippedItems: {
    cap: "",
    face: "",
    clothing: "",
  },
  ready: false,
};

export const defaultCurSeats: CurSeats = [
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
  defaultSeatInfo,
];

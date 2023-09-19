import { CurSeats } from "./RoomSettingType";

type userSeq = number;
type gameCode = string;

export type ChatInfo = {
  nickname: string;
  message: string;
};

export interface SubChat {
  type: "ROOM_CHAT";
  roomCode: string;
  data: {
    nickname: string;
    message: string;
    senderSeq: number;
  };
}

export interface SubExitMessage {
  type: "ROOM_EXIT";
  roomCode: string;
  data: string;
}
export interface SubTitle {
  type: "ROOM_TITLE";
  roomCode: string;
  data: string;
}

export interface SubJobSetting {
  type: "ROOM_JOB_SETTING";
  roomCode: string;
  data: {
    jobSetting: {
      "3": boolean;
      "4": boolean;
      "5": boolean;
      "6": boolean;
      "7": boolean;
    };
  };
}

export interface SubStart {
  type: "ROOM_START";
  roomCode: string;
  data: gameCode;
}

export interface SubChangeOwner {
  type: "ROOM_CHANGE_OWNER";
  roomCode: string;
  data: userSeq;
}

export interface SubCurSeats {
  type: "ROOM_CUR_SEATS";
  data: CurSeats;
}

export interface SubInitialRoomSetting {
  type: "ROOM_ENTER_SETTING";
  data: {
    roomCode: string;
    title: string;
    jobSetting: {
      "1": boolean;
      "2": boolean;
      "3": boolean;
      "4": boolean;
      "5": boolean;
      "6": boolean;
      "7": boolean;
    };
    message: string;
    ownerSeq: userSeq;
    curSeats: CurSeats;
  };
}

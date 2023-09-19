import { JobSetting } from "./RoomSettingType";

type userSeq = number;

export interface PubChat {
  senderSeq: userSeq;
  message: string;
}

export interface PubTitle {
  title: string;
}

export interface PubJobSetting {
  data: JobSetting;
}

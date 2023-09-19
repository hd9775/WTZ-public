export type JOB_ID = "3" | "4" | "5" | "6" | "7";

export type JobSetting = {
  [key in JOB_ID]: boolean;
};

export type SeatInfo = {
  order: number;
  userSeq: number;
  nickname: string;
  state: -1 | 0 | 1;
  equippedItems: {
    cap: string;
    face: string;
    clothing: string;
  };
  ready: boolean;
};

export type CurSeats = SeatInfo[];

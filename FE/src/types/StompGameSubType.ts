type userSeq = number;
type jobSeq = number;
type nickname = string;

export interface SubStart {
  type: "START";
  data: {
    userSeq: userSeq;
    jobSeq: jobSeq;
    nickname: nickname;
    equippedItems: {
      cap: string;
      clothing: string;
      face: string;
    };
    equippedItemsGif: {
      cap: string;
      clothing: string;
      face: string;
    };
  }[];
}
export interface SubChat {
  type: "CHAT";
  gameCode: number;
  data: {
    sender: userSeq;
    nickname: string;
    message: string;
  };
}

export interface SubStartTimer {
  type: "TIMER";
  data: {
    type: string;
    time: number;
  };
}

export interface SubTimerDecrease {
  type: "GAME_TIMER_DECREASE";
  code: string;
  data: number;
}

export interface SubCharLoc {
  type: "GAME_CHAR_LOC";
  data: {
    orderNumber: number;
    xaxis1: number;
    yaxis1: number;
    xaxis2: number;
    yaxis2: number;
  };
}

export interface SubVote {
  type: "VOTE";
  data: {
    userSeq: number;
    cnt: number;
  }[];
}

export interface SubVoteResult {
  type: "VOTE_RESULT";
  data: {
    userSeq: number;
    politicianSeq: number;
  };
}

export interface SubNightResult {
  type: "NIGHT_RESULT";
  data: {
    deadUserSeq: userSeq | null;
    threatUserSeq: userSeq | null;
    healUserSeq: userSeq | null;
    ability: { userSeq: number; targetUserSeq: number | null; result: boolean }[];
  };
}

export interface SubGameResult {
  type: "GAME_OVER";
  code: string;
  data: {
    rabbitWin: boolean;
    userInfo: {
      userSeq: userSeq;
      jobSeq: jobSeq;
      win: boolean;
      nickname: string;
    }[];
  };
}

export interface SubZaraChat {
  type: "ZARA_CHAT";
  gameCode: number;
  data: {
    sender: userSeq;
    nickname: string;
    message: string;
  };
}

export interface SubGhostChat {
  type: "GHOST_CHAT";
  gameCode: number;
  data: {
    sender: userSeq;
    nickname: string;
    message: string;
  };
}

export interface SubGhostAbility {
  type: "ABILITY_GHOST";
  gameCode: number;
  data: {
    userSeq: number;
    targetUserSeq: number;
  };
}

export interface SubZaraTarget {
  type: "ABILITY";
  gameCode: number;
  data: number;
}

export interface SubBlackout {
  type: "GAME_BLACKOUT";
  gameCode: number;
  data: { userSeq: number; startSecond: number };
}

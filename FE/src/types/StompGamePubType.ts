type userSeq = number;

export interface PubChat {
  sender: userSeq;
  message: string;
}

export interface PubVote {
  userSeq: userSeq;
  targetUserSeq: userSeq;
}

export interface PubAbility {
  userSeq: userSeq;
  targetUserSeq: userSeq;
}

export interface PubEndTimer {
  userSeq: userSeq;
}

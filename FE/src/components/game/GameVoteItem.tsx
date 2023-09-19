import simpleBlack from "../../assets/img/common/simpleBlack.png";
import { SFX, playSFX } from "../../utils/audioManager";

interface GameVoteItemProps {
  voteNum: number;
  userOrder: number;
  onSetSelectVote: (userOrder: number) => void;
  isDie: number;
  amIDead: boolean;
}

export const GameVoteUser = ({ voteNum, userOrder, onSetSelectVote, isDie, amIDead }: GameVoteItemProps) => {
  return (
    <>
      <div
        className={`3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px] 3xl:pr-[30px] pr-[24px] 3xl:pb-[20px] pb-[16px] ${
          isDie === 0 && !amIDead && "hover:brightness-75"
        }`}
      >
        {isDie === 0 && (
          <div
            className="w-full h-full flex justify-end items-end"
            onClick={() => {
              if (!amIDead) {
                onSetSelectVote(userOrder);
                playSFX(SFX.CLICK);
              }
            }}
          >
            <p className="text-red-600 3xl:text-[60px] text-[48px] font-bold drop-shadow-stroke-white">{voteNum}</p>
          </div>
        )}
      </div>
    </>
  );
};

interface GameVoteSkipProps {
  voteNum: number;
  onSetSelectVote: (userOrder: number) => void;
  amIDead: boolean;
}

export const GameVoteSkip = ({ voteNum, onSetSelectVote, amIDead }: GameVoteSkipProps) => {
  return (
    <div
      className={`3xl:w-[325px] w-[260px] 3xl:h-[175px] h-[140px] bg-transparent flex items-center bg-cover ${
        !amIDead && "hover: brightness-75"
      } justify-between 3xl:p-[30px] p-[24px]`}
      style={{ backgroundImage: `url("${simpleBlack}")` }}
      onClick={() => {
        if (!amIDead) {
          onSetSelectVote(8);
          playSFX(SFX.CLICK);
        }
      }}
    >
      <div className="3xl:text-[35px] text-[28px] text-center text-white">
        <p className="3xl:w-[200px] w-[160px]">이번턴</p>
        <p className="3xl:w-[200px] w-[160px]">투표 안하기</p>
      </div>
      <p className="text-red-600 3xl:w-[100px] w-[80px] 3xl:text-[60px] text-[48px] font-bold drop-shadow-stroke-white text-center 3xl:ml-[15px] ml-[12px]">
        {voteNum}
      </p>
    </div>
  );
};

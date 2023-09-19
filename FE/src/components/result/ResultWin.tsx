import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { JOB_MAP } from "../../constants/common/JobMap";

interface ResultLoseProps {
  order: number;
  nickname: string;
  jobSeq: number;
}

export const ResultWin = ({ order, nickname, jobSeq }: ResultLoseProps) => {
  return (
    <>
      <div className="flex flex-col justify-center 3xl:w-[220px] w-[176px] 3xl:h-[250px] h-[200px]">
        <div className="3xl:w-[220px] w-[176px] flex flex-col items-center 3xl:text-[22.5px] text-[18px]">
          <p className="w-auto">{nickname}</p>
          <p className="w-auto">{JOB_MAP[jobSeq].name}</p>
        </div>
        <div className="flex justify-center items-center 3xl:w-[260px] w-[208px] 3xl:h-[220px] h-[176px]">
          <img
            className="3xl:min-w-[260px] min-w-[208px] 3xl:min-h-[260x] min-h-[208px] 3xl:mr-[40px] mr-[32px]"
            src={RABBIT_MAP[order].IMG[RABBIT_STATE_MAP.STAND]}
          />
        </div>
      </div>
    </>
  );
};

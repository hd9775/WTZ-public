import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { JOB_MAP } from "../../constants/common/JobMap";

interface ResultLoseProps {
  order: number;
  nickname: string;
  jobSeq: number;
}

export const ResultLose = ({ order, nickname, jobSeq }: ResultLoseProps) => {
  return (
    <>
      <div className="flex flex-col justify-center 3xl:w-[160px] w-[128px] 3xl:h-[200px] h-[160px]">
        <div className="flex justify-center items-center 3xl:w-[160px] w-[128px] 3xl:h-[120px] h-[96px]">
          <img
            className="3xl:w-[160px] w-[128px] 3xl:h-[160px] h-[128px]"
            src={RABBIT_MAP[order].IMG[RABBIT_STATE_MAP.STAND]}
          />
        </div>
        <div className="3xl:w-[160px] w-[128px] flex flex-col items-center 3xl:text-[18px] text-[14.4px]">
          <p className="w-auto">{nickname}</p>
          <p className="w-auto">{JOB_MAP[jobSeq].name}</p>
        </div>
      </div>
    </>
  );
};

import { useEffect, useState } from "react";
import Rodal from "rodal";
import { JOB_MAP } from "../../constants/common/JobMap";
import { SFX, playSFX } from "../../utils/audioManager";

interface GameMyJobProps {
  myJobSeq: number;
}
export const GameMyJob = ({ myJobSeq }: GameMyJobProps) => {
  const [viewMyJob, setViewMyJob] = useState(true);

  useEffect(() => {
    playSFX(SFX.RODAL);
  }, []);

  return (
    <Rodal
      visible={viewMyJob}
      onClose={() => setViewMyJob(false)}
      enterAnimation="slideUp"
      leaveAnimation="slideDown"
      duration={500}
      width={1}
      height={1}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[480px] w-[384px] 3xl:h-[480px] h-[384px] bg-gray-900 border-solid 3xl:border-[10px] border-[8px] border-white flex flex-col justify-center items-center">
        <img
          src={JOB_MAP[myJobSeq].imgColor}
          className="3xl:w-[128px] w-[102.4px] 3xl:h-[128px] h-[102.4px] 3xl:m-[16px] m-[12.8px]"
        />
        <p className="text-white 3xl:text-[32px] text-[25.6px] 3xl:px-[20px] px-[16px]">당신은</p>
        <p className={`3xl:text-[40px] text-[32px] 3xl:px-[20px] px-[16px] font-bold ${JOB_MAP[myJobSeq].color}`}>
          {JOB_MAP[myJobSeq].name}
        </p>
        <p className="text-white 3xl:text-[32px] text-[25.6px] 3xl:px-[20px] px-[16px]">입니다.</p>
      </div>
    </Rodal>
  );
};

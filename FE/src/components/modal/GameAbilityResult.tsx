import { useState } from "react";
import Rodal from "rodal";
import { ABILITY_MAP } from "../../constants/game/AbilityMap";

interface GameAbilityResultProps {
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  myOrderNo: number;
  selectUser: number;
}

const GameAbilityResult = ({ userInfo, myOrderNo, selectUser }: GameAbilityResultProps) => {
  const [viewMyJob, setViewMyJob] = useState(true);
  const myJobNo = userInfo[myOrderNo].jobSeq;

  return (
    <>
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
        <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[480px] w-[384px] 3xl:h-[480px] h-[384px] bg-gray-900 border-solid 3xl:border-[10px] border-[8px] border-white flex flex-col justify-center items-center 3xl:text-[30px] text-white text-[24px]">
          <img className="3xl:w-[300px] w-[240px]" src={ABILITY_MAP[myJobNo].img} />
          <p className="3xl:w-[360px] w-[288px] text-center 3xl:mt-[20px] mt-[16px]">
            {ABILITY_MAP[myJobNo].contentPrefix}
            {selectUser >= 0 && userInfo[selectUser].nickname}
            {ABILITY_MAP[myJobNo].contentSuffix}
          </p>
        </div>
      </Rodal>
    </>
  );
};

export default GameAbilityResult;

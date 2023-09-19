import { useState } from "react";
import Rodal from "rodal";
import { ABILITY_MAP } from "../../constants/game/AbilityMap";

interface GameAbilityPoliticianProps {
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  politicianAbility: number;
}

const GameAbilityPolitician = ({ userInfo, politicianAbility }: GameAbilityPoliticianProps) => {
  const [viewMyJob, setViewMyJob] = useState(true);

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
          <img className="3xl:w-[300px] w-[240px]" src={ABILITY_MAP[5].img} />
          <p className="3xl:w-[360px] w-[288px] text-center 3xl:mt-[20px] mt-[16px]">
            {userInfo[politicianAbility].nickname}은/는 탐관토끼로 부와 권력을 이용하여 투표로 죽지 않았습니다.
          </p>
        </div>
      </Rodal>
    </>
  );
};

export default GameAbilityPolitician;

import { useState, useEffect } from "react";
import Rodal from "rodal";
import { SFX, playSFX } from "../../utils/audioManager";
import { TARGET_MAP } from "../../constants/game/TargetMap";

interface GameAbilityTargetProps {
  myOrderNo: number;
  deadOrderNo: number | null;
  threatOrderNo: number | null;
  healOrderNo: number | null;
}

const GameAbilityTarget = ({ myOrderNo, deadOrderNo, threatOrderNo, healOrderNo }: GameAbilityTargetProps) => {
  const [viewDead, setViewDead] = useState(false);
  const [viewThreat, setViewThreat] = useState(false);
  const [viewHeal, setViewHeal] = useState(false);

  useEffect(() => {
    playSFX(SFX.RODAL);
  }, []);

  useEffect(() => {
    setViewDead(deadOrderNo === myOrderNo);
    setViewThreat(threatOrderNo === myOrderNo);
    setViewHeal(healOrderNo === myOrderNo);
  }, [deadOrderNo, threatOrderNo, healOrderNo]);

  return (
    <>
      <Rodal
        visible={viewDead}
        onClose={() => setViewDead(false)}
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
          <img className="3xl:w-[300px] w-[240px]" src={TARGET_MAP[0].img} />
          <p className="3xl:w-[360px] w-[288px] text-center 3xl:mt-[20px] mt-[16px]">{TARGET_MAP[0].content}</p>
        </div>
      </Rodal>
      <Rodal
        visible={viewHeal && !viewDead}
        onClose={() => setViewHeal(false)}
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
          <img className="3xl:w-[300px] w-[240px]" src={TARGET_MAP[1].img} />
          <p className="3xl:w-[360px] w-[288px] text-center 3xl:mt-[20px] mt-[16px]">{TARGET_MAP[1].content}</p>
        </div>
      </Rodal>
      <Rodal
        visible={viewThreat && !viewDead}
        onClose={() => setViewThreat(false)}
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
          <img className="3xl:w-[300px] w-[240px]" src={TARGET_MAP[2].img} />
          <p className="3xl:w-[360px] w-[288px] text-center 3xl:mt-[20px] mt-[16px]">{TARGET_MAP[2].content}</p>
        </div>
      </Rodal>
    </>
  );
};

export default GameAbilityTarget;

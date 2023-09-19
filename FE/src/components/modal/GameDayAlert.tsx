import { useEffect, useState } from "react";
import Rodal from "rodal";
import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";
import { NIGHT_RESULT_MAP } from "../../constants/game/NightResultMap";
import daySafe from "../../assets/img/game/daySafe.png";
import dayDeath from "../../assets/img/game/dayDeath.png";
import { SFX, playSFX } from "../../utils/audioManager";

interface GameAlertProps {
  alertType: number;
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  deathByZaraOrderNo: number | null;
}
export const GameDayAlert = ({ alertType, userInfo, deathByZaraOrderNo }: GameAlertProps) => {
  const [viewMyJob, setViewMyJob] = useState(true);

  useEffect(() => {
    playSFX(SFX.RODAL);
  }, []);

  return (
    <Rodal
      visible={viewMyJob}
      onClose={() => setViewMyJob(false)}
      enterAnimation="slideLeft"
      leaveAnimation="slideRight"
      duration={500}
      width={1}
      height={1}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
      className="bg-transparent"
    >
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[480px] w-[384px] 3xl:h-[480px] h-[384px] bg-gray-900 border-solid 3xl:border-[10px] border-[8px] border-white flex flex-col justify-center items-center 3xl:text-[32px] text-white text-[25.6px]">
        {alertType === NIGHT_RESULT_MAP.DEATH && deathByZaraOrderNo !== null && (
          <>
            <img className="3xl:w-[260px] w-[208px]" src={dayDeath} />
            <p className="3xl:text-[24px] text-[19.2px] text-red-400">
              밤 중에
              <span className={`3xl:mx-[10px] mx-[8px] font-bold ${TEXT_COLOR_MAP[deathByZaraOrderNo]}`}>
                {userInfo[deathByZaraOrderNo].nickname}
              </span>
              님이 공격 당했습니다...
            </p>
          </>
        )}
        {alertType === NIGHT_RESULT_MAP.SAFE && (
          <>
            <img className="3xl:w-[260px] w-[208px]" src={daySafe} />
            <p className="3xl:text-[24px] text-[19.2px] text-yellow-200">평화로운 아침이 밝았습니다.</p>
          </>
        )}
      </div>
    </Rodal>
  );
};

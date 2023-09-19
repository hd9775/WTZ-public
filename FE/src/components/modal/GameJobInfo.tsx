import Rodal from "rodal";
import { JOB_MAP } from "../../constants/common/JobMap";
import { useEffect } from "react";
import { SFX, playSFX } from "../../utils/audioManager";

interface GameJobInfoProps {
  infoOn: boolean;
  onSetInfoOn: () => void;
}

export const GameJobInfo = ({ infoOn, onSetInfoOn }: GameJobInfoProps) => {
  useEffect(() => {
    playSFX(SFX.RODAL);
  }, []);

  return (
    <Rodal
      visible={infoOn}
      onClose={() => onSetInfoOn()}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={1}
      height={1}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{ backgroundColor: "transparent" }}
    >
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[1100px] w-[880px] 3xl:h-[480px] h-[384px] bg-black border-solid 3xl:border-[10px] border-[8px] border-white flex flex-wrap 3xl:p-[10px] p-[8px]">
        {JOB_MAP.map(
          (item, index) =>
            index > 0 && (
              <div className="flex w-[50%] items-center" key={index}>
                <img
                  src={item.imgColor}
                  className="3xl:w-[72px] w-[57.6px] 3xl:h-[72px] h-[57.6px] 3xl:mx-[20px] mx-[16px]"
                />
                <div className="flex items-center justify-start">
                  <p
                    className={`${item.color} 3xl:text-[20px] text-[16px] 3xl:min-w-[80px] min-w-[64px] text-center font-bold`}
                  >
                    {item.name}
                  </p>
                  <p className="text-white 3xl:text-[20px] text-[16px] 3xl:px-[20px] px-[16px]">{item.info2}</p>
                </div>
              </div>
            )
        )}
      </div>
    </Rodal>
  );
};

import { JOB_MAP } from "../../constants/common/JobMap";
import { SFX, playSFX } from "../../utils/audioManager";
import { useState, useEffect } from "react";

interface GameNightTargetProps {
  myJob: number;
  orderNo: number;
  selectUser: number;
  setSelectUser: (num: number) => void;
  isDie: number;
  amIDead: boolean;
  ghostView: { userOrderNo: number | null; targetOrderNo: number | null };
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
}

export const GameNightTarget = ({
  myJob,
  orderNo,
  selectUser,
  setSelectUser,
  isDie,
  amIDead,
  ghostView,
  userInfo,
}: GameNightTargetProps) => {
  const [targetList, setTargetList] = useState<(number | null)[]>([null, null, null, null]);
  const mappingTargetList = (num: number) => {
    const newTargetList = targetList.map((target, index) => {
      if (num === index) {
        return ghostView.targetOrderNo;
      }
      return target;
    });
    setTargetList(newTargetList);
  };

  useEffect(() => {
    if (ghostView.userOrderNo !== null) {
      const job = userInfo[ghostView.userOrderNo].jobSeq;
      if (job === 2) {
        mappingTargetList(0);
      } else if (job === 3) {
        mappingTargetList(1);
      } else if (job === 4) {
        mappingTargetList(2);
      } else if (job === 7) {
        mappingTargetList(3);
      }
    }
  }, [ghostView]);

  return (
    <>
      <div className={`relative 3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px]`}>
        {isDie === 0 && !amIDead && (
          <div
            className={`w-full h-full flex justify-center items-center hover:brightness-[0.6] ${
              orderNo === selectUser ? "brightness-100" : "brightness-[0.3]"
            }
            }`}
            onClick={() => {
              setSelectUser(orderNo);
              playSFX(SFX.CLICK);
            }}
          >
            <img className="w-[40%] 3xl:mb-[30px] mb-[24px]" src={JOB_MAP[myJob].imgColor} />
          </div>
        )}
        {amIDead && (
          <div className="absolute bottom-[5%] right-[4%] 3xl:w-[125px] w-[100px] 3xl:h-[125px] h-[100px] flex flex-wrap-reverse justify-end items-start">
            {orderNo === targetList[0] && <img className="w-[40%]" src={JOB_MAP[2].imgColor} />}
            {orderNo === targetList[1] && <img className="w-[40%]" src={JOB_MAP[3].imgColor} />}
            {orderNo === targetList[2] && <img className="w-[40%]" src={JOB_MAP[4].imgColor} />}
            {orderNo === targetList[3] && <img className="w-[40%]" src={JOB_MAP[7].imgColor} />}
          </div>
        )}
      </div>
    </>
  );
};

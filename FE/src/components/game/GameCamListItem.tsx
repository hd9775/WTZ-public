import { BORDER_COLOR_MAP } from "../../constants/common/ColorMap";
import { JOB_MAP } from "../../constants/common/JobMap";
import GameCamListItemComponent from "./GameCamListItemComponent";
// import { useAccessTokenState } from "../../context/accessTokenContext";

interface GameCamListItemProps {
  orderNo: number;
  streamManager: any;
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  myOrderNo: number;
  isDie: number;
  amIDead: boolean;
}

export const GameCamListItem = ({
  orderNo,
  streamManager,
  userInfo,
  myOrderNo,
  isDie,
  amIDead,
}: GameCamListItemProps) => {
  return (
    <div
      className={`relative 3xl:w-[375px] w-[300px] 3xl:h-[250px] h-[200px] bg-black border-solid 3xl:border-[15px] border-[12px] ${BORDER_COLOR_MAP[orderNo]}`}
    >
      <GameCamListItemComponent streamManager={streamManager} isMe={myOrderNo === orderNo} />

      <>
        {(amIDead || myOrderNo === orderNo || (userInfo[myOrderNo].jobSeq === 2 && userInfo[orderNo].jobSeq === 2)) && (
          <>
            <p
              className={`absolute bottom-[5px] left-[10px] ${
                JOB_MAP[userInfo[orderNo].jobSeq].color
              } drop-shadow-stroke-black-sm font-bold text-[30px]`}
            >
              {JOB_MAP[userInfo[orderNo].jobSeq].name}
            </p>
          </>
        )}
      </>
      {isDie === 1 && (
        <p className="absolute top-[0px] left-0 w-full h-full text-center text-red-500 font-bold 3xl:text-[140px] text-[112px] bg-transparent">
          X
        </p>
      )}
      <p
        className={`absolute top-[0px] 3xl:left-[10px] left-[8px] font-bold 3xl:text-[30px] text-[24px] text-white drop-shadow-stroke-black-sm`}
      >
        {userInfo[orderNo].nickname} {orderNo === myOrderNo && "(나)"}
      </p>
    </div>
  );
};

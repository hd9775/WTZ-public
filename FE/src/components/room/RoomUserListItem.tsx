import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { useAccessTokenState } from "../../context/accessTokenContext";
interface RoomUserListItemProps {
  nickname: string;
  order: number;
  userSeq: number;
  ownerSeq: number;
  cap: string;
  face: string;
  clothing: string;
  ready: boolean;
}

export const RoomUserListItem = ({
  userSeq,
  nickname,
  order,
  ownerSeq,
  cap,
  face,
  clothing,
  ready,
}: RoomUserListItemProps) => {
  const context = useAccessTokenState();
  const myUserSeq = context.userSeq;
  return (
    <>
      <div className="3xl:text-[30px] text-[24px] w-full 3xl:h-[50px] h-[40px] flex justify-center items-center flex-wrap">
        <p className="text-center text-white 3xl:mt-[15px] mt-[12px]">
          {nickname}
          {myUserSeq === userSeq && " (나)"}
        </p>
      </div>
      <div className="relative h-full">
        <img
          className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
          src={RABBIT_MAP[order].IMG[RABBIT_STATE_MAP.STAND]}
        />
        {clothing && (
          <img
            src={`data:image/png;base64,${clothing}`}
            className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
          />
        )}
        {face && (
          <img
            src={`data:image/png;base64,${face}`}
            className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
          />
        )}
        {cap && (
          <img
            src={`data:image/png;base64,${cap}`}
            className="absolute 3xl:top-[-10px] top-[-8px] 3xl:left-[5px] left-[4px] 3xl:w-[250px] w-[200px] 3xl:h-[250px] h-[200px]"
          />
        )}
      </div>

      {ownerSeq === userSeq ? (
        <p className=" absolute 3xl:bottom-[10px] bottom-[8px] w-full text-green-500 text-center 3xl:text-[40px] text-[32px]">
          방장
        </p>
      ) : (
        ready && (
          <p className=" absolute 3xl:bottom-[10px] bottom-[8px] w-full text-yellow-500 text-center 3xl:text-[40px] text-[32px]">
            준비 완료
          </p>
        )
      )}
    </>
  );
};

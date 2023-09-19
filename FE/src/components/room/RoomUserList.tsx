import { BORDER_COLOR_MAP, CLOSE_COLOR_MAP } from "../../constants/common/ColorMap";
import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";
import { RoomUserListItem } from "./RoomUserListItem";
import { ROOM_SEAT_STATE_MAP } from "../../constants/room/roomSeatStateMap";
import { CurSeats } from "../../types/RoomSettingType";
import { toast } from "react-toastify";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { SFX, playSFX } from "../../utils/audioManager";

interface RoomUserListProps {
  curSeats: CurSeats;
  ownerSeq: number;
  amIOwner: boolean;
}

export const RoomUserList = ({ curSeats, ownerSeq, amIOwner }: RoomUserListProps) => {
  const { client } = useWebSocket();
  const { roomCode } = useParams();
  const MAX_CLOSED_SEATS = 3;

  const onToggleClose = (loc: number) => {
    if (!amIOwner) return;
    if (curSeats[loc].state === ROOM_SEAT_STATE_MAP.OCCUPIED_SEAT) return;

    const closedSeatsCount = curSeats.filter((seat) => seat.state === ROOM_SEAT_STATE_MAP.CLOSE_SEAT).length;
    if (closedSeatsCount >= MAX_CLOSED_SEATS && curSeats[loc].state !== ROOM_SEAT_STATE_MAP.CLOSE_SEAT) {
      playSFX(SFX.ERROR);
      toast.warning("좌석을 더 이상 닫을 수 없습니다.");
      return;
    }

    const newCurSeats = curSeats.map((seat, index) => {
      if (index === loc) {
        playSFX(seat.state === ROOM_SEAT_STATE_MAP.CLOSE_SEAT ? SFX.SELECT : SFX.UNSELECT);
        return {
          ...seat,
          state:
            seat.state === ROOM_SEAT_STATE_MAP.CLOSE_SEAT
              ? ROOM_SEAT_STATE_MAP.EMPTY_SEAT
              : ROOM_SEAT_STATE_MAP.CLOSE_SEAT,
        };
      }

      // equippedItems 속성을 제외하고 나머지 속성을 복사합니다.
      const { equippedItems, ...restOfSeat } = seat;
      return restOfSeat;
    });

    client?.publish({
      destination: `/pub/room/${roomCode}/curSeats`,
      body: JSON.stringify({
        curSeats: newCurSeats,
      }),
    });
  };

  return (
    <div className="3xl:w-[1225px] w-[980px] 3xl:h-[700px] h-[560px] 3xl:text-[56px] text-[44.8px] font-bold bg-transparent">
      <div className="flex flex-wrap justify-end">
        {curSeats.map((seats, index) => (
          <div
            className={`3xl:w-[275px] w-[220px] 3xl:h-[337.5px] h-[270px] 3xl:border-[10px] border-[8px] ${
              BORDER_COLOR_MAP[index]
            } ${TEXT_COLOR_MAP[index]} ${
              seats.state !== ROOM_SEAT_STATE_MAP.OCCUPIED_SEAT && ""
            } bg-gray-900 3xl:mb-[25px] mb-[20px] 3xl:mx-[12.5px] mx-[10px] relative`}
            key={index}
            onClick={() => onToggleClose(index)}
          >
            {seats.state === ROOM_SEAT_STATE_MAP.OCCUPIED_SEAT && (
              <RoomUserListItem
                nickname={seats.nickname}
                key={index}
                order={seats.order}
                userSeq={seats.userSeq}
                ownerSeq={ownerSeq}
                cap={seats.equippedItems.cap}
                face={seats.equippedItems.face}
                clothing={seats.equippedItems.clothing}
                ready={seats.ready}
              />
            )}
            {seats.state === ROOM_SEAT_STATE_MAP.CLOSE_SEAT && (
              <img
                src={CLOSE_COLOR_MAP[index]}
                alt="close seat"
                className="3xl:mt-[68px] mt-[54.4px] 3xl:ml-[55px] ml-[44px] 3xl:w-[150px] w-[120px]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

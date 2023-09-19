import { useNavigate } from "react-router-dom";
import { SFX, playSFX } from "../../utils/audioManager";
import { toast } from "react-toastify";

interface LobbyRoomItemProps {
  title: string;
  index: number;
  roomCode: string;
  curUsers: number;
  maxUsers: number;
  gameInProgress: boolean;
}

export const LobbyRoomItem = ({ title, index, roomCode, curUsers, maxUsers, gameInProgress }: LobbyRoomItemProps) => {
  const navigate = useNavigate();

  const onEnterRoom = () => {
    if (gameInProgress) {
      return; // 게임 진행 중이므로 클릭 이벤트를 무시합니다.
    }
    if (curUsers === maxUsers) {
      toast.error("방이 꽉 찼습니다.");
      return;
    }
    playSFX(SFX.CLICK);
    navigate(`/room/${roomCode}`);
  };

  return (
    <div
      className={`w-[50%] 3xl:h-[130px] h-[104px] 3xl:border-[10px] border-[8px] border-solid border-black flex items-center 3xl:text-[24px] text-[19.2px] text-white ${
        gameInProgress ? "bg-gray-500 cursor-default" : "hover:text-yellow-200 bg-gray-900"
      } shadow-inner shadow-white`}
      onClick={onEnterRoom}
      style={gameInProgress ? { pointerEvents: "none" } : {}}
    >
      <div className="flex">
        <p className="3xl:w-[64px] w-[51.2px] 3xl:ml-[40px] ml-[32px]">{index + 1}.</p>
        <p className="3xl:w-[300px] w-[240px] overflow-hidden whitespace-nowrap text-ellipsis">{title}</p>
      </div>
      <p className="3xl:ml-[20px] ml-[16px]">
        {curUsers} / {maxUsers}
      </p>
    </div>
  );
};

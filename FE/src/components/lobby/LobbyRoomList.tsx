import { useEffect, useState } from "react";
import { LobbyRoomItem } from "./LobbyRoomItem";
import { useRoomsApiCall } from "../../api/axios/useRoomsApiCall";
import { motion } from "framer-motion";
import no_room_list from "../../assets/img/room/no_room_list.png";
import { MoonLoader } from "react-spinners";

interface Room {
  roomSeq: number;
  title: string;
  roomCode: string;
  curUserNum: number;
  maxUserNum: number;
  gameInProgress: boolean;
}

interface LobbyRoomListProps {
  refresh: boolean;
}

export const LobbyRoomList = ({ refresh }: LobbyRoomListProps) => {
  const [roomList, setRoomList] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const { getRoomList } = useRoomsApiCall();

  useEffect(() => {
    (async () => {
      const roomList = await getRoomList();
      setRoomList(roomList);
      setLoading(false);
    })();
  }, [refresh]);

  if (loading) {
    return (
      <div className="relative w-full h-full">
        <div className="absolute 3xl:top-[40%] top-[38%] 3xl:left-[43%] left-[42%]">
          <MoonLoader color="#afcc23" size={100} />
        </div>
      </div>
    );
  }

  if (roomList.length !== 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-wrap 3xl:max-h-[660px] max-h-[528px] overflow-scroll justify-start items-start"
      >
        {roomList.map((room, index) => (
          <LobbyRoomItem
            key={index}
            index={index}
            title={room.title}
            roomCode={room.roomCode}
            curUsers={room.curUserNum}
            maxUsers={room.maxUserNum}
            gameInProgress={room.gameInProgress}
          />
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <div className="w-full 3xl:h-[660px] h-[528px] flex justify-center items-center">
        <img
          src={no_room_list}
          alt="방 없음"
          className="object-scale-down 3xl:w-[400px] w-[320px] 3xl:h-[400px] h-[320px] mx-auto 3xl:my-[40px] my-[32px]"
        />
      </div>
    </motion.div>
  );
};

import LobbyJobBtn from "./LobbyJobBtn";
import yellowBtnImg from "../../assets/img/common/yellowBtnImg.png";
import { JOB_MAP } from "../../constants/common/JobMap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRoomsApiCall } from "../../api/axios/useRoomsApiCall";
import { useState } from "react";
import { defaultJobSetting } from "../../constants/room/defaultRoomInfo";
import { motion } from "framer-motion";
import { SFX, playSFX } from "../../utils/audioManager";

export const LobbyCreateRoom = () => {
  const { createRoom } = useRoomsApiCall();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [jobSetting, setJobSetting] = useState(defaultJobSetting);
  const [maxUserNum, setMaxUserNum] = useState(5);

  const onCreateRoom = async () => {
    playSFX(SFX.CLICK);
    if (title.trim() === "") {
      toast.warn("방 제목을 입력해주세요.");
      return;
    }
    if (title.length > 15) {
      toast.warn("방 제목은 15자 이내로 입력해주세요.");
      return;
    }
    const roomCode = await createRoom(title, jobSetting, maxUserNum);
    navigate(`/room/${roomCode}`);
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const decreaseMaxUserCnt = () => {
    playSFX(SFX.CLICK);
    setMaxUserNum((prev) => Math.max(prev - 1, 5));
  };

  const increaseMaxUserCnt = () => {
    playSFX(SFX.CLICK);
    setMaxUserNum((prev) => Math.min(prev + 1, 8));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center w-full h-full 3xl:mt-[60px] mt-[48px] justify-start 3xl:ml-[15px] ml-[12px]"
    >
      <div className="flex justify-start items-center">
        <p className="text-white 3xl:mr-[40px] mr-[36px]">방 제목</p>
        <div className="3xl:w-[600px] w-[480px] text-center">
          <input
            className="  w-[500px] 3xl:text-[40px] text-[32px] px-[20px] 3xl:px-[16px]"
            onChange={onChangeTitle}
            maxLength={15}
            minLength={2}
            value={title}
          />
        </div>
      </div>

      <div className="flex 3xl:mt-[40px] mt-[32px]">
        <p className="text-white 3xl:px-[36px] px-[28.8px] 3xl:mr-[48px] mr-[38.4px]">최대 참가 인원</p>
        <div className="3xl:w-[400px] w-[320px] ">
          <div className="flex items-center w-full 3xl:mt-[8px] mt-[6.4px]">
            <button
              onClick={decreaseMaxUserCnt}
              disabled={maxUserNum === 5}
              className="3xl:px-[18px] px-[14.4px] 3xl:py-[8px] py-[6.4px] 3xl:text-[20px] text-[16px] font-bold bg-red-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              value={maxUserNum}
              min="5"
              max="8"
              readOnly
              className="3xl:w-[60px] w-[48px] 3xl:ml-[40px] ml-[32px] 3xl:mr-[20px] mr-[16px] 3xl:text-[50px] text-[40px] text-center bg-transparent text-yellow-200"
            />
            <button
              onClick={increaseMaxUserCnt}
              disabled={maxUserNum === 8}
              className="3xl:px-[18px] px-[14.4px] 3xl:py-[8px] py-[6.4px] 3xl:text-[20px] text-[16px] font-bold bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="3xl:mt-[0px] mt-[0px] flex flex-col justify-between">
        <p className="text-white 3xl:px-[20px] px-[16px] 3xl:mr-[48px] mr-[38.4px] 3xl:mt-[40px] mt-[32px] 3xl:mb-[40px] mb-[32px]">
          역할 설정
        </p>
        <div className="flex">
          {JOB_MAP.map(
            (job, index) =>
              index > 2 && (
                <LobbyJobBtn
                  key={job.id}
                  img={job.imgColor}
                  id={job.id}
                  jobName={job.name}
                  setJobSetting={setJobSetting}
                />
              )
          )}
        </div>
      </div>
      <div className="absolute 3xl:w-[360px] w-[288px] 3xl:h-[120px] h-[96px] flex justify-center items-center 3xl:bottom-[-40px] bottom-[-32px] 3xl:right-[40px] right-[32px]">
        <img src={yellowBtnImg} className="absolute" />
        <button className="absolute w-full text-center 3xl:py-[20px] py-[16px]" onClick={onCreateRoom}>
          방 생성
        </button>
      </div>
    </motion.div>
  );
};

import { JOB_MAP } from "../../constants/common/JobMap";
import roomTitle from "../../assets/img/room/roomTitle.png";
import RoomJobBtn from "./RoomJobBtn";
import { JOB_ID, JobSetting } from "../../types/RoomSettingType";
import { useState } from "react";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { PubTitle } from "../../types/StompRoomPubType";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { SFX, playSFX } from "../../utils/audioManager";
interface RoomHeaderProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  jobSetting: JobSetting;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSetting>>;
  amIOwner: boolean;
}

export const RoomHeader = ({ amIOwner, title, setTitle, jobSetting, setJobSetting }: RoomHeaderProps) => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const { client } = useWebSocket();
  const [isEditing, setIsEditing] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

  const onEditTitle = () => {
    playSFX(SFX.CLICK);
    setIsEditing(true);
  };

  const onCopyRoomCode = async () => {
    if (!roomCode) return;

    try {
      await navigator.clipboard.writeText(roomCode);
      playSFX(SFX.REFRESH);
      toast.success("룸 코드가 복사되었습니다.");
    } catch (error) {
      playSFX(SFX.ERROR);
      toast.error("룸 코드 복사에 실패했습니다.");
    }
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  useEffect(() => {
    setInputTitle(title);
  }, [title]);

  const onCompleteEditTitle = () => {
    if (inputTitle.trim() === "") {
      toast.warn("방 제목을 입력해주세요.");
      return;
    }
    if (inputTitle.length > 15) {
      toast.error("제목은 15자 이내로 입력해주세요.");
      return;
    }
    playSFX(SFX.SWAP);
    setTitle(inputTitle);

    if (!roomCode) return;
    const body: PubTitle = {
      title: inputTitle,
    };
    client?.publish({
      destination: `/pub/room/${roomCode}/title`,
      body: JSON.stringify(body),
    });

    setIsEditing(false);
  };

  return (
    <div
      className="3xl:w-[1420px] w-[1136px] 3xl:h-[126px] h-[100.8px] 3xl:text-[38px] text-[30.4px] text-white flex items-center bg-cover 3xl:ml-[25px] ml-[20px]"
      style={{ backgroundImage: `url("${roomTitle}")` }}
    >
      {amIOwner ? (
        isEditing ? (
          <div className="flex items-center 3xl:w-[1000px] w-[800px]">
            <input
              className=" 3xl:text-[30px] text-[24px] 3xl:ml-[50px] ml-[40px] mr-10 text-black "
              value={inputTitle}
              onChange={onTitleChange}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  onCompleteEditTitle();
                }
              }}
            />
            <button className="3xl:text-[30px] text-[24px]" onClick={onCompleteEditTitle}>
              완료
            </button>
          </div>
        ) : (
          <div className="flex items-center 3xl:w-[1000px] w-[800px]">
            <p className="3xl:text-[30px] text-[24px] 3xl:ml-[50px] ml-[40px] 3xl:mr-[50px] mr-[40px]">{title}</p>
            <button
              className="3xl:text-[30px] text-[24px] 3xl:border-[4px] border-[3.2px] rounded-md 3xl:px-[16px] px-[12.8px] text-amber-200 hover:border-amber-200 duration-500 transition-colors"
              onClick={onEditTitle}
            >
              제목 수정
            </button>
          </div>
        )
      ) : (
        <div className="flex items-center 3xl:w-[900px] w-[720px]">
          <p className="3xl:text-[30px] text-[24px] 3xl:ml-[50px] ml-[40px] 3xl:mr-[40px] mr-[32px]">{title}</p>
        </div>
      )}
      <div className=" flex items-center">
        <div className="flex flex-col 3xl:text-[18px] text-[14.4px]">
          <p>룸코드</p>
          <p>{roomCode}</p>
        </div>

        <button
          className="3xl:mx-[16px] py-2  mx-[12.8px] 3xl:text-[22px] text-[17.6px] 3xl:border-[4px] border-[3.2px] rounded-md 3xl:px-[8px] px-[6.4px]  text-amber-200 hover:border-amber-200 duration-500 transition-colors"
          onClick={onCopyRoomCode}
        >
          copy
        </button>
      </div>

      <div className="flex justify-end w-[272px] 3xl:w-[340px] mr-10">
        {JOB_MAP.map(
          (job, index) =>
            index > 2 && (
              <RoomJobBtn
                amIOwner={amIOwner}
                key={job.id}
                img={job.imgColor}
                id={job.id as JOB_ID}
                setJobSetting={setJobSetting}
                jobSetting={jobSetting}
              />
            )
        )}
      </div>
    </div>
  );
};

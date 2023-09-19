import { useEffect, useState } from "react";
import { JobSetting } from "../../types/RoomSettingType";
import { SFX, playSFX } from "../../utils/audioManager";

interface LobbyJobBtnProps {
  id: string | undefined;
  img: string;
  jobName: string;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSetting>>;
}

const LobbyJobBtn = ({ img, id, setJobSetting, jobName }: LobbyJobBtnProps) => {
  const [isUsed, setIsUsed] = useState(true);
  const onToggleSelected = () => {
    playSFX(SFX.TAB);
    setIsUsed((prev) => !prev);
  };

  useEffect(() => {
    if (id !== undefined) {
      setJobSetting((prev) => ({ ...prev, [id]: isUsed }));
    }
  }, [isUsed]);

  return (
    <div
      className="3xl:w-[100px] w-[80px] 3xl:h-[50px] h-[40px] relative 3xl:mx-[37.5px] mx-[30px]"
      onClick={onToggleSelected}
    >
      <img className={`w-full ${!isUsed && "opacity-20"}`} src={img} />
      <p className={`3xl:text-[24px] text-[19.2px] text-center ${!isUsed ? "text-gray-400" : "text-yellow-100"}`}>
        {jobName}
      </p>
    </div>
  );
};

export default LobbyJobBtn;

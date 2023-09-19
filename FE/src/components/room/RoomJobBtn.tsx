import { JOB_ID, JobSetting } from "../../types/RoomSettingType";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
interface RoomJobBtnProps {
  id: JOB_ID;
  img: string;
  setJobSetting: React.Dispatch<React.SetStateAction<JobSetting>>;
  jobSetting: JobSetting;
  amIOwner: boolean;
}

const RoomJobBtn = ({ amIOwner, img, id, setJobSetting, jobSetting }: RoomJobBtnProps) => {
  const { roomCode } = useParams();
  const { client } = useWebSocket();

  const onToggleSelected = () => {
    const newJobSetting = { ...jobSetting, [id]: !jobSetting[id] };

    setJobSetting(newJobSetting);

    const body = { jobSetting: { "1": true, "2": true, ...newJobSetting } };

    client?.publish({
      destination: `/pub/room/${roomCode}/jobSetting`,
      body: JSON.stringify(body),
    });
    console.log(body);
  };

  return (
    <>
      {amIOwner ? (
        <div
          className="3xl:w-[48px] w-[38.4px] 3xl:h-[48px] h-[38.4px] relative 3xl:mx-[8px] mx-[6.4px]"
          onClick={onToggleSelected}
        >
          {jobSetting[id] ? <img className="w-full " src={img} /> : <img className={`w-full opacity-40 `} src={img} />}
        </div>
      ) : (
        <div className="3xl:w-[48px] w-[38.4px] 3xl:h-[48px] h-[38.4px] relative 3xl:mx-[8px] mx-[6.4px]">
          {jobSetting[id] ? <img className="w-full " src={img} /> : <img className={`w-full opacity-40 `} src={img} />}
        </div>
      )}
    </>
  );
};

export default RoomJobBtn;

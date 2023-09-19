import { calculateMinutesBetweenDates, formatDateTime } from "../../utils/calculateDate";
import { JOB_MAP } from "../../constants/common/JobMap";

interface RecentlyGameDataItemProps {
  jobSeq: number;
  startAt: string;
  endAt: string;
  win: boolean;
}

export const ProfileRecentlyDataItem = ({ jobSeq, startAt, endAt, win }: RecentlyGameDataItemProps) => {
  return (
    <>
      <ul className="flex 3xl:my-[14px] my-[11.2px] 3xl:ml-[60px] ml-[48px]">
        {win ? (
          <li className="3xl:w-[200px] w-[160px] text-blue-400 3xl:ml-[20px] ml-[16px]">승</li>
        ) : (
          <li className="3xl:w-[200px] w-[160px] text-red-400 3xl:ml-[20px] ml-[16px]">패</li>
        )}
        <li className="3xl:w-[240px] w-[192px] 3xl:ml-[10px] ml-[8px]">{JOB_MAP[jobSeq].name}</li>
        <li className="3xl:w-[240px] w-[192px] 3xl:ml-[0px] ml-[0px]">
          {calculateMinutesBetweenDates(startAt, endAt)} 분
        </li>
        <li className="3xl:w-[340px] w-[272px] 3xl:ml-[-40px] ml-[32px]">{formatDateTime(startAt)}</li>
      </ul>
      <hr className="bg-white" />
    </>
  );
};

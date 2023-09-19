import { ProfileRecentlyDataItem } from "./ProfileRecentlyDataItem";
import { useState, useEffect } from "react";
import { useRecordApiCall } from "../../api/axios/useRecordApiCall";
import { motion } from "framer-motion";
import no_record from "../../assets/img/profile/no_record.png";

interface RecentlyGameData {
  jobSeq: number;
  roomSeq: number;
  startAt: string;
  endAt: string;
  win: boolean;
}

export const ProfileRecentlyData = () => {
  const [recentlyGameDataList, setRecentlyGameDataList] = useState<RecentlyGameData[]>([]);
  const { getRecentlyGameDataList } = useRecordApiCall();

  useEffect(() => {
    (async () => {
      const recentlyGameDataList = await getRecentlyGameDataList();
      setRecentlyGameDataList(recentlyGameDataList);
    })();
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
      <div className="3xl:p-[20px] p-[16px] 3xl:text-[36px] text-[28.8px] font-bold text-white flex flex-col ">
        <ul className="flex text-center ">
          <li className="3xl:w-[200px] w-[160px]">결과</li>
          <li className="3xl:w-[240px] w-[192px]">내 역할</li>
          <li className="3xl:w-[240px] w-[192px]">진행 시간</li>
          <li className="3xl:w-[340px] w-[272px]">게임 일자</li>
        </ul>
        <hr className="3xl:my-[20px] my-[16px] w-full 3xl:border-[2px] border-[1.6px]" />
        {recentlyGameDataList.length !== 0 ? (
          recentlyGameDataList.map((data, index) => (
            <ProfileRecentlyDataItem
              key={index}
              jobSeq={data.jobSeq}
              startAt={data.startAt}
              endAt={data.endAt}
              win={data.win}
            />
          ))
        ) : (
          <img className="w-full" src={no_record} />
        )}
      </div>
    </motion.div>
  );
};

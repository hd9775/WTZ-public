import { motion } from "framer-motion";
import { PROFILE_MAP } from "../../constants/profile/ProfileMap";
import { SFX, playSFX } from "../../utils/audioManager";
import { useLevelApiCall } from "../../api/axios/useLevelApiCall";
import { useEffect } from "react";
import { useState } from "react";

interface MyInfo {
  email: string;
  nickname: string;
  onSetViewMain: (num: number) => void;
}

const ProfileBasic = ({ email, nickname, onSetViewMain }: MyInfo) => {
  const { getLevelAndExp } = useLevelApiCall();
  const [level, setLevel] = useState<number>(0);
  const [exp, setExp] = useState<number>(0);
  const [maxExp, setMaxExp] = useState<number>(0);
  const [gauge, setGauge] = useState(0);

  useEffect(() => {
    (async () => {
      const { level, exp, maxExp } = await getLevelAndExp();
      setLevel(level);
      setExp(exp);
      setMaxExp(maxExp);
    })();
  }, []);

  useEffect(() => {
    setGauge((exp / maxExp) * 100);
  }, [level, exp, maxExp]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="flex flex-wrap 3xl:text-[40px] text-[32px] text-white"
    >
      <div className="3xl:px-[200px] px-[160px] 3xl:pt-[70px] pt-[56px]">
        <p className="3xl:mb-[50px] mb-[40px]">이메일 : {email}</p>
        <p className="3xl:mb-[50px] mb-[40px]">닉네임 : {nickname}</p>
      </div>
      <div className="relative w-[64%] 3xl:ml-[204px] ml-[163.2px] 3xl:h-[80px] h-[64px] 3xl:border-[8px] border-[6.4px] rounded-3xl border-gray-700 3xl:my-[40px] my-[32px] bg-gradient-to-br from-rose-100 to-teal-100">
        <div
          className="absolute top-0 3xl:left-[0px] left-[0px] h-full rounded-xl 3xl:border-r-[8px] border-r-[6.4px] border-gray-600 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400"
          style={{ width: `${gauge}%` }}
        />
        <div className="absolute 3xl:top-[-58px] top-[-46.4px] 3xl:left-[-40px] left-[-32px] rounded-full 3xl:h-[130px] h-[104px] 3xl:w-[130px] w-[104px] border-gray-700 3xl:border-[8px] border-[6.4px] flex justify-center items-center bg-gradient-to-br from-rose-100 to-teal-100">
          <p className="text-black font-bold 3xl:text-[30px] text-[24px] text-center">Lv{level}</p>
        </div>
        <p className="absolute 3xl:top-[-60px] top-[-48px] right-0 text-center text-white 3xl:text-[32px] text-[25.6px] font-bold">
          {exp} / {maxExp}
        </p>
      </div>
      <div className="flex justify-around w-[100%] 3xl:pt-[20px] pt-[16px] px-[10%]">
        <p
          className="text-green-200 border-solid border-[8px] border-gray-600 3xl:p-[20px] p-[16px]  hover:text-green-300"
          onClick={() => {
            onSetViewMain(PROFILE_MAP.PROFILE_UPDATE);
            playSFX(SFX.CLICK);
          }}
        >
          비밀번호 변경
        </p>
        <p
          className="text-red-200 border-solid 3xl:border-[10px] border-[8px] border-gray-600 3xl:p-[20px] p-[16px]  hover:text-red-300"
          onClick={() => {
            onSetViewMain(PROFILE_MAP.PROFILE_DEL_USER);
            playSFX(SFX.CLICK);
          }}
        >
          회원 탈퇴
        </p>
      </div>
    </motion.div>
  );
};
export default ProfileBasic;

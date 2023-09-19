import { useNavigate } from "react-router-dom";
import { BGM, playBGM } from "../../utils/audioManager";
import { ResultLose } from "./ResultLose";
import { ResultWin } from "./ResultWin";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLevelApiCall } from "../../api/axios/useLevelApiCall";
import ResultGetData from "../modal/ResultGetData";

export interface GameResultFromGamePage {
  gameCode: string;
  userInfo: {
    userSeq: number;
    jobSeq: number;
    win: boolean;
    nickname: string;
    order: number;
  }[];
  rabbitWin: boolean;
  roomCode: string;
}

export const ResultForm = () => {
  const location = useLocation();
  const gameResultFromGamePage: GameResultFromGamePage = location.state;

  const userResultInfoList = gameResultFromGamePage.userInfo;
  const { rabbitWin } = gameResultFromGamePage;
  const { roomCode } = gameResultFromGamePage;
  const navigate = useNavigate();
  const { getResultLevelAndExp, getResultCoin } = useLevelApiCall();

  const [lastLevel, setLastLevel] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [lastExp, setLastExp] = useState(0);
  const [currentExp, setCurrentExp] = useState(0);
  const [maxExp, setMaxExp] = useState(0);
  const [lastPoint, setLastPoint] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);

  useEffect(() => {
    (async () => {
      const { lastExp, currentExp, maxExp, lastLevel, currentLevel } = await getResultLevelAndExp(
        gameResultFromGamePage.gameCode
      );
      const { lastPoint, currentPoint } = await getResultCoin(gameResultFromGamePage.gameCode);
      setLastExp(lastExp);
      setCurrentExp(currentExp);
      setMaxExp(maxExp);
      setLastLevel(lastLevel);
      setCurrentLevel(currentLevel);
      setLastPoint(lastPoint);
      setCurrentPoint(currentPoint);
    })();
  }, []);

  if (rabbitWin) {
    playBGM(BGM.WIN);
  } else {
    playBGM(BGM.LOSE);
  }

  const goToRoom = (roomCode: string) => {
    navigate(`/room/${roomCode}`, {
      state: {
        isComeFromGame: true,
      },
    });
  };

  return (
    <>
      <ResultGetData
        levelUp={lastLevel !== currentLevel}
        lastLevel={lastLevel}
        currentLevel={currentLevel}
        lastExp={lastExp}
        currentExp={currentExp}
        maxExp={maxExp}
        lastPoint={lastPoint}
        currentPoint={currentPoint}
      />
      {rabbitWin ? (
        <div className="flex flex-col justify-around w-full h-full bg-gradient-to-b from-black from-20% font-bold to-yellow-200">
          <div className="flex justify-center text-red-500">
            {userResultInfoList.map((item, index) => {
              return (
                !item.win && <ResultLose jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <p className="3xl:text-[72px] text-[57.6px] text-center font-bold text-yellow-200">토끼 승리</p>
          <div className="flex justify-center text-white">
            {userResultInfoList.map((item, index) => {
              return (
                item.win && <ResultWin jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <button
            className="3xl:w-[240px] w-[192px] 3xl:h-[60px] h-[48px] mx-auto 3xl:text-[30px] text-[24px] bg-gradient-to-b from-yellow-200 via-yellow-300 to-yellow-400 rounded-2xl border-black border-solid 3xl:border-[4px] border-[3.2px] hover:brightness-[1.10]"
            onClick={() => goToRoom(roomCode)}
          >
            방으로 이동
          </button>
        </div>
      ) : (
        <div className="flex flex-col justify-around w-full h-full bg-gradient-to-b from-black from-20% font-bold to-green-200">
          <div className="flex justify-center text-white">
            {userResultInfoList.map((item, index) => {
              return (
                !item.win && <ResultLose jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <p className="3xl:text-[72px] text-[57.6px] text-center font-bold text-green-200">자라 승리</p>
          <div className="flex justify-center  text-red-500">
            {userResultInfoList.map((item, index) => {
              return (
                item.win && <ResultWin jobSeq={item.jobSeq} order={item.order} nickname={item.nickname} key={index} />
              );
            })}
          </div>
          <button
            className="3xl:w-[240px] w-[192px] 3xl:h-[60px] h-[48px] mx-auto 3xl:text-[30px] text-[24px] bg-gradient-to-b from-green-200 to-green-500 rounded-2xl border-black border-solid 3xl:border-[4px] border-[3.2px] hover:brightness-[1.10]"
            onClick={() => goToRoom(roomCode)}
          >
            방으로 이동
          </button>
        </div>
      )}
    </>
  );
};

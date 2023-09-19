import Rodal from "rodal";
import { useState, useEffect } from "react";
import rabbit from "../../assets/img/home/RabbitOnly.png";
import coin from "../../assets/img/shop/coin.png";

interface ResultGetDataProps {
  levelUp: boolean;
  lastLevel: number;
  currentLevel: number;
  lastExp: number;
  currentExp: number;
  maxExp: number;
  lastPoint: number;
  currentPoint: number;
}

const ResultGetData = ({
  levelUp,
  lastLevel,
  currentLevel,
  lastExp,
  currentExp,
  maxExp,
  lastPoint,
  currentPoint,
}: ResultGetDataProps) => {
  const [viewModal, setViewModal] = useState(true);
  const [gauge, setGauge] = useState((lastExp / maxExp) * 100);
  const [gaugeFull, setGaugeFull] = useState(false);
  const [level, setLevel] = useState(0);
  const [levelEffect, setLevelEffect] = useState(0);
  const levelColor = ["text-yellow-200", "text-blue-200", "text-red-200"];
  const levelScale = ["scale-100", "scale-110"];
  const [point, setPoint] = useState(0);
  const [addPoint, setAddPoint] = useState(0);
  const [dropCoinView, setDropCoinView] = useState(false);

  useEffect(() => {
    setPoint(lastPoint);
    setLevel(lastLevel);
    setGauge((lastExp / maxExp) * 100);
    setAddPoint(currentPoint - lastPoint);
  }, [lastLevel, lastExp, maxExp, lastPoint, currentPoint]);

  useEffect(() => {
    if (addPoint <= 0) {
      setDropCoinView(false);
      return;
    }
    setTimeout(() => {
      setAddPoint((prev) => prev - 1);
      setPoint((prev) => prev + 1);
      setDropCoinView(true);
    }, 100);
  }, [addPoint]);

  useEffect(() => {
    if (levelUp && level === currentLevel) {
      return;
    }
    if (levelUp) {
      setTimeout(() => {
        setGauge(100);
      }, 500);
      setTimeout(() => {
        setGaugeFull(true);
      }, 3000);
      setTimeout(() => {
        setGaugeFull(false);
      }, 3100);
    } else {
      setTimeout(() => {
        setGauge((currentExp / maxExp) * 100);
      }, 500);
    }

    if (levelUp) {
      setInterval(() => {
        setLevelEffect((prev) => (prev + 1) % 6);
      }, 1000);
    }
  }, [level]);

  console.log(lastLevel);
  useEffect(() => {
    if (gaugeFull) {
      setLevel(currentLevel);
      setGauge(0);
      setTimeout(() => {
        setGaugeFull(false);
        setGauge((currentExp / maxExp) * 100);
      }, 200);
    }
  }, [gaugeFull]);
  return (
    <Rodal
      visible={viewModal}
      onClose={() => setViewModal(false)}
      enterAnimation="door"
      leaveAnimation="slideDown"
      duration={1000}
      width={1}
      height={1}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
      }}
    >
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[800px] w-[640px] 3xl:h-[400px] h-[320px] bg-gray-900 border-solid 3xl:border-[10px] border-[8px] border-white flex flex-col justify-center items-center 3xl:text-[30px] text-white text-[24px] 3xl:pt-[30px] pt-[24px]">
        <div className="flex justify-between items-center w-full 3xl:mb-[80px] mb-[64px]">
          <div className="flex justify-start items-center w-auto 3xl:ml-[60px] ml-[48px]">
            <img className="3xl:w-[60px] w-[48px] 3xl:h-[60px] h-[48px] 3xl:mx-[20px] mx-[16px]" src={rabbit} />
            <p className="3xl:text-[40px] text-[32px] font-bold text-yellow-200">Who's the ZARA</p>
          </div>
          <div className="flex justify-end items-center 3xl:mr-[70px] mr-[56px]">
            {dropCoinView && (
              <img
                className={`absolute 3xl:right-[140px] right-[112px] 3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] animate-drop-fade-out`}
                src={coin}
              />
            )}
            <img
              className="absolute 3xl:right-[140px] right-[112px] 3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px]"
              src={coin}
            />
            <p className="absolute 3xl:right-[60px] right-[48px] 3xl:w-[80px] w-[64px] font-bold text-left">{point}</p>
          </div>
        </div>
        <div className="relative w-[80%] 3xl:ml-[30px] ml-[24px] 3xl:h-[80px] h-[64px] 3xl:border-[8px] border-[6.4px] rounded-3xl border-gray-700 3xl:my-[40px] my-[32px] bg-gradient-to-br from-rose-100 to-teal-100">
          <div
            className={`absolute top-0 3xl:h-[66px] h-[52.8px] rounded-xl 3xl:border-r-[8px] border-r-[6.4px] border-gray-600 bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400 scale-x-100 ease-linear ${
              gaugeFull ? "duration-0" : "duration-[2000ms]"
            }`}
            style={{ width: `${gauge}%` }}
          />
          <div className="absolute 3xl:top-[-58px] top-[-46.4px] 3xl:left-[-40px] left-[-32px] rounded-full 3xl:h-[130px] h-[104px] 3xl:w-[130px] w-[104px] border-gray-700 3xl:border-[8px] border-[6.4px] flex justify-center items-center bg-gradient-to-br from-rose-100 to-teal-100">
            <p className="text-black font-bold 3xl:text-[30px] text-[24px] text-center">Lv{level}</p>
          </div>
          {levelUp && (
            <p
              className={`absolute 3xl:top-[-100px] top-[-80px] 3xl:left-[120px] left-[96px] text-center 3xl:text-[50px] text-[40px] font-bold ${
                levelUp && levelColor[levelEffect % 3]
              } ${levelUp && levelScale[levelEffect % 2]}`}
            >
              Level Up!!
            </p>
          )}
          <p className="absolute 3xl:top-[-60px] top-[-48px] right-0 text-center text-white 3xl:text-[32px] text-[25.6px] font-bold">
            {currentExp} / {maxExp}
          </p>
        </div>
      </div>
    </Rodal>
  );
};

export default ResultGetData;

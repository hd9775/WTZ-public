import { useEffect, useState } from "react";
import { useWebSocket } from "../../context/socketContext";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { useParams } from "react-router-dom";

interface GameTimerProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  nowTime: string;
  amIDead: boolean;
}

export const GameTimer = ({ timer, setTimer, nowTime, amIDead }: GameTimerProps) => {
  const { gameCode } = useParams();
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const [useSkip, setUseSkip] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const skipTime = (num: number) => {
    if (useSkip) {
      return;
    }

    setUseSkip(true);
    client?.publish({
      destination: `/pub/game/${gameCode}/timer/decrease`,
      body: JSON.stringify({ userSeq, decreaseTime: num }),
    });
  };

  useEffect(() => {
    setUseSkip(false);
  }, [nowTime]);

  const decreaseTime = () => {
    setTimer((prevTime) => {
      if (prevTime - 1 < 0) return 0;
      return prevTime - 1;
    });
  };

  useEffect(() => {
    const secDown = setInterval(() => {
      decreaseTime();
      if (timer <= 0) {
        if (!gameCode) return;
        if(!isSend){
          setIsSend(true);
        }  
      }
    }, 1000);
    return () => clearInterval(secDown);
  }, [timer, gameCode]);

  useEffect(() => {
    if(isSend){
      console.log("PUB!!!!")
      client?.publish({
        destination: `/pub/game/${gameCode}/timer`,
        body: JSON.stringify({ userSeq }),
      });
    }
  }, [isSend])

  useEffect(() => {
    setIsSend(false);
  }, [nowTime])

  return (
    <div className="absolute 3xl:top-[20px] top-[16px] drop-shadow-2xl w-[20%] flex items-center justify-center">
      <p
        className="text-white 3xl:text-[120px] text-[96px] drop-shadow-stroke-black text-center"
        onClick={() => skipTime(100)}
      >
        {timer}
      </p>
      {!amIDead && (
        <div
          className={`absolute 3xl:top-[160px] top-[128px] text-yellow-200 text-center font-bold 3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] flex justify-center items-center hover:brightness-110  ${
            (useSkip || nowTime !== "DAY") && "opacity-0"
          }`}
          onClick={() => skipTime(10)}
        >
          <p className="3xl:text-[50px] text-[40px] 3xl:w-[150px] w-[120px] 3xl:h-[80px] h-[64px] drop-shadow-stroke-black">
            SKIP
          </p>
        </div>
      )}
    </div>
  );
};

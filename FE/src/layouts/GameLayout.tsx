import { useEffect, useState } from "react";
import gameBg1 from "../assets/img/game/ship.png";
// import gameBg1 from "../assets/img/game/gameBg.gif";
import gameBg2 from "../assets/img/game/gameBg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import { SFX, playSFX } from "../utils/audioManager";

export const GameLayout = ({ children }: LayoutChildrenProps) => {
  const [backgroundImage, setBackGroundImage] = useState(gameBg1);
  const [prolog, setProlog] = useState(true);
  const [goRight, setGoRight] = useState(false);

  useEffect(() => {
    playSFX(SFX.SEA);
  }, []);

  setTimeout(() => {
    setGoRight(true);
  }, 300);

  setTimeout(() => {
    setBackGroundImage(gameBg2);
    setProlog(false);
  }, 5000);
  return (
    <div
      className={`relative 3xl:w-[1920px] w-[1536px] 3xl:h-[942px] h-[754px] overflow-hidden flex justify-center items-center ${
        prolog && "ease-linear duration-[4500ms] transition-all"
      } ${!prolog ? "bg-cover" : !goRight ? "bg-left" : "bg-right"} `}
      style={{ backgroundImage: `url("${backgroundImage}")` }}
    >
      {!prolog && <>{children}</>}
    </div>
  );
};

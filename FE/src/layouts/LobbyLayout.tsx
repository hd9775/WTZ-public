import { useState, useEffect } from "react";
import lobbyBg from "../assets/img/lobby/lobbyBg.png";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import MotionLayout from "./MotionLayout";
import { BGM, playBGM } from "../utils/audioManager";

const LobbyLayout = ({ children }: LayoutChildrenProps) => {
  const [dir, setDir] = useState(2);
  const translate = [
    "translate-x-[0%] translate-y-[0%]",
    "translate-x-[-25%] translate-y-[-25%]",
    "translate-x-[0%] translate-y-[-50%]",
    "translate-x-[25%] translate-y-[-25%]",
  ];
  const [move, setMove] = useState(translate[0]);

  playBGM(BGM.MAIN);

  useEffect(() => {
    setTimeout(() => {
      setMove(translate[1]);
    }, 100);
  }, []);

  useEffect(() => {
    const bgMove = setTimeout(() => {
      setDir((dir) => (dir + 1) % 4);
      setMove(translate[dir]);
    }, 20000);
    return () => clearTimeout(bgMove);
  }, [move, dir]);

  return (
    <MotionLayout>
      <div className={`relative 3xl:w-[1920px] w-[1536px] 3xl:h-[942px] h-[754px] overflow-hidden`}>
        <div
          className={`absolute top-[0px] 3xl:left-[-960px] left-[-768px] 3xl:w-[3840px] w-[3072px] 3xl:h-[2160px] h-[1728px] bg-repeat transition-all duration-[20000ms] ease-linear ${move}`}
          style={{ backgroundImage: `url("${lobbyBg}")` }}
        ></div>
        {children}
      </div>
    </MotionLayout>
  );
};

export default LobbyLayout;

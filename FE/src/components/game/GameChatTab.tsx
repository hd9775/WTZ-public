// import { useState } from "react";
import { TAB_MAP } from "../../constants/game/TabMap";
import { GameChatTabItem } from "./GameChatTabItem";

interface GameChatTabProps {
  selectTab: number;
  onSetSelectTab: (num: number) => void;
  amIZara: boolean;
  amIDead: boolean;
  newMessage: boolean[];
  nowTime: string;
}

export const GameChatTab = ({ selectTab, onSetSelectTab, amIZara, amIDead, newMessage, nowTime }: GameChatTabProps) => {
  const viewTab = [true, amIZara, amIDead];
  return (
    <div className="absolute 3xl:left-[11px] left-[8.8px] 3xl:top-[-35px] top-[-28px]">
      <div className="flex justify-start">
        {viewTab[TAB_MAP.ALL] && (
          <GameChatTabItem
            tabType={TAB_MAP.ALL}
            selectTab={selectTab}
            onSetSelectTab={onSetSelectTab}
            alert={newMessage[0]}
          />
        )}
        {viewTab[TAB_MAP.ZARA] && (
          <GameChatTabItem
            tabType={TAB_MAP.ZARA}
            selectTab={selectTab}
            onSetSelectTab={onSetSelectTab}
            alert={newMessage[1]}
          />
        )}
        {viewTab[TAB_MAP.GHOST] && (
          <GameChatTabItem
            tabType={TAB_MAP.GHOST}
            selectTab={selectTab}
            onSetSelectTab={onSetSelectTab}
            alert={newMessage[2]}
          />
        )}
        {selectTab === 0 && (nowTime === "NIGHT" || nowTime === "NIGHT_RESULT") && (
          <div className="absolute z-10 3xl:w-[320px] w-[256px] 3xl:h-[45px] h-[36px] left-0 3xl:top-[330px] top-[264px] text-red-600 flex justify-center items-center 3xl:text-[18px] text-[14.4px] bg-gray-200">
            밤에는 전체 채팅을 할 수 없습니다.
          </div>
        )}
        {selectTab === 1 && !(nowTime === "NIGHT" || nowTime === "NIGHT_RESULT") && (
          <div className="absolute z-10 3xl:w-[320px] w-[256px] 3xl:h-[45px] h-[36px] 3xl:top-[330px] top-[264px] text-red-600 flex justify-center items-center 3xl:text-[15px] text-[12px] bg-white">
            낮, 투표에는 자라 채팅을 할 수 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

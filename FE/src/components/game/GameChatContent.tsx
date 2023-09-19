import { useEffect, useRef } from "react";
import { GameChatContentItem } from "./GameChatContentItem";

interface GameChatContentProps {
  chatList: {
    userOrder: number;
    nickname: string;
    message: string;
  }[];
}

export const GameChatContent = ({ chatList }: GameChatContentProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    }
  }, [chatList]);

  return (
    <>
      <div
        ref={scrollRef}
        className="absolute 3xl:left-[12.5px] left-[10px] 3xl:top-[12.5px] top-[10px] 3xl:w-[325px] w-[260px] 3xl:h-[270px] h-[216px] 3xl:py-[5px] py-[4px] 3xl:px-[10px] px-[8px] overflow-x-hidden overflow-y-scroll"
      >
        {chatList.map((chat, index) => (
          <GameChatContentItem chat={chat} key={index} />
        ))}
      </div>
    </>
  );
};

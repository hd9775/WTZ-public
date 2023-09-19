import { TEXT_COLOR_MAP } from "../../constants/common/TextColorMap";

interface GameChatContentItemProps {
  chat: {
    userOrder: number;
    nickname: string;
    message: string;
  };
}

export const GameChatContentItem = ({ chat }: GameChatContentItemProps) => {
  return (
    <div>
      <span className={`${TEXT_COLOR_MAP[chat.userOrder + 1]}`}>{`[${chat.nickname}]`} </span>
      <span className="text-white">{chat.message}</span>
    </div>
  );
};

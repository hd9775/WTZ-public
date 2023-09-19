import gameTabImg from "../../assets/img/game/gameTabImg.png";

interface GameChatTabItemProps {
  tabType: number;
  selectTab: number;
  onSetSelectTab: (num: number) => void;
  alert: boolean;
}

export const GameChatTabItem = ({ tabType, selectTab, onSetSelectTab, alert }: GameChatTabItemProps) => {
  const text = ["전체", "자라", "유령"];
  const color = ["text-yellow-300", "text-green-400", "text-pink-400"];
  return (
    <>
      <div
        className={`relative 3xl:w-[80px] w-[64px] 3xl:h-[37.5px] h-[30px] bg-cover ${
          selectTab === tabType ? color[tabType] : "text-white"
        } 3xl:text-[22.5px] text-[18px] flex justify-center items-end 3xl:mr-[2px] mr-[1.6px]`}
        style={{ backgroundImage: `url("${gameTabImg}")` }}
        onClick={() => onSetSelectTab(tabType)}
      >
        <p>{text[tabType]}</p>
        {alert && (
          <div className="absolute">
            <div className="relative flex 3xl:h-[20px] h-[16px] 3xl:w-[20px] w-[16px] 3xl:top-[-25px] top-[-20px] 3xl:left-[-35px] left-[28px] ">
              <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75 3xl:text-[2px] text-[1.6px] justify-center items-center flex">
                <p className="text-center">N</p>
              </span>
              <span className="relative rounded-full 3xl:h-[20px] h-[16px] 3xl:w-[20px] w-[16px] bg-red-500 3xl:text-[2px] text-[1.6px] justify-center items-center flex">
                <p className="text-center">N</p>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

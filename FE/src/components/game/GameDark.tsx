interface GameDarkProps {
  nowTime: string;
}

const GameDark = ({ nowTime }: GameDarkProps) => {
  return (
    <div
      className={`absolute w-full h-full ${
        nowTime === "NIGHT" || nowTime === "NIGHT_RESULT" ? "opacity-50" : "opacity-0"
      } bg-black duration-[2000ms] transition-all`}
    ></div>
  );
};

export default GameDark;

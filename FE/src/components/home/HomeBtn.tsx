interface HomeBtnProps {
  text: string;
  index: number;
  onClick: () => void;
}

export const HomeBtn = ({ text, index, onClick }: HomeBtnProps) => {
  const indexStyle = [
    "3xl:text-[96px] text-[72px] 3xl:top-[0px] top-[0px] 3xl:left-[-10px] left-[-10px] rotate-[5deg] text-yellow-200 animate-[fade-out-in_3.0s_linear]",
    "3xl:text-[48px] text-[40px] 3xl:top-[130px] top-[100px] 3xl:left-[-90px] left-[-70px] rotate-[9deg] text-white animate-[fade-out-in_3.5s_linear]",
    "3xl:text-[64px] text-[52px] 3xl:top-[200px] top-[150px] 3xl:left-[90px] left-[70px] rotate-[-8deg] text-white animate-[fade-out-in_4.0s_linear]",
    "3xl:text-[88px] text-[68px] 3xl:top-[0px] top-[0px] 3xl:left-[-40px] left-[-30px] rotate-[5deg] text-yellow-200 animate-[fade-out-in_3.0s_linear]",
    "3xl:text-[46px] text-[36px] 3xl:top-[130px] top-[100px] 3xl:left-[-90px] left-[-70px] rotate-[9deg] text-white animate-[fade-out-in_3.5s_linear]",
    "3xl:text-[58px] text-[44px] 3xl:top-[200px] top-[150px] 3xl:left-[90px] left-[70px] rotate-[-8deg] text-white animate-[fade-out-in_4.0s_linear]",
  ];

  return (
    <>
      <button
        className={`absolute w-auto h-auto whitespace-nowrap font-bold ${indexStyle[index]} hover:scale-110 transition duration-1000`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

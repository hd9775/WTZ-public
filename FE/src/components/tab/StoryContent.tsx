import storyImg1 from "../../assets/img/home/storyImg1.png";
import storyImg2 from "../../assets/img/home/storyImg2.png";
import storyImg3 from "../../assets/img/home/storyImg3.png";
import { useRef, useState, useEffect } from "react";
import { SFX, playSFX } from "../../utils/audioManager";
import upArrow from "../../assets/img/home/upArrow.png";
import downArrow from "../../assets/img/home/downArrow.png";

const StoryContent = () => {
  const [curViewRoleItemsIndex, setCurViewRoleItemsIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const minViewRoleItemsIndex = 0;
  const maxViewRoleItemsIndex = 2;
  const slideDown = () => {
    if (curViewRoleItemsIndex === maxViewRoleItemsIndex) {
      return;
    }
    playSFX(SFX.SWAP);
    setCurViewRoleItemsIndex((prevSlide) => prevSlide + 1);
  };
  const slideUp = () => {
    if (curViewRoleItemsIndex === minViewRoleItemsIndex) {
      return;
    }
    playSFX(SFX.SWAP);
    setCurViewRoleItemsIndex((prevSlide) => prevSlide - 1);
  };
  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRoleItemsIndex * 33}%)`;
  }, [curViewRoleItemsIndex]);
  return (
    <>
      <img
        src={downArrow}
        alt="down arrow"
        className={`z-10 absolute 3xl:bottom-[-40px] bottom-[-32px] 3xl:right-[16px] right-[12.8px]  3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:p-[20px] p-[16px] mx-auto 3xl:mt-[24px] mt-[19.2px] hover:scale-110 transition-all duration-500 ${
          curViewRoleItemsIndex === maxViewRoleItemsIndex && "opacity-0"
        } `}
        onClick={slideDown}
      />
      <img
        src={upArrow}
        alt="up arrow"
        className={`z-10 absolute 3xl:bottom-[30px] bottom-[24px] 3xl:right-[16px] right-[12.8px]  3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:p-[20px] p-[16px] mx-auto 3xl:mt-[24px] mt-[19.2px] hover:scale-110 transition-all duration-500 ${
          curViewRoleItemsIndex === minViewRoleItemsIndex && "opacity-0"
        }`}
        onClick={slideUp}
      />
      <div
        className="text-center 3xl:text-[28px] text-[22.4px] 3xl:leading-[60px] leading-[48px] duration-500 transition-all"
        ref={slideRef}
      >
        <div className="3xl:h-[500px] h-[400px] 3xl:mt-[10px] mt-[8px]">
          <p>어느날, 바다의 용왕이 이유 모를 큰 병에 걸리고 말았다.</p>
          <p>용궁에는 용왕의 소문난 충신 자라가 있었는데..</p>
          <p>자라는 용왕을 위해 명약이라 소문난 토끼의 간을 찾아나선다.</p>
          <img className="m-auto 3xl:h-[220px] h-[176px] 3xl:mt-[20px] mt-[16px]" src={storyImg1} />
        </div>
        <div className="3xl:h-[500px] h-[400px]">
          <p>토끼들이 배를 타고 여행을 떠나는 날,</p>
          <p>자라는 토끼들이 시력이 나쁜 점을 이용하여 변장 후 잠입하는데..!</p>
          <img className="m-auto 3xl:h-[220px] h-[176px] 3xl:mt-[30px] mt-[24px]" src={storyImg2} />
        </div>
        <div className="3xl:h-[500px] h-[400px]">
          <p>자라가 배에 숨어들었다는 소식을 듣게 된 토끼들!</p>
          <p>그들은 과연 숨은 자라를 찾아내고 무사히 배에서 내릴 수 있을까?</p>
          <p>자라는 토끼들 사이에서 살아남아 간을 용왕에게 가져갈 수 있을까?</p>
          <img className="m-auto 3xl:h-[220px] h-[176px] 3xl:mt-[0px] mt-[0px]" src={storyImg3} />
        </div>
      </div>
    </>
  );
};

export default StoryContent;

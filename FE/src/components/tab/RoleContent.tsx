import RoleItem from "./RoleItem";
import { JOB_MAP } from "../../constants/common/JobMap";
import upArrow from "../../assets/img/home/upArrow.png";
import downArrow from "../../assets/img/home/downArrow.png";
import { useState, useEffect, useRef } from "react";
import React from "react";
import { SFX, playSFX } from "../../utils/audioManager";

const RoleContent = () => {
  const [curViewRoleItemsIndex, setCurViewRoleItemsIndex] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const minViewRoleItemsIndex = 0;
  const maxViewRoleItemsIndex = 1;
  const slideDown = () => {
    playSFX(SFX.SWAP);
    setCurViewRoleItemsIndex((prevSlide) => prevSlide + 1);
  };
  const slideUp = () => {
    playSFX(SFX.SWAP);
    setCurViewRoleItemsIndex((prevSlide) => prevSlide - 1);
  };
  useEffect(() => {
    if (slideRef.current) slideRef.current.style.transform = `translateY(-${curViewRoleItemsIndex * 56}%)`;
  }, [curViewRoleItemsIndex]);

  const renderViewRoleItems = () => {
    return JOB_MAP.map((roleItemInfo, index) => {
      return (
        <React.Fragment key={index}>
          {index > 0 && (
            <RoleItem
              name={roleItemInfo.name}
              info={roleItemInfo.info}
              info2={roleItemInfo.info2}
              imgPath={roleItemInfo.imgColor}
              color={roleItemInfo.color}
            />
          )}
        </React.Fragment>
      );
    });
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {curViewRoleItemsIndex === minViewRoleItemsIndex && (
        <img
          src={downArrow}
          alt=""
          className="z-10 absolute 3xl:bottom-[16px] bottom-[12.8px] 3xl:right-[16px] right-[12.8px]  3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:p-[20px] p-[16px] mx-auto 3xl:mt-[24px] mt-[19.2px] hover:scale-110 transition-all duration-500 animate-bounce"
          onClick={slideDown}
        />
      )}
      {curViewRoleItemsIndex === maxViewRoleItemsIndex && (
        <img
          src={upArrow}
          alt=""
          className="z-10 absolute 3xl:bottom-[16px] bottom-[12.8px] 3xl:right-[16px] right-[12.8px]  3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px] 3xl:p-[20px] p-[16px] mx-auto 3xl:mt-[24px] mt-[19.2px] hover:scale-110 transition-all duration-500 animate-bounce-up"
          onClick={slideUp}
        />
      )}
      <div ref={slideRef} className="duration-500 transition-all">
        {renderViewRoleItems()}
      </div>
    </div>
  );
};
export default RoleContent;

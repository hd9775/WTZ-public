import { BACK_COLOR_MAP } from "../../constants/common/ColorMap";
import { SFX, playSFX } from "../../utils/audioManager";

interface ShopCharacterColorProps {
  color: number;
  setColor: (num: number) => void;
}

export const ShopCharacterColor = ({ color, setColor }: ShopCharacterColorProps) => {
  return (
    <div className="flex flex-wrap w-[100%] justify-center">
      {BACK_COLOR_MAP.map((item, index) => {
        return (
          <div
            className={`3xl:w-[100px] hover:scale-125 duration-500 w-[80px] 3xl:h-[100px] h-[80px] 3xl:mx-[30px] mx-[24px] 3xl:mb-[30px] mb-[24px] ${item}  border-solid 3xl:border-[8px] border-[6.4px] rounded-md ${
              color === index && `scale-125`
            }`}
            onClick={() => {
              setColor(index);
              playSFX(SFX.TAB);
            }}
            key={index}
          />
        );
      })}
    </div>
  );
};

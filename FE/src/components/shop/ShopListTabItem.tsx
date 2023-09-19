import face from "../../assets/img/shop/face.png";
import cap from "../../assets/img/shop/cap.png";
import clothing from "../../assets/img/shop/cloth.png";
import { SFX, playSFX } from "../../utils/audioManager";

interface ShopListTabItemProps {
  index: number;
  selectTab: number;
  setSelectTab: (num: number) => void;
}

export const ShopListTabItem = ({ index, selectTab, setSelectTab }: ShopListTabItemProps) => {
  const tabImg = [cap, clothing, face];
  return (
    <>
      <div
        className={`3xl:w-[240px] hover:bg-yellow-400 duration-500 w-[192px] 3xl:h-[100px] h-[80px] flex justify-center items-center 3xl:text-[32px] text-[25.6px] font-bold  rounded-2xl 3xl:mx-[40px] mx-[32px] border-solid border-white 3xl:border-[8px] border-[6.4px] shadow-black shadow-lg ${
          index === selectTab ? "bg-yellow-400" : "bg-gray-500"
        }`}
        onClick={() => {
          setSelectTab(index);
          playSFX(SFX.TAB);
        }}
      >
        <img src={tabImg[index]} className="h-full " />
      </div>
    </>
  );
};

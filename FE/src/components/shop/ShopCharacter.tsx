import { useState } from "react";
import { ShopCharacterColor } from "./ShopCharacterColor";
import { ShopCharacterPreview } from "./ShopCharacterPreview";
import { SelectedItemsType } from "../../types/ShopType";

interface ShopCharacterProps {
  selectedItems: SelectedItemsType;
}

export const ShopCharacter = ({ selectedItems }: ShopCharacterProps) => {
  const [color, setColor] = useState(0);
  return (
    <>
      <div className="relative w-[40%] h-full flex flex-col justify-center items-center 3xl:py-[40px] py-[32px]">
        <ShopCharacterPreview color={color} selectedItems={selectedItems} />
        <ShopCharacterColor color={color} setColor={setColor} />
      </div>
    </>
  );
};

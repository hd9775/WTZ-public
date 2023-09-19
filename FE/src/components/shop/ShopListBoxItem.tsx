import coin from "../../assets/img/shop/coin.png";
import { ShopItemType, SelectedItemsType } from "../../types/ShopType";
import { SFX, playSFX } from "../../utils/audioManager";

interface ShopListBoxItemProps {
  item: ShopItemType;
  selectedItems: SelectedItemsType;
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedItemsType>>;
  category: number;
  nothingSelectedItem: ShopItemType;
}

export const ShopListBoxItem = ({
  item,
  category,
  selectedItems,
  nothingSelectedItem,
  setSelectedItems,
}: ShopListBoxItemProps) => {
  const onToggleItem = () => {
    setSelectedItems((prevItems) => {
      const newItems = [...prevItems];
      const alreadySelected = newItems.some(({ itemSeq }) => itemSeq === item.itemSeq);
      if (alreadySelected) {
        playSFX(SFX.UNSELECT);
        newItems[category] = nothingSelectedItem;
      } else {
        playSFX(SFX.SELECT);
        newItems[category] = item;
      }
      return newItems as SelectedItemsType;
    });
  };
  const isSelected = item.itemSeq === selectedItems[category]?.itemSeq;

  return (
    <div
      className={` hover:border-yellow-400 duration-500 3xl:w-[240px] w-[192px] 3xl:h-[240px] h-[192px] 3xl:my-[15px] my-[12px] flex flex-wrap 3xl:ml-[36px] ml-[28.8px] border-solid 3xl:border-[8px] border-[6.4px] rounded-xl ${
        isSelected && "border-yellow-400 3xl:border-[8px] border-[6.4px]"
      }`}
      onClick={onToggleItem}
    >
      <div
        className={`w-[100%] h-[80%] rounded-t-md ${
          item.sold ? (isSelected ? "bg-yellow-100" : "bg-green-100") : "bg-gray-400"
        }`}
      >
        <img src={`data:image/png;base64,${item.image}`} />
      </div>
      {!item.sold ? (
        <div className={`flex justify-center w-full bg-black items-center`}>
          <img className="w-auto 3xl:h-[40px] h-[32px]" src={coin} />

          <p className="text-yellow-400 font-bold text-center 3xl:text-[28px] text-[22.4px] rounded-b-md">
            {item.price}
          </p>
        </div>
      ) : (
        <div className="flex justify-center w-full bg-black items-center">
          <p
            className={`${
              isSelected ? "text-yellow-100" : "text-green-100"
            } font-bold text-center 3xl:text-[28px] text-[22.4px] rounded-b-md`}
          >
            {isSelected ? "장착 중" : "보유 중"}
          </p>
        </div>
      )}
    </div>
  );
};

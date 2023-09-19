import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import { SelectedItemsType } from "../../types/ShopType";
import { SHOP_ITEM_CATEGORY_MAP } from "../../constants/shop/ShopItemCategoryMap";

interface ShopCharacterPreviewProps {
  selectedItems: SelectedItemsType;
  color: number;
}

export const ShopCharacterPreview = ({ color, selectedItems }: ShopCharacterPreviewProps) => {
  return (
    <div className="relative w-full h-full flex justify-center">
      <img
        src={RABBIT_MAP[color].IMG[RABBIT_STATE_MAP.STAND]}
        className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
      />
      {selectedItems[SHOP_ITEM_CATEGORY_MAP.CLOTHING].image && (
        <img
          src={`
          data:image/png;base64,${selectedItems[SHOP_ITEM_CATEGORY_MAP.CLOTHING]?.image}
          `}
          className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
        />
      )}
      {selectedItems[SHOP_ITEM_CATEGORY_MAP.FACE].image && (
        <img
          src={`
          data:image/png;base64,${selectedItems[SHOP_ITEM_CATEGORY_MAP.FACE]?.image}
          `}
          className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
        />
      )}
      {selectedItems[SHOP_ITEM_CATEGORY_MAP.CAP].image && (
        <img
          src={`
          data:image/png;base64,${selectedItems[SHOP_ITEM_CATEGORY_MAP.CAP]?.image}
          `}
          className="absolute 3xl:w-[600px] w-[480px] 3xl:h-[600px] h-[480px]"
        />
      )}
    </div>
  );
};

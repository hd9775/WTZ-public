import { ShopCharacter } from "../components/shop/ShopCharacter";
import ShopList from "../components/shop/ShopList";
import { ShopLayout } from "../layouts/ShopLayout";
import { useEffect, useState } from "react";
import { ShopAllItemType } from "../types/ShopType";
import { useShopApiCall } from "../api/axios/useShopApiCall";
import { SelectedItemsType, ShopItemType } from "../types/ShopType";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { usePreventGoBackShop } from "../hooks/usePreventGoBackShop";

export const Shop = () => {
  usePreventGoBackShop();
  useFetchAccessToken();

  const defaultSelectedItem: ShopItemType = {
    itemSeq: 0,
    price: 0,
    image: "",
    sold: false,
  };

  const [selectedItems, setSelectedItems] = useState<SelectedItemsType>([
    defaultSelectedItem,
    defaultSelectedItem,
    defaultSelectedItem,
  ]);

  const { getShopAllItem, getEquippedItems } = useShopApiCall();

  const [shopAllItem, setShopAllItem] = useState<ShopAllItemType>({
    capList: [],
    faceList: [],
    clothingList: [],
  });

  useEffect(() => {
    (async () => {
      const { capList, faceList, clothingList } = await getShopAllItem();
      setShopAllItem({ capList, faceList, clothingList });
      const { equippedCap, equippedFace, equippedClothing } = await getEquippedItems();
      setSelectedItems([equippedCap || capList[0], equippedFace || faceList[0], equippedClothing || clothingList[0]]);
    })();
  }, []);

  return (
    <ShopLayout>
      <ShopCharacter selectedItems={selectedItems} />
      <ShopList
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        shopAllItem={shopAllItem}
        setShopAllItem={setShopAllItem}
      />
    </ShopLayout>
  );
};

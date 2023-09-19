export interface ShopAllItemType {
  capList: ShopItemType[];
  faceList: ShopItemType[];
  clothingList: ShopItemType[];
}

export type SelectedItemsType = [ShopItemType, ShopItemType, ShopItemType];

export interface ShopItemType {
  itemSeq: number;
  price: number;
  image: string;
  sold: boolean;
}

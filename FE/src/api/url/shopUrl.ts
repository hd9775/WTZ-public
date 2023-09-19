import { baseUrl } from "./baseUrl";

export default {
  getCapList: () => `${baseUrl}/shop/cap`,
  getFaceList: () => `${baseUrl}/shop/face`,
  getClothingList: () => `${baseUrl}/shop/clothing`,
  buyItems: () => `${baseUrl}/shop/buy`,
  getCoin: () => `${baseUrl}/point`,
  getEquipped: () => `${baseUrl}/shop/equipped`,
  equip: () => `${baseUrl}/shop/equipped`,
  getResultCoin: (gameCode: string) => `${baseUrl}/point/${gameCode}`,
};

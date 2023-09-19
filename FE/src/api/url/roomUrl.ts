import { baseUrl } from "./baseUrl";

export default {
  baseRoomUrl: () => `${baseUrl}/rooms`,
  searchRoomUrl: (roomCode: string) => `${baseUrl}/rooms/search/${roomCode}`,
  deleteRoomUrl: (roomCode: string) => `${baseUrl}/rooms/${roomCode}`,
  checkRoomUrl: (roomCode: string) => `${baseUrl}/rooms/${roomCode}`,
};

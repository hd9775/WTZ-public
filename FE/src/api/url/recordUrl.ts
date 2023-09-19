import { baseUrl } from "./baseUrl";

export default {
  recent: () => `${baseUrl}/record/recent`,
  totalWinRate: () => `${baseUrl}/record/winRate`,
  jobWinRate: () => `${baseUrl}/record/jobWinRate`,
};

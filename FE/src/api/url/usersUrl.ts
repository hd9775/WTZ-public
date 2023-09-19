import { baseUrl } from "./baseUrl";

export default {
  signUp: () => `${baseUrl}/users/join`,
  sendEmailVerificationCodeWhenSignup: () => `${baseUrl}/users/email/confirm`,
  sendEmailVerificationCodeWhenResetPw: () => `${baseUrl}/users/email`,
  login: () => `${baseUrl}/users/login`,
  logout: () => `${baseUrl}/users/logout`,
  resetPw: () => `${baseUrl}/users/reset-password`,
  changePw: () => `${baseUrl}/users/change-password`,
  delUser: () => `${baseUrl}/users/`,
  getMyInfo: () => `${baseUrl}/users/me`,
  reissueAccessToken: () => `${baseUrl}/users/refresh-token`,
  getLevel: () => `${baseUrl}/level`,
  getResultLevel: (gameCode: string) => `${baseUrl}/level/${gameCode}`,
};

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateNickname = (nickname: string) => {
  const re = /^[a-zA-Z0-9가-힣]{1,8}$/;
  return re.test(nickname);
};

export const validatePassword = (password: string) => {
  const re = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
  return re.test(password);
};

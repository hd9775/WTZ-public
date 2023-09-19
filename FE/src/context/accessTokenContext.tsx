import { createContext, useContext, useState, useMemo } from "react";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

interface AccessTokenContextProps {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  userSeq: number;
  setUserSeq: (userSeq: number) => void;
  nickname: string;
  setNickname: (nickname: string) => void;
}

export const AccessTokenContext = createContext<AccessTokenContextProps>({
  accessToken: "",
  setAccessToken: (_: string) => {},
  userSeq: 0,
  setUserSeq: (_: number) => {},
  nickname: "",
  setNickname: (_: string) => {},
});

export function AccessTokenProvider({ children }: LayoutChildrenProps) {
  const [accessToken, setAccessToken] = useState<string>("");
  const [userSeq, setUserSeq] = useState<number>(0);
  const [nickname, setNickname] = useState<string>("");
  // useMemo로 캐싱하지 않으면 value가 바뀔 때마다 state를 사용하는 모든 컴포넌트가 매번 리렌더링됨
  const value = useMemo(
    () => ({ accessToken, setAccessToken, userSeq, setUserSeq, nickname, setNickname }),
    [accessToken, setAccessToken, userSeq, setUserSeq, nickname, setNickname]
  );

  return <AccessTokenContext.Provider value={value}>{children}</AccessTokenContext.Provider>;
}

export function useAccessTokenState() {
  const context = useContext(AccessTokenContext);
  if (!context) {
    throw new Error("Cannot find AccessTokenProvider");
  }
  return context;
}

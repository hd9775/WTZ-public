import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

export const MainLayout = ({ children }: LayoutChildrenProps) => {
  return <div className="w-[100vw] h-[100vh] bg-black flex justify-center items-center">{children}</div>;
};

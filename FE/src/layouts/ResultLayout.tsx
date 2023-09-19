import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

export const ResultLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div
      className={`relative 3xl:w-[1920px] w-[1536px] 3xl:h-[942px] h-[754px] flex justify-center items-center bg-cover transition ease-in-out duration-1000 animate-fade-in`}
    >
      {children}
    </div>
  );
};

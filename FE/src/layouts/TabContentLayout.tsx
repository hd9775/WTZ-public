import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const TabContentLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <div className="w-full h-full 3xl:border-[8px] border-[6.4px] border-white text-white 3xl:text-[28px] text-[22.4px] 3xl:p-[48px] p-[38.4px] bg-black  overflow-hidden">
      {children}
    </div>
  );
};
export default TabContentLayout;

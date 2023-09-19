import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import { motion } from "framer-motion";
import { BGM, playBGM } from "../utils/audioManager";

export const ShopLayout = ({ children }: LayoutChildrenProps) => {
  playBGM(BGM.SHOP);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 10 }}>
      <div
        className={`relative 3xl:w-[1920px] w-[1536px] 3xl:h-[970px] h-[754px] overflow-hidden flex bg-gradient-to-t from-black from-0% font-bold to-gray-700`}
      >
        {children}
      </div>
    </motion.div>
  );
};

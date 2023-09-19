import { motion } from "framer-motion";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";

const MotionLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      {children}
    </motion.div>
  );
};
export default MotionLayout;

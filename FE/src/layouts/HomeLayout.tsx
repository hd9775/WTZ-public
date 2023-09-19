import { HomeEye } from "../components/home/HomeEye";
import { LayoutChildrenProps } from "../types/LayoutChildrenProps";
import mainRabbit from "../assets/img/home/RabbitOnly.png";
import mainTitle from "../assets/img/home/WhoIsZARA.gif";
import MotionLayout from "./MotionLayout";

const HomeLayout = ({ children }: LayoutChildrenProps) => {
  return (
    <MotionLayout>
      <div className="3xl:w-[1920px] w-[1536px] 3xl:h-[942px] h-[754px] bg-black flex justify-center items-center overflow-hidden">
        <div className="flex flex-col w-full h-full justify-start 3xl:mt-[100px] mt-[80px] 3xl:ml-[40px] ml-[30px]">
          <img
            src={mainTitle}
            className="3xl:w-[720px] w-[560px] h-auto ml-[20px] mt-[10px] transition duration-1000 animate-slide-left"
          />
          <div className="3xl:mt-[120px] mt-[100px] 3xl:ml-[140px] ml-[110px]">{children}</div>
        </div>
        <div className="relative 3xl:min-w-[860px] min-w-[660px] mr-[40px] flex justify-end transition duration-1000 animate-fade-out-in">
          <HomeEye />
          <img src={mainRabbit} className="h-full" />
        </div>
      </div>
    </MotionLayout>
  );
};

export default HomeLayout;

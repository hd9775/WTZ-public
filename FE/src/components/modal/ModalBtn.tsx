import { debounce } from "lodash";
import loginBtn from "../../assets/img/home/loginBtn2.png";
interface ModalBtnProps {
  text: string;
  btnWidth: number;
  btnHeight: number;
  isBold?: boolean;
  fontSize?: number;
  clickBtnHandler: () => void;
}

export const ModalBtn = ({ text, btnWidth, btnHeight, isBold, fontSize, clickBtnHandler }: ModalBtnProps) => {
  return (
    <button
      className={`text-black rounded-lg transition-colors bg-cover duration-500 ${
        isBold ? "font-bold" : ""
      } mx-2 3xl:text-[24px] text-[19.2px]`}
      style={{
        width: btnWidth,
        fontSize: `${fontSize}px`,
        height: `${btnHeight}px`,
        backgroundImage: `url("${loginBtn}")`,
      }}
      onClick={debounce(clickBtnHandler, 500)}
    >
      {text}
    </button>
  );
};

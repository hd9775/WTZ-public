interface InputFormProps {
  label: string;
  value: string;
  handleChange: (newValue: string) => void;
  isTypePassword?: boolean;
  onKeyUpEvent?: () => void;
}

export const InputForm = ({ label, value, handleChange, isTypePassword, onKeyUpEvent }: InputFormProps) => {
  return (
    <>
      <div className="3xl:my-[10px] my-[8px] w-[100%]">
        <label className="3xl:ml-[4px] ml-[3.2px] 3xl:text-[24px] text-[19.2px]">{label}</label>
        <input
          type={isTypePassword ? "password" : "text"}
          className=" 3xl:h-[40px] h-[32px] border-solid border-black 3xl:border-[2px] border-[1.6px] w-full 3xl:text-[24px] text-[19.2px] 3xl:mt-[5px] mt-[4px] px-[10px] 3xl:px-[8px]"
          onChange={(e) => handleChange(e.target.value)}
          value={value}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              onKeyUpEvent && onKeyUpEvent();
            }
          }}
        />
      </div>
    </>
  );
};

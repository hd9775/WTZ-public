interface ProfileInputFormProps {
  text: string;
  handleChange: (newValue: string) => void;
  value: string;
}

export const ProfileInputForm = ({ text, handleChange, value }: ProfileInputFormProps) => {
  return (
    <>
      <div className="w-full 3xl:h-[80px] h-[64px] flex justify-between text-white 3xl:mb-[40px] mb-[32px]">
        <p className="3xl:w-[360px] w-[288px] text-center">{text}</p>
        <input
          type="password"
          className="3xl:w-[520px] w-[416px] text-black 3xl:p-[20px] p-[16px]"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          minLength={2}
          maxLength={16}
        />
      </div>
    </>
  );
};

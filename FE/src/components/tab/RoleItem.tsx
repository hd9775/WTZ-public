interface RoleItemProps {
  name: string;
  info: string;
  info2: string;
  imgPath: string;
  color: string;
}
const RoleItem = ({ name, info, info2, imgPath, color }: RoleItemProps) => {
  return (
    <div className="flex items-center 3xl:mb-[32px] mb-[25.6px] 3xl:h-[84px] h-[67.2px]">
      <img src={imgPath} className="3xl:w-[80px] w-[64px] 3xl:h-[80px] h-[64px]" />
      <p
        className={`3xl:mx-[40px] mx-[32px] 3xl:w-[120px] w-[96px] text-center 3xl:text-[28px] text-[22.4px] font-bold ${color}`}
      >
        {name}
      </p>
      <div className="3xl:text-[24px] text-[19.2px]">
        <p>{info}</p>
        <p>{info2}</p>
      </div>
    </div>
  );
};
export default RoleItem;

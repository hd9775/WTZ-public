import cautionImg from "../../assets/img/home/cautionImg.png";

const CautionContent = () => {
  return (
    <div className="3xl:leading-[100px] leading-[80px] 3xl:mx-[20px] mx-[16px] 3xl:text-[30px] text-[24px]">
      <p>본 서비스는 PC 환경을 기준으로 제작되었으며,</p>
      <p>1920*1080 해상도, 100% 또는 125% 배율에 최적화 되어있습니다.</p>
      <p>최신 버전의 크롬 브라우저를 권장합니다.</p>
      <img
        className="absolute 3xl:right-[40px] right-[32px] 3xl:bottom-[-40px] bottom-[-32px] 3xl:w-[360px] w-[288px] 3xl:mt-[-80px] mt-[-64px] mx-auto"
        src={cautionImg}
      />
    </div>
  );
};
export default CautionContent;

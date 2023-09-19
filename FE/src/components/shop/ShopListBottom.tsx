import coinImg from "../../assets/img/shop/coin.png";
import reset from "../../assets/img/shop/reset.png";

interface ShopListBottomProps {
  coin: number;
  cost: number;
  resetSelectedItems: () => void;
  onBuyRequest: () => void;
}

export const ShopListBottom = ({ coin, cost, resetSelectedItems, onBuyRequest }: ShopListBottomProps) => {
  return (
    <div className="flex w-full items-center 3xl:px-[20px] px-[16px] 3xl:pt-[10px] pt-[8px]">
      <div className="3xl:w-[700px] w-[560px] 3xl:h-[160px] h-[128px] flex 3xl:text-[40px] text-[32px] text-yellow-300 3xl:ml-[5px] ml-[4px]">
        <div className="flex items-center flex-wrap justify-center 3xl:min-w-[180px] min-w-[144px]">
          <p className="text-green-200 3xl:text-[35px] text-[28px]">보유 금액</p>
          <div className="flex items-center">
            <img src={coinImg} className="3xl:w-[60px] w-[48px]" />
            <p className="3xl:pr-[20px] pr-[16px]">{coin}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="3xl:text-[80px] text-[64px] 3xl:mx-[10px] mx-[8px] font-bold text-white">-</p>
        </div>
        <div className="flex items-center flex-wrap justify-center 3xl:min-w-[180px] min-w-[144px]">
          <p className="text-green-200 3xl:text-[35px] text-[28px]">총 비용 </p>
          <div className="flex items-center">
            <img src={coinImg} className="3xl:w-[60px] w-[48px]" />
            <p className="3xl:pr-[20px] pr-[16px]">{cost}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="3xl:text-[80px] text-[64px] 3xl:mx-[10px] mx-[8px] font-bold text-white">=</p>
        </div>
        <div className="flex items-center flex-wrap justify-center 3xl:min-w-[180px] min-w-[144px]">
          <p className="text-green-200 3xl:text-[35px] text-[28px]">남은 금액</p>
          <div className="flex items-center">
            <img src={coinImg} className="3xl:w-[60px] w-[48px]" />
            <p className="3xl:pr-[20px] pr-[16px]"> {coin - cost}</p>
          </div>
        </div>
      </div>
      <div
        className="3xl:w-[180px] w-[144px] hover:scale-125 duration-500 3xl:h-[130px] h-[104px] border-solid 3xl:border-[10px] border-[8px] border-white flex justify-center items-center 3xl:text-[48px] text-[38.4px] text-black bg-yellow-200 rounded-2xl 3xl:mx-[40px] mx-[32px] "
        onClick={onBuyRequest}
      >
        <p className="">구매</p>
      </div>
      <div className="3xl:w-[120px] w-[96px] hover:scale-125 duration-500 bg-green-200 border-white border-solid 3xl:border-[10px] border-[8px] rounded-3xl flex justify-center items-center 3xl:p-[10px] p-[8px] ">
        <img src={reset} onClick={resetSelectedItems} />
      </div>
    </div>
  );
};

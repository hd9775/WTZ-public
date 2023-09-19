import TabBtn from "../tab/TabBtn";
import Rodal from "rodal";
import { FormModalProps } from "../../types/FormModalProps";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import { SHOW_TAB_TYPE } from "../../constants/home/ShowTabType";
import TabContentLayout from "../../layouts/TabContentLayout";
import { useState } from "react";
import StoryContent from "./../tab/StoryContent";
import RuleContent from "./../tab/RuleContent";
import RoleContent from "./../tab/RoleContent";
import CautionContent from "./../tab/CautionContent";

const GameDescription = ({ curModalType, showModalHandler }: FormModalProps) => {
  const [curTabType, setCurTabType] = useState<number>(SHOW_TAB_TYPE.STORY);
  const renderTabContent = () => {
    if (curTabType === SHOW_TAB_TYPE.STORY) return <StoryContent />;
    else if (curTabType === SHOW_TAB_TYPE.RULE) return <RuleContent />;
    else if (curTabType === SHOW_TAB_TYPE.ROLE) return <RoleContent />;
    else if (curTabType === SHOW_TAB_TYPE.CAUTION) return <CautionContent />;
  };

  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.GAME_DESCRIPTION}
      onClose={() => showModalHandler(Modal_Category_Map.NONE)}
      enterAnimation="zoom"
      leaveAnimation="door"
      duration={500}
      width={1}
      height={1}
      closeOnEsc={true}
      showCloseButton={false}
      customStyles={{
        backgroundColor: "rgba(0, 0, 0, 0)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "none",
      }}
    >
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[1100px] w-[880px] 3xl:h-[560px] h-[448px]">
        <div className="flex">
          {Object.values(SHOW_TAB_TYPE).map((tabType) => {
            return (
              <TabBtn key={tabType} tabType={tabType} isActive={curTabType === tabType} setCurTabType={setCurTabType} />
            );
          })}
        </div>
        <TabContentLayout>{renderTabContent()}</TabContentLayout>
      </div>
    </Rodal>
  );
};
export default GameDescription;

import Rodal from "rodal";
import { FormModalProps } from "../../types/FormModalProps";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import camMicPermission from "../../assets/img/home/camMicPermission.gif";

const CamMicPermissionModal = ({ curModalType, showModalHandler }: FormModalProps) => {
  return (
    <Rodal
      visible={curModalType === Modal_Category_Map.PERMISSION_DENIED}
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
      <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 3xl:w-[1800px] w-[1440px] bg-transparent border-solid border-white 3xl:border-[10px] border-[8px]">
        <img src={camMicPermission} className="w-full" />
      </div>
    </Rodal>
  );
};

export default CamMicPermissionModal;

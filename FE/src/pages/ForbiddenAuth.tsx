import forbiddenAuthBg from "../assets/img/common/forbiddenAuthBg.png";
import MotionLayout from "../layouts/MotionLayout";
const ForbiddenAuth = () => {
  return (
    <MotionLayout>
      <div
        className="w-screen h-screen bg-contain bg-black  bg-no-repeat  bg-center"
        style={{ backgroundImage: `url("${forbiddenAuthBg}")` }}
      >
        ForbiddenAuth
      </div>
    </MotionLayout>
  );
};
export default ForbiddenAuth;

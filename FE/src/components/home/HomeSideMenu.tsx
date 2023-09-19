import { HomeBtn } from "./HomeBtn";
import { Modal_Category_Map } from "../../constants/home/ModalCategoryMap";
import { useNavigate } from "react-router-dom";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { useUsersApiCall } from "../../api/axios/useUsersApiCall";
import { SFX, playSFX } from "../../utils/audioManager";
import { useWebSocket } from "../../context/socketContext";
import { toast } from "react-toastify";

interface HomeSideMenuProps {
  showModalHandler: (type: number) => void;
}

const HomeSideMenu = ({ showModalHandler }: HomeSideMenuProps) => {
  const { logout } = useUsersApiCall();
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useAccessTokenState();
  const { client } = useWebSocket();

  const onLogout = async () => {
    await logout();
    setAccessToken("");
    client?.deactivate();
  };

  const goToLobby = async () => {
    const cameraPermission = await navigator.permissions.query({ name: "camera" as PermissionName });
    const microphonePermission = await navigator.permissions.query({ name: "microphone" as PermissionName });

    if (cameraPermission.state === "granted" && microphonePermission.state === "granted") {
      navigate("/lobby");
      return;
    }
    requestCameraAndMicrophonePermission();
  };

  const requestCameraAndMicrophonePermission = () => {
    toast.info("카메라와 마이크 권한을 허용해주세요.", { position: "top-center" });
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(() => {
        navigate("/lobby");
      })
      .catch(() => {
        showModalHandler(Modal_Category_Map.PERMISSION_DENIED);
      });
  };

  return accessToken ? (
    <aside className="relative" onClick={() => playSFX(SFX.CLICK)}>
      <HomeBtn text="로비입장" index={3} onClick={goToLobby} />
      <HomeBtn text="로그아웃" index={4} onClick={onLogout} />
      <HomeBtn text="게임설명" index={5} onClick={() => showModalHandler(Modal_Category_Map.GAME_DESCRIPTION)} />
    </aside>
  ) : (
    <aside className="relative" onClick={() => playSFX(SFX.CLICK)}>
      <HomeBtn text="로그인" index={0} onClick={() => showModalHandler(Modal_Category_Map.LOGIN)} />
      <HomeBtn text="회원가입" index={1} onClick={() => showModalHandler(Modal_Category_Map.SIGNUP)} />
      <HomeBtn text="게임설명" index={2} onClick={() => showModalHandler(Modal_Category_Map.GAME_DESCRIPTION)} />
    </aside>
  );
};

export default HomeSideMenu;

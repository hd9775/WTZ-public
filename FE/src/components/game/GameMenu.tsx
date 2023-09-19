import { useState, useEffect } from "react";
import gameMenuCameraOn from "../../assets/img/game/gameMenuCameraOn.png";
import gameMenuMicOn from "../../assets/img/game/gameMenuMicOn.png";
import gameMenuInfo from "../../assets/img/game/gameMenuInfo.png";
import gameMenuSpeakerOn from "../../assets/img/game/gameMenuSpeakerOn.png";
import gameMenuSpeakerOff from "../../assets/img/game/gameMenuSpeakerOff.png";
import gameMenuMicOff from "../../assets/img/game/gameMenuMicOff.png";
import gameMenuCameraOff from "../../assets/img/game/gameMenuCameraOff.png";
import { BGM, SFX, createBGMInstance, playSFX } from "../../utils/audioManager";

interface GameMenuProps {
  onSetInfoOn: () => void;
  setMyCamera: (cameraOn: boolean) => void;
  setMyMic: (micOn: boolean) => void;
  setUserVideo: (videoOn: boolean) => void;
  setUserAudio: (videoOn: boolean) => void;
  setAmIVoted: (amIVoted: boolean) => void;
  nowTime: string;
  amIDead: boolean;
  amIZara: boolean;
  amIVoted: boolean;
}

export const GameMenu = ({
  onSetInfoOn,
  setMyCamera,
  setMyMic,
  setUserVideo,
  setUserAudio,
  setAmIVoted,
  nowTime,
  amIDead,
  amIZara,
  amIVoted,
}: GameMenuProps) => {
  const [soundOn, setSoundOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const canIChangeSetting = (): boolean => {
    switch (nowTime) {
      case "DAY": // 낮일때, 죽은 사람 제외 모두 카메라 켜기 가능
      case "VOTE":
        if (amIDead) {
          return false;
        }
        return true;
      case "VOTE_RESULT": // 투표 결과 나올 때 투표당한 사람만 카메라 켜기 가능
        if (amIVoted) {
          return true;
        }
        return false;
      case "NIGHT": // 밤에 자라만 카메라 켜기 가능
        if (amIDead) {
          return false;
        }
        if (amIZara) {
          return true;
        }
        return false;
      case "NIGHT_RESULT": // 밤 결과 나올 때 모두 카메라 끄기
        return false;
      default:
        console.error("unknown data - nowTime: ", nowTime);
        break;
    }
    return true;
  };

  const onClickSoundOn = () => {
    if (!amIDead && !canIChangeSetting() && nowTime !== "VOTE_RESULT") {
      playSFX(SFX.ERROR);
      return;
    }
    playSFX(SFX.CLICK);
    setUserAudio(!soundOn);
    setSoundOn(!soundOn);
  };

  const onClickCameraOn = () => {
    if (!canIChangeSetting()) {
      playSFX(SFX.ERROR);
      return;
    }
    playSFX(SFX.CLICK);
    setMyMic(!micOn);
    setMicOn(!micOn);
  };

  const onClickMicOn = () => {
    if (!canIChangeSetting()) {
      playSFX(SFX.ERROR);
      return;
    }
    playSFX(SFX.CLICK);
    setMyCamera(!cameraOn);
    setCameraOn(!cameraOn);
  };

  const setMyCameraOn = (cameraMicOn: boolean) => {
    setMyCamera(cameraMicOn);
    setCameraOn(cameraMicOn);
  };

  const setMyMicOn = (cameraMicOn: boolean) => {
    setMyMic(cameraMicOn);
    setMicOn(cameraMicOn);
  };

  const setMyCameraMicOn = (cameraMicOn: boolean) => {
    setMyCamera(cameraMicOn);
    setCameraOn(cameraMicOn);
    setMyMic(cameraMicOn);
    setMicOn(cameraMicOn);
  };

  useEffect(() => {
    let bgm: HTMLAudioElement;
    switch (nowTime) {
      case "DAY": // 낮
      case "VOTE":
        bgm = createBGMInstance(BGM.DAY);
        setAmIVoted(false); // 투표 결과 리셋
        setUserVideo(true); // 다른 유저 영상 보이게 하기
        setUserAudio(true); // 유저 사운드 켜기
        setSoundOn(true);
        if (amIDead) {
          setMyCameraMicOn(false); // 죽었으면 카메라 마이크 끄기
          break;
        }
        setMyCameraOn(true);
        setMyMicOn(false);
        break;
      case "VOTE_RESULT": // 투표 결과 나올 때
        bgm = createBGMInstance(BGM.RESULT);
        setUserVideo(true); // 다른 유저 영상 보이게 하기
        setUserAudio(soundOn); // 유저 사운드 켜기
        setSoundOn(soundOn);
        if (amIVoted) {
          setMyCameraOn(true);
          setMyMicOn(false);
          break;
        }
        setMyCameraOn(false);
        setMyMicOn(false);
        break;
      case "NIGHT": // 밤
        bgm = createBGMInstance(BGM.NIGHT);
        if (amIDead) {
          // 죽었으면
          setUserVideo(true); // 다른 사람 영상 볼 수 있음
          setUserAudio(soundOn); // 유저 사운드 켜기
          setSoundOn(soundOn);
          setMyCameraMicOn(false); // 내 카메라 마이크 끄기
          break;
        }
        if (amIZara) {
          // 내가 자라이면
          setUserVideo(true); // 다른 사람 영상 볼 수 있음
          setUserAudio(soundOn); // 유저 사운드 켜기
          setSoundOn(soundOn);
          setMyCameraOn(true);
          setMyMicOn(false);
          break;
        }
        // 자라가 아니면 내 카메라 마이크 끄고 다른사람 영상 소리 못 보고 들음
        setUserVideo(false);
        setUserAudio(false);
        setSoundOn(false);
        setMyCameraMicOn(false);
        break;
      case "NIGHT_RESULT":
        bgm = createBGMInstance(BGM.NIGHT);
        // 밤 결과 나올 때 모든 유저 카메라 마이크 끄고 영상 소리 못 보고 들음
        setUserVideo(false);
        setUserAudio(false);
        setSoundOn(false);
        setMyCameraMicOn(false);
        break;
      default:
        break;
    }

    return () => {
      if (bgm) {
        bgm.pause();
        bgm.src = "";
      }
    };
  }, [nowTime]);

  return (
    <div className="absolute right-[20px] h-full flex items-center">
      <div className="flex flex-col justify-around h-[44%]">
        <img
          className="w-[64px] h-[64px] "
          src={gameMenuInfo}
          onClick={() => {
            onSetInfoOn();
            playSFX(SFX.CLICK);
          }}
        />
        <img
          className="w-[64px] h-[64px] "
          src={soundOn ? gameMenuSpeakerOn : gameMenuSpeakerOff}
          onClick={onClickSoundOn}
        />
        <img className="w-[64px] h-[64px] " src={micOn ? gameMenuMicOn : gameMenuMicOff} onClick={onClickCameraOn} />
        <img
          className="w-[64px] h-[64px] "
          src={cameraOn ? gameMenuCameraOn : gameMenuCameraOff}
          onClick={onClickMicOn}
        />
      </div>
    </div>
  );
};

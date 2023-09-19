import { useEffect } from "react";
import { BGM_MAP, SFX_MAP } from "../constants/common/SoundMap";

export const BGM = BGM_MAP
export const SFX = SFX_MAP

export const playBGM = (src: string) => {
  useEffect(() => {
    let bgm: HTMLAudioElement;   
    
    bgm = createBGMInstance(src);

    return () => {
      bgm.pause();
      bgm.src = '';
    }
  }, []);
}

export const createBGMInstance = (src: string) => {
  const bgm = new Audio(src);

  bgm.autoplay = true;
  bgm.loop = true;

  bgm.play().catch(error => {
    console.error("BGM play failed:", error);
  });

  return bgm; // 이렇게 반환하면 외부에서 이 BGM 오브젝트를 제어할 수 있습니다.
}

export const playSFX = (src: string) => {
  const sfx = new Audio(src);

  console.log("SFXSRC: ", src);
  
  sfx.play().catch(error => {
    console.error("SFX play failed:", error);
  });
}
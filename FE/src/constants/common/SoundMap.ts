import mainPageBGM from "../../assets/sound/bgm/mainPageBGM.wav"
import daytimeBGM from "../../assets/sound/bgm/daytimeBGM.wav"
import nightBGM from "../../assets/sound/bgm/nightBGM.wav"
import winBGM from "../../assets/sound/bgm/gameResultWin.wav"
import loseBGM from "../../assets/sound/bgm/gameResultLose.wav"
import voteResultBGM from "../../assets/sound/bgm/voteResultBGM.wav"
import shopPageBGM from "../../assets/sound/bgm/shopPageBGM.wav"
import profilePageBGM from "../../assets/sound/bgm/profilePageBGM.wav"

import buttonClickSFX from "../../assets/sound/sfx/buttonClickSFX.wav"
import buttonTabSFX from "../../assets/sound/sfx/buttonTabSFX.wav"
import buttonSwapSFX from "../../assets/sound/sfx/buttonSwapSFX.wav"
import buttonCoinSFX from "../../assets/sound/sfx/buttonCoinSFX.wav"
import buttonSelect from "../../assets/sound/sfx/buttonSelect.wav"
import buttonUnselect from "../../assets/sound/sfx/buttonUnselect.wav"
import errorSFX from "../../assets/sound/sfx/errorSFX.wav"
import buttonRefreshSFX from "../../assets/sound/sfx/buttonRefreshSFX.wav"
import seaSFX from "../../assets/sound/sfx/seaSFX.wav"
import rodalSFX from "../../assets/sound/sfx/rodalSFX_Origin.wav"
import slapSFX from "../../assets/sound/sfx/slapSFX.wav"

export const BGM_MAP = {
    MAIN: mainPageBGM,
    PROFILE: profilePageBGM,
    SHOP: shopPageBGM,
    DAY: daytimeBGM,
    NIGHT: nightBGM,
    RESULT: voteResultBGM,
    WIN: winBGM,
    LOSE: loseBGM,
}

export const SFX_MAP = {
    CLICK: buttonClickSFX,
    TAB: buttonTabSFX,
    SWAP: buttonSwapSFX,
    COIN: buttonCoinSFX,
    ERROR: errorSFX,
    SELECT: buttonSelect,
    UNSELECT: buttonUnselect,
    REFRESH: buttonRefreshSFX,
    SEA: seaSFX,
    RODAL: rodalSFX,
    SLAP: slapSFX,
}
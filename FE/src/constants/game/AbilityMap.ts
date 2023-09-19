import ZARA from "../../assets/img/game/abilityZara.png";
import DOCTOR from "../../assets/img/game/abilityDoctor.png";
import POLICE from "../../assets/img/game/abilityPolice.png";
import POLITICIAN from "../../assets/img/game/abilityPolitician.png";
import THUG from "../../assets/img/game/abilityThug.png";
import ARMY from "../../assets/img/game/abilityArmy.png";

export const ABILITY_MAP = [
  {
    img: ZARA,
    content: "",
  },
  {
    img: ZARA,
    content: "",
  },
  {
    img: ZARA,
    contentPrefix: "",
    contentSuffix: "을/를 공격하여 죽이는데 성공했습니다.",
  },
  {
    img: DOCTOR,
    contentPrefix: "의술로 자라에게 공격당한 ",
    contentSuffix: "을/를 치료했습니다.",
  },
  {
    img: POLICE,
    contentPrefix: "당신이 모시는 신으로부터 ",
    contentSuffix: "이/가 '자라'인 것을 알아냈습니다.",
  },
  {
    img: POLITICIAN,
    contentPrefix: "",
    contentSuffix: "이/가 권력을 이용하여 투표로 죽지 않았습니다.",
  },
  {
    img: ARMY,
    contentPrefix: "",
    contentSuffix: "장군토끼가 뛰어난 무술 실력으로 간밤의 공격을 버텨내었습니다.",
  },
  {
    img: THUG,
    contentPrefix: "",
    contentSuffix: "을/를 위협하여 투표하지 못하게 했습니다.",
  },
];

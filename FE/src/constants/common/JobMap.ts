import jobZara from "../../assets/img/common/jobZara.png";
import jobRabbit from "../../assets/img/common/jobRabbit.png";
import jobPolitician from "../../assets/img/common/jobPolitician.png";
import jobDoctor from "../../assets/img/common/jobDoctor.png";
import jobPolice from "../../assets/img/common/jobPolice.png";
import jobArmy from "../../assets/img/common/jobArmy.png";
import jobThug from "../../assets/img/common/jobThug.png";

export const JOB_MAP = [
  // 1:시민 2:마피아 3:의사 4:경찰 5:정치 6:군인 7:건달
  {
    name: "",
    info: "",
    info2: "",
    imgColor: jobRabbit,
    color: "",
  },
  {
    id: "1",
    name: "토끼",
    info: "선량한 토끼",
    info2: "아무런 능력이 없지만 귀엽습니다.",
    imgColor: jobRabbit,
    color: "text-yellow-100",
  },
  {
    id: "2",
    name: "자라",
    info: "용왕의 충신 자라",
    info2: "매일 밤 한 마리의 토끼를 선택하여 공격합니다.",
    imgColor: jobZara,
    color: "text-green-200",
  },
  {
    id: "3",
    name: "의원토끼",
    info: "뛰어난 의술을 가진 의원 토끼",
    info2: "매일 밤 선택한 토끼를 자라의 공격으로부터 치료합니다.",
    imgColor: jobDoctor,
    color: "text-pink-200",
  },
  {
    id: "4",
    name: "무당토끼",
    info: "신내림을 받은 무당 토끼",
    info2: "매일 밤 선택한 토끼가 자라인지 알 수 있습니다.",
    imgColor: jobPolice,
    color: "text-blue-400",
  },
  {
    id: "5",
    name: "탐관토끼",
    info: "부정부패 탐관오리 토끼",
    info2: "투표에서 2표를 가지며, 투표로 처형되지 않습니다.",
    imgColor: jobPolitician,
    color: "text-red-400",
  },
  {
    id: "6",
    name: "장군토끼",
    info: "뛰어난 무술을 가진 장군 토끼",
    info2: "자라의 공격을 한 번 방어할 수 있습니다.",
    imgColor: jobArmy,
    color: "text-green-500",
  },
  {
    id: "7",
    name: "산적토끼",
    info: "토끼들을 괴롭히는 산적 토끼",
    info2: "매일 밤 선택한 토끼는 다음 날 투표를 할 수 없습니다.",
    imgColor: jobThug,
    color: "text-yellow-600",
  },
];

import { GameCamList } from "./GameCamList";
import { GameChat } from "./GameChat";
import { GameMenu } from "./GameMenu";
import { GameTimer } from "./GameTimer";
import { GameJobInfo } from "../modal/GameJobInfo";
import { GameMyJob } from "../modal/GameMyJob";
import { GameRabbit } from "./GameRabbit";
import { useWebSocket } from "../../context/socketContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  SubChat,
  SubStartTimer,
  SubVote,
  SubVoteResult,
  SubNightResult,
  SubGameResult,
  SubStart,
  SubZaraChat,
  SubGhostChat,
  SubZaraTarget,
  SubCharLoc,
  SubBlackout,
  SubTimerDecrease,
  SubGhostAbility,
} from "../../types/StompGameSubType";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { useLocation } from "react-router-dom";
import { ChatList } from "../../types/GameLogicType";
import { GameVote } from "./GameVote";
import { GameNight } from "./GameNight";
import { NIGHT_RESULT_MAP } from "../../constants/game/NightResultMap";
import GameAbilityResult from "../modal/GameAbilityResult";
import { GameDayAlert } from "../modal/GameDayAlert";
import GameTimerAlert from "./GameTimerAlert";
import { GameResultFromGamePage } from "../result/ResultForm";
import GameDark from "./GameDark";
import GameAbilityTarget from "../modal/GameAbilityTarget";
import GameBlackout from "./GameBlackout";
import GameAbilityPolitician from "../modal/GameAbilityPolitician";
import { usePreventBrowserControl } from "../../hooks/usePreventBrowserControl";

interface GameLogicProps {
  mainStreamManager?: any;
  subscribers: any[];
  infoOn: boolean;
  onSetInfoOn: () => void;
  setMyCamera: (cameraOn: boolean) => void;
  setMyMic: (micOn: boolean) => void;
  setUserVideo: (videoOn: boolean) => void;
  setUserAudio: (videoOn: boolean) => void;
  leaveSession: () => void;
}

export const GameLogic = ({
  infoOn,
  mainStreamManager,
  subscribers,
  onSetInfoOn,
  setMyCamera,
  setMyMic,
  setUserVideo,
  setUserAudio,
  leaveSession,
}: GameLogicProps) => {
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const { gameCode } = useParams();
  const navigate = useNavigate();
  const [ghostChatList, setGhostChatList] = useState<ChatList>([]);
  const [zaraChatList, setZaraChatList] = useState<ChatList>([]);
  const [allChatList, setAllChatList] = useState<ChatList>([]);
  const [timer, setTimer] = useState<number>(0);
  const [voteList, setVoteList] = useState([
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
    { userSeq: 0, cnt: 0 },
  ]);
  const [deathByVoteOrderNo, setDeathByVoteOrderNo] = useState<number | null>(null);
  const [deathByZaraOrderNo, setDeathByZaraOrderNo] = useState<number | null>(null);
  const [myJobSeq, setMyJobSeq] = useState(0);
  const location = useLocation();
  const [userInfo, setUserInfo] = useState([
    {
      userSeq: 0,
      jobSeq: 0,
      nickname: "",
      equippedItems: {
        cap: "",
        clothing: "",
        face: "",
      },
      equippedItemsGif: {
        cap: "",
        clothing: "",
        face: "",
      },
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [amIDead, setAmIDead] = useState(false);
  const [amIZara, setAmIZara] = useState(false);
  const [amIVoted, setAmIVoted] = useState(false);
  const [ghostList, setGhostList] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [nowTime, setNowTime] = useState("");
  const [zaraTarget, setZaraTarget] = useState(-1);
  const [alertType, setAlertType] = useState(0);
  const [viewTimerAlert, setViewTimerAlert] = useState(false);
  const [gameResultData, setGameResultData] = useState<GameResultFromGamePage | null>(null);
  const [threatOrderNo, setThreatOrderNo] = useState<number | null>(null);
  const [healOrderNo, setHealOrderNo] = useState<number | null>(null);
  const [locData, setLocData] = useState<SubCharLoc | null>(null);
  const [blackoutUser, setBlackoutUser] = useState({ orderNo: 0, second: 100 });
  const [selectUser, setSelectUser] = useState(-1);
  const [politicianAbility, setPoliticianAbility] = useState<number | null>(null);
  const [ghostView, setGhostView] = useState<{ userOrderNo: number | null; targetOrderNo: number | null }>({
    userOrderNo: null,
    targetOrderNo: null,
  });
  const [abilityList, setAbilityList] = useState([
    { userSeq: 0, result: false },
    { userSeq: 0, result: false },
    { userSeq: 0, result: false },
    { userSeq: 0, result: false },
    { userSeq: 0, result: false },
    { userSeq: 0, result: false },
    { userSeq: 0, result: false },
    { userSeq: 0, result: false },
  ]);

  usePreventBrowserControl();

  const userSeqOrderMap: { [userSeq: number]: number } = location.state.userSeqOrderMap;
  const userSeqListSortedByOrder: number[] = location.state.userSeqListSortedByOrder;
  const myOrderNo = userSeqOrderMap[userSeq];

  useEffect(() => {
    console.log("myJob Seq = " + myJobSeq);
    console.log(loading);
    if (myJobSeq > 0) {
      setLoading(false);
    }
  }, [myJobSeq]);

  interface sortUserInfoParams {
    data: {
      userSeq: number;
      jobSeq: number;
      nickname: string;
      equippedItems: {
        cap: string;
        clothing: string;
        face: string;
      };
      equippedItemsGif: {
        cap: string;
        clothing: string;
        face: string;
      };
    }[];
  }
  interface sortVoteInfoParams {
    data: {
      userSeq: number;
      cnt: number;
    }[];
  }

  interface sortNightInfoParams {
    ability: {
      userSeq: number;
      result: boolean;
    }[];
  }

  const sortUserInfo = ({ data }: sortUserInfoParams) => {
    const sortedData = userSeqListSortedByOrder.map((userSeq) => {
      if (userSeq === 0) {
        return {
          userSeq: 0,
          jobSeq: 0,
          nickname: "",
          equippedItems: {
            cap: "",
            clothing: "",
            face: "",
          },
          equippedItemsGif: {
            cap: "",
            clothing: "",
            face: "",
          },
        };
      } else {
        const matchingItem = data.find((item) => item.userSeq === userSeq);
        if (matchingItem) {
          return matchingItem;
        } else {
          return {
            userSeq: userSeq,
            jobSeq: 0,
            nickname: "",
            equippedItems: {
              cap: "",
              clothing: "",
              face: "",
            },
            equippedItemsGif: {
              cap: "",
              clothing: "",
              face: "",
            },
          };
        }
      }
    });

    return sortedData;
  };

  const sortVoteInfo = ({ data }: sortVoteInfoParams) => {
    const sortedData = userSeqListSortedByOrder.map((userSeq) => {
      if (userSeq === 0) {
        return {
          userSeq: 0,
          cnt: 0,
        };
      } else {
        const matchingItem = data.find((item) => item.userSeq === userSeq);
        if (matchingItem) {
          return matchingItem;
        } else {
          return {
            userSeq: userSeq,
            cnt: 0,
          };
        }
      }
    });
    sortedData[8] = { userSeq: 0, cnt: data[0].cnt };

    return sortedData;
  };

  const sortNightInfo = ({ ability }: sortNightInfoParams) => {
    const sortedData = userSeqListSortedByOrder.map((userSeq) => {
      if (userSeq === 0) {
        return {
          userSeq: 0,
          result: false,
        };
      } else {
        const matchingItem = ability.find((item) => item.userSeq === userSeq);
        if (matchingItem) {
          return matchingItem;
        } else {
          return {
            userSeq: userSeq,
            result: false,
          };
        }
      }
    });

    return sortedData;
  };

  const initGhostList = () => {
    const newGhostList = userSeqListSortedByOrder.map((userSeq) => {
      if (userSeq === 0) {
        return 1;
      } else {
        return 0;
      }
    });
    setGhostList(newGhostList);
  };

  const initVoteList = () => {
    const newVoteList = voteList.map((vote) => {
      return {
        userSeq: vote.userSeq,
        cnt: 0,
      };
    });

    setVoteList(newVoteList);
  };

  const subGame = (gameCode: string) => {
    return client?.subscribe(`/sub/game/${gameCode}/all`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "GAME_START":
          const startData: SubStart = subDataBody;
          const initMyJobSeq = startData.data.find((user) => {
            return user.userSeq === userSeq;
          })?.jobSeq;

          const sortUserData = sortUserInfo(startData);
          initGhostList();
          setAmIZara(sortUserData[myOrderNo].jobSeq === 2 ? true : false);
          setUserInfo(sortUserData);
          setMyJobSeq(initMyJobSeq!);
          break;

        case "CHAT_ALL":
          const chatData: SubChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[chatData.data.sender],
            nickname: chatData.data.nickname,
            message: chatData.data.message,
          };
          setAllChatList((prev) => [...prev, myChatData]);
          break;

        case "GAME_TIMER":
          const timerData: SubStartTimer = subDataBody;
          setViewTimerAlert(true);
          setTimeout(() => {
            setViewTimerAlert(false);
          }, 5000);
          setTimer(timerData.data.time);
          setNowTime(timerData.data.type);
          break;

        case "GAME_CHAR_LOC":
          const charLocData: SubCharLoc = subDataBody;
          setLocData(charLocData);
          break;

        case "GAME_TIMER_DECREASE":
          const charTimerDecreaseData: SubTimerDecrease = subDataBody;
          const skipTime = charTimerDecreaseData.data;
          setTimer((prev) => (prev - skipTime < 0 ? 0 : prev - skipTime));
          break;

        case "GAME_VOTE":
          const voteData: SubVote = subDataBody;
          const sortVoteData = sortVoteInfo(voteData);
          setVoteList(sortVoteData);
          break;

        case "GAME_VOTE_RESULT":
          const voteResultData: SubVoteResult = subDataBody;
          const votedUserSeq = voteResultData.data.userSeq;
          const votedPoliticianUserNo = voteResultData.data.politicianSeq;
          const votedUserOrderNo = votedUserSeq === null ? null : userSeqOrderMap[votedUserSeq];
          setPoliticianAbility(votedPoliticianUserNo === null ? null : userSeqOrderMap[votedPoliticianUserNo]);
          initVoteList();
          setAmIVoted(votedUserOrderNo === myOrderNo);
          setDeathByVoteOrderNo(votedUserOrderNo);
          setZaraTarget(-1);
          setSelectUser(-1);
          break;

        case "GAME_NIGHT_RESULT":
          const aliveData: SubNightResult = subDataBody;

          if (aliveData.data.deadUserSeq !== null) {
            setDeathByZaraOrderNo(userSeqOrderMap[aliveData.data.deadUserSeq]);
          } else {
            setDeathByZaraOrderNo(null);
          }

          if (aliveData.data.threatUserSeq !== null) {
            setThreatOrderNo(userSeqOrderMap[aliveData.data.threatUserSeq]);
          } else {
            setThreatOrderNo(null);
          }

          if (aliveData.data.healUserSeq !== null) {
            setHealOrderNo(userSeqOrderMap[aliveData.data.healUserSeq]);
          } else {
            setHealOrderNo(null);
          }

          const sortNightResultData = sortNightInfo(aliveData.data);

          setAbilityList(sortNightResultData);
          break;

        case "GAME_BLACKOUT":
          const blackoutData: SubBlackout = subDataBody;
          setBlackoutUser({
            orderNo: userSeqOrderMap[blackoutData.data.userSeq],
            second: blackoutData.data.startSecond,
          });
          break;

        case "GAME_OVER":
          setTimeout(() => {
            const gameResultData: SubGameResult = subDataBody;
            setGameResultData({
              userInfo: gameResultData.data.userInfo.map((user) => {
                return {
                  ...user,
                  order: userSeqOrderMap[user.userSeq],
                };
              }),
              rabbitWin: gameResultData.data.rabbitWin,
              roomCode: location.state.roomCode,
              gameCode: gameResultData.code,
            });
          }, 5000);
          break;

        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  useEffect(() => {
    if (gameResultData) {
      leaveSession();
      navigate("/result", {
        state: gameResultData,
      });
    }
  }, [gameResultData]);

  const subGameZara = (gameCode: string) => {
    client?.subscribe(`/sub/game/${gameCode}/zara`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME ZARA");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "CHAT_ZARA":
          const subChatData: SubZaraChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[subChatData.data.sender],
            nickname: subChatData.data.nickname,
            message: subChatData.data.message,
          };
          setZaraChatList((prev) => [...prev, myChatData]);
          break;
        case "ABILITY":
          const subZaraTargetData: SubZaraTarget = subDataBody;
          const zaraTargetData = {
            targetOrderNo: userSeqOrderMap[subZaraTargetData.data],
          };
          setZaraTarget(zaraTargetData.targetOrderNo);
          break;
        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGameZara = (gameCode: string) => {
    client?.unsubscribe(`/sub/game/${gameCode}/zara`);
  };

  const subGameGhost = (gameCode: string) => {
    client?.subscribe(`/sub/game/${gameCode}/ghost`, (subData) => {
      const subDataBody = JSON.parse(subData.body);
      console.log("SUBSCRIBE GAME GHOST");
      console.log(subDataBody);
      switch (subDataBody.type) {
        case "CHAT_GHOST":
          const subDeadData: SubGhostChat = subDataBody;
          const myChatData = {
            userOrder: userSeqOrderMap[subDeadData.data.sender],
            nickname: subDeadData.data.nickname,
            message: subDeadData.data.message,
          };
          setGhostChatList((prev) => [...prev, myChatData]);
          break;

        case "ABILITY_GHOST":
          const subAbilityData: SubGhostAbility = subDataBody;
          const userOrderNo = userSeqOrderMap[subAbilityData.data.userSeq];
          const targetOrderNo = userSeqOrderMap[subAbilityData.data.targetUserSeq];
          setGhostView({ userOrderNo: userOrderNo, targetOrderNo: targetOrderNo });
          break;

        default:
          console.log("잘못된 타입의 데이터가 왔습니다.");
          break;
      }
    });
  };

  const unSubGameGhost = (gameCode: string) => {
    client?.unsubscribe(`/sub/game/${gameCode}/ghost`);
  };

  useEffect(() => {
    if (amIZara) subGameZara(gameCode!);

    return () => {
      unSubGameZara(gameCode!);
    };
  }, [amIZara]);

  useEffect(() => {
    const subscription = subGame(gameCode!);

    return () => {
      subscription?.unsubscribe();
    };
  }, [gameCode]);

  useEffect(() => {
    if (amIDead) subGameGhost(gameCode!);

    return () => {
      unSubGameGhost(gameCode!);
    };
  }, [amIDead]);

  useEffect(() => {
    if (deathByVoteOrderNo === myOrderNo) {
      setAmIDead(true);
    }

    const newGhostList = () =>
      ghostList.map((user, index) => {
        if (deathByVoteOrderNo === index) {
          user = 1;
        }
        return user;
      });
    setGhostList(newGhostList);
  }, [deathByVoteOrderNo]);

  useEffect(() => {
    if (deathByZaraOrderNo === myOrderNo) {
      setAmIDead(true);
    }

    const newGhostList = () =>
      ghostList.map((user, index) => {
        if (deathByZaraOrderNo === index) {
          user = 1;
        }
        return user;
      });
    setGhostList(newGhostList);

    if (deathByZaraOrderNo === null) {
      setAlertType(NIGHT_RESULT_MAP.SAFE);
    } else {
      setAlertType(NIGHT_RESULT_MAP.DEATH);
    }
  }, [deathByZaraOrderNo]);

  return (
    <>
      {!loading && (
        <>
          {nowTime === "DAY" && <GameDark nowTime={nowTime} />}
          <GameCamList
            mainStreamManager={mainStreamManager}
            subscribers={subscribers}
            myOrderNo={myOrderNo}
            userInfo={userInfo}
            ghostList={ghostList}
            amIDead={amIDead}
          />
          <GameJobInfo infoOn={infoOn} onSetInfoOn={onSetInfoOn} />
          <GameMyJob myJobSeq={myJobSeq} />
          {nowTime === "VOTE" && (
            <GameVote voteList={voteList} ghostList={ghostList} userSeqOrderMap={userSeqOrderMap} amIDead={amIDead} />
          )}
          {nowTime === "VOTE_RESULT" && politicianAbility !== null && (
            <GameAbilityPolitician politicianAbility={politicianAbility} userInfo={userInfo} />
          )}
          {nowTime === "NIGHT" && (
            <GameNight
              ghostList={ghostList}
              userInfo={userInfo}
              myOrderNo={myOrderNo}
              zaraTarget={zaraTarget}
              userSeqOrderMap={userSeqOrderMap}
              selectUser={selectUser}
              setSelectUser={setSelectUser}
              amIDead={amIDead}
              ghostView={ghostView}
            />
          )}
          {nowTime === "NIGHT_RESULT" && !amIDead && abilityList[myOrderNo].result && (
            <GameAbilityResult userInfo={userInfo} myOrderNo={myOrderNo} selectUser={selectUser} />
          )}
          {nowTime === "NIGHT_RESULT" && (
            <GameAbilityTarget
              myOrderNo={myOrderNo}
              deadOrderNo={deathByZaraOrderNo}
              threatOrderNo={threatOrderNo}
              healOrderNo={healOrderNo}
            />
          )}
          <GameMenu
            onSetInfoOn={onSetInfoOn}
            setMyCamera={setMyCamera}
            setMyMic={setMyMic}
            setUserVideo={setUserVideo}
            setUserAudio={setUserAudio}
            setAmIVoted={setAmIVoted}
            nowTime={nowTime}
            amIDead={amIDead}
            amIZara={amIZara}
            amIVoted={amIVoted}
          />
          <GameRabbit
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            deathByVoteOrderNo={deathByVoteOrderNo}
            deathByZaraOrderNo={deathByZaraOrderNo}
            nowTime={nowTime}
            locData={locData!}
            allChatList={allChatList}
            amIDead={amIDead}
          />
          <GameChat
            allChatList={allChatList}
            zaraChatList={zaraChatList}
            ghostChatList={ghostChatList}
            myJobSeq={myJobSeq}
            amIDead={amIDead}
            amIZara={amIZara}
            nowTime={nowTime}
          />
          {viewTimerAlert && !amIDead && (
            <GameTimerAlert
              nowTime={nowTime}
              myJobSeq={myJobSeq}
              deathByVoteOrderNo={deathByVoteOrderNo}
              deathByZaraOrderNo={deathByZaraOrderNo}
            />
          )}
          {nowTime === "DAY" && (
            <GameDayAlert alertType={alertType} userInfo={userInfo} deathByZaraOrderNo={deathByZaraOrderNo} />
          )}
        </>
      )}
      <GameTimer timer={timer} setTimer={setTimer} nowTime={nowTime} amIDead={amIDead} />
      <GameBlackout timer={timer} blackoutUser={blackoutUser} nowTime={nowTime} />
    </>
  );
};

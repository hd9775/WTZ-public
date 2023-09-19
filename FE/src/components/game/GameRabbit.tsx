import { useEffect, useState } from "react";
import { RABBIT_DIR_MAP } from "../../constants/game/RabbitDirMap";
import { RABBIT_MAP } from "../../constants/common/RabbitMap";
import { RABBIT_STATE_MAP } from "../../constants/game/RabbitStateMap";
import GameVoteKill from "./GameVoteKill";
import { SFX, playSFX } from "../../utils/audioManager";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { SubCharLoc } from "../../types/StompGameSubType";
import chatImg from "../../assets/img/game/chat.png";

interface Chat {
  userOrder: number;
  nickname: string;
  message: string;
}
interface GameRabbitProps {
  userInfo: {
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
  myOrderNo: number;
  deathByVoteOrderNo: number | null;
  deathByZaraOrderNo: number | null;
  nowTime: string;
  locData: SubCharLoc | null;
  allChatList: Chat[];
  amIDead: boolean;
}

export const GameRabbit = ({
  userInfo,
  myOrderNo,
  deathByVoteOrderNo,
  deathByZaraOrderNo,
  nowTime,
  locData,
  allChatList,
  amIDead,
}: GameRabbitProps) => {
  const { client } = useWebSocket();
  const { gameCode } = useParams();
  const [rabbit, setRabbit] = useState([
    {
      y1: RABBIT_MAP[0].DEFAULT_Y1 + 80,
      y2: RABBIT_MAP[0].DEFAULT_Y2 + 64,
      x1: RABBIT_MAP[0].DEFAULT_X1 + 60,
      x2: RABBIT_MAP[0].DEFAULT_X2 + 51.2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      isNone: false,
      dir: RABBIT_MAP[0].DEFAULT_DIR,
      userNo: 0,
      nickname: "",
      job: 0,
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
    {
      y1: RABBIT_MAP[1].DEFAULT_Y1 + 80,
      y2: RABBIT_MAP[1].DEFAULT_Y2 + 64,
      x1: RABBIT_MAP[1].DEFAULT_X1 + 60,
      x2: RABBIT_MAP[1].DEFAULT_X2 + 51.2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      isNone: false,
      dir: RABBIT_MAP[1].DEFAULT_DIR,
      userNo: 0,
      nickname: "",
      job: 0,
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
    {
      y1: RABBIT_MAP[2].DEFAULT_Y1 + 80,
      y2: RABBIT_MAP[2].DEFAULT_Y2 + 64,
      x1: RABBIT_MAP[2].DEFAULT_X1 + 60,
      x2: RABBIT_MAP[2].DEFAULT_X2 + 51.2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      isNone: false,
      dir: RABBIT_MAP[2].DEFAULT_DIR,
      userNo: 0,
      nickname: "",
      job: 0,
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
    {
      y1: RABBIT_MAP[3].DEFAULT_Y1 + 80,
      y2: RABBIT_MAP[3].DEFAULT_Y2 + 64,
      x1: RABBIT_MAP[3].DEFAULT_X1 + 60,
      x2: RABBIT_MAP[3].DEFAULT_X2 + 51.2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      isNone: false,
      dir: RABBIT_MAP[3].DEFAULT_DIR,
      userNo: 0,
      nickname: "",
      job: 0,
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
    {
      y1: RABBIT_MAP[4].DEFAULT_Y1 + 80,
      y2: RABBIT_MAP[4].DEFAULT_Y2 + 64,
      x1: RABBIT_MAP[4].DEFAULT_X1 + 60,
      x2: RABBIT_MAP[4].DEFAULT_X2 + 51.2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      isNone: false,
      dir: RABBIT_MAP[4].DEFAULT_DIR,
      userNo: 0,
      nickname: "",
      job: 0,
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
    {
      y1: RABBIT_MAP[5].DEFAULT_Y1 + 80,
      y2: RABBIT_MAP[5].DEFAULT_Y2 + 64,
      x1: RABBIT_MAP[5].DEFAULT_X1 + 60,
      x2: RABBIT_MAP[5].DEFAULT_X2 + 51.2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      isNone: false,
      dir: RABBIT_MAP[5].DEFAULT_DIR,
      userNo: 0,
      nickname: "",
      job: 0,
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
    {
      y1: RABBIT_MAP[6].DEFAULT_Y1 + 80,
      y2: RABBIT_MAP[6].DEFAULT_Y2 + 64,
      x1: RABBIT_MAP[6].DEFAULT_X1 + 60,
      x2: RABBIT_MAP[6].DEFAULT_X2 + 51.2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      isNone: false,
      dir: RABBIT_MAP[6].DEFAULT_DIR,
      userNo: 0,
      nickname: "",
      job: 0,
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
    {
      y1: RABBIT_MAP[7].DEFAULT_Y1 + 80,
      y2: RABBIT_MAP[7].DEFAULT_Y2 + 64,
      x1: RABBIT_MAP[7].DEFAULT_X1 + 60,
      x2: RABBIT_MAP[7].DEFAULT_X2 + 51.2,
      state: RABBIT_STATE_MAP.STAND,
      isDie: false,
      isKilled: false,
      isNone: false,
      dir: RABBIT_MAP[7].DEFAULT_DIR,
      userNo: 0,
      nickname: "",
      job: 0,
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
  const [showTentacle, setShowTentacle] = useState(false);

  const center = {
    y1: 275,
    y2: 220,
    x1: 532,
    x2: 430,
  };

  const onMoveCenter = (no: number) => {
    const newRabbit = rabbit.map((item, index) => {
      if (index === no) {
        if (item.x1 < RABBIT_MAP[index].DEFAULT_X1) {
          item.dir = RABBIT_DIR_MAP.RIGHT;
        } else if (item.x1 > RABBIT_MAP[index].DEFAULT_X1) {
          item.dir = RABBIT_DIR_MAP.LEFT;
        }
        item.y1 = center.y1 + 80;
        item.x1 = center.x1 + 64;
        item.y2 = center.y2 + 60;
        item.x2 = center.x2 + 51.2;
        rabbit[index].state = RABBIT_STATE_MAP.WALK;

        setTimeout(() => {
          playSFX(SFX.SLAP);
          setShowTentacle(true);
        }, 2000);

        setTimeout(() => {
          const newRabbit = rabbit.map((user, index) => {
            if (index === no) {
              user.state = RABBIT_STATE_MAP.DIE;
            }
            return user;
          });
          setRabbit(newRabbit);
        }, 2500);

        setTimeout(() => {
          const newRabbit = rabbit.map((user, index) => {
            if (index === no) {
              user.isDie = true;
            }
            return user;
          });
          setRabbit(newRabbit);
          setShowTentacle(false);
        }, 4000);
      }
      return item;
    });
    setRabbit(newRabbit);
  };

  const onMoveReset = (no: number) => {
    const newRabbit = rabbit.map((item, index) => {
      if (index === no) {
        if (item.x1 < RABBIT_MAP[index].DEFAULT_X1 + 64) {
          item.dir = RABBIT_DIR_MAP.RIGHT;
        } else if (item.x1 > RABBIT_MAP[index].DEFAULT_X1 + 64) {
          item.dir = RABBIT_DIR_MAP.LEFT;
        }
        item.y1 = RABBIT_MAP[index].DEFAULT_Y1 + 80;
        item.y2 = RABBIT_MAP[index].DEFAULT_Y2 + 60;
        item.x1 = RABBIT_MAP[index].DEFAULT_X1 + 64;
        item.x2 = RABBIT_MAP[index].DEFAULT_X2 + 51.2;
        rabbit[index].state = RABBIT_STATE_MAP.WALK;
        setTimeout(() => {
          rabbit[index].state = RABBIT_STATE_MAP.STAND;
          rabbit[index].dir = RABBIT_MAP[index].DEFAULT_DIR;
        }, 2000);
      }
      return item;
    });

    setRabbit(newRabbit);
  };

  const isZara = (orderNo: number) => {
    return rabbit[myOrderNo].job === 2 && rabbit[orderNo].job === 2;
  };

  useEffect(() => {
    const newRabbit = rabbit.map((user, index) => {
      if (userInfo[index].userSeq === 0) {
        user.isNone = true;
        return user;
      }
      user.userNo = userInfo[index].userSeq;
      user.nickname = userInfo[index].nickname;
      user.job = userInfo[index].jobSeq;
      user.equippedItems = userInfo[index].equippedItems;
      user.equippedItemsGif = userInfo[index].equippedItemsGif;

      return user;
    });
    console.log("newRabbit", newRabbit);
    setRabbit(newRabbit);
  }, [userInfo]);

  useEffect(() => {
    if (deathByVoteOrderNo === null) {
      return;
    }
    onMoveCenter(deathByVoteOrderNo);
  }, [deathByVoteOrderNo]);

  useEffect(() => {
    if (deathByZaraOrderNo === null) {
      return;
    }

    const newRabbit = rabbit.map((user, index) => {
      if (index === deathByZaraOrderNo) {
        user.isKilled = true;
      }
      return user;
    });
    setRabbit(newRabbit);
  }, [deathByZaraOrderNo]);

  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    // 뷰포트 너비 변경시 호출되는 이벤트 핸들러
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    // 윈도우 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 컴포넌트 언마운트시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rabbitStyle = (index: number) => {
    if (viewportWidth >= 1880) {
      const style = {
        top: rabbit[index].y1 - 80,
        left: rabbit[index].x1 - 64,
      };
      return style;
    } else {
      const style = {
        top: rabbit[index].y2 - 60,
        left: rabbit[index].x2 - 51.2,
      };
      return style;
    }
  };

  useEffect(() => {
    if (nowTime === "VOTE") {
      for (let i = 0; i < 8; ++i) {
        if (rabbit[i].isDie || rabbit[i].isKilled) {
          continue;
        }
        onMoveReset(i);
      }
    }
  }, [nowTime]);

  useEffect(() => {
    if (locData === null) {
      return;
    }
    changeLocRabbit(locData, true);
  }, [locData]);
  interface changeLocRabbitProps {
    data: {
      orderNumber: number;
      xaxis1: number;
      yaxis1: number;
      xaxis2: number;
      yaxis2: number;
    };
  }

  const changeLocRabbit = ({ data }: changeLocRabbitProps, receive: boolean) => {
    if (receive && data.orderNumber === myOrderNo) {
      return;
    }
    const newRabbit = rabbit.map((user, index) => {
      if (data.orderNumber === index) {
        if (user.x1 < data.xaxis1) {
          user.dir = RABBIT_DIR_MAP.RIGHT;
        } else if (user.x1 > data.xaxis1) {
          user.dir = RABBIT_DIR_MAP.LEFT;
        }
        user.y1 = data.yaxis1;
        user.y2 = data.yaxis2;
        user.x1 = data.xaxis1;
        user.x2 = data.xaxis2;
        user.state = RABBIT_STATE_MAP.WALK;
        setTimeout(() => {
          user.state = RABBIT_STATE_MAP.STAND;
        }, 2000);
      }
      return user;
    });
    setRabbit(newRabbit);
    if (!receive) {
      pubGameLoc(gameCode!);
    }
  };

  const pubGameLoc = (gameCode: string) => {
    client?.publish({
      destination: `/pub/game/${gameCode}/loc`,
      body: JSON.stringify({
        orderNumber: myOrderNo,
        xaxis1: rabbit[myOrderNo].x1,
        yaxis1: rabbit[myOrderNo].y1,
        xaxis2: rabbit[myOrderNo].x2,
        yaxis2: rabbit[myOrderNo].y2,
      }),
    });
  };

  const onMoveRabbit = (e: React.MouseEvent) => {
    if (nowTime !== "DAY" && !amIDead) {
      return;
    }

    let y = e.nativeEvent.offsetY;
    let x = e.nativeEvent.offsetX;
    if (y < 80) {
      y = 80;
    } else if (y > 400) {
      y = 400;
    }
    if (x < 25) {
      x = 25;
    } else if (x > 1150) {
      x = 1150;
    }

    if (viewportWidth >= 1880) {
      const loc = {
        data: {
          orderNumber: myOrderNo,
          yaxis1: y,
          yaxis2: y / 1.25,
          xaxis1: x,
          xaxis2: x / 1.25,
        },
      };
      changeLocRabbit(loc, false);
    } else {
      const loc = {
        data: {
          orderNumber: myOrderNo,
          yaxis1: y * 1.25,
          yaxis2: y,
          xaxis1: x * 1.25,
          xaxis2: x,
        },
      };
      changeLocRabbit(loc, false);
    }
  };

  const [chat1, setChat1] = useState("");
  const [chat2, setChat2] = useState("");
  const [chat3, setChat3] = useState("");
  const [chat4, setChat4] = useState("");
  const [chat5, setChat5] = useState("");
  const [chat6, setChat6] = useState("");
  const [chat7, setChat7] = useState("");
  const [chat8, setChat8] = useState("");
  const [chatList, setChatList] = useState([chat1, chat2, chat3, chat4, chat5, chat6, chat7, chat8]);
  useEffect(() => {
    if (allChatList.length === 0) {
      return;
    }
    const orderNo = allChatList[allChatList.length - 1].userOrder;
    if (orderNo === 0) {
      setChat1(allChatList[allChatList.length - 1].message);
      setTimeout(() => {
        setChat1("");
      }, 3000);
    } else if (orderNo === 1) {
      setChat2(allChatList[allChatList.length - 1].message);
      setTimeout(() => {
        setChat2("");
      }, 3000);
    } else if (orderNo === 2) {
      setChat3(allChatList[allChatList.length - 1].message);
      setTimeout(() => {
        setChat3("");
      }, 3000);
    } else if (orderNo === 3) {
      setChat4(allChatList[allChatList.length - 1].message);
      setTimeout(() => {
        setChat4("");
      }, 3000);
    } else if (orderNo === 4) {
      setChat5(allChatList[allChatList.length - 1].message);
      setTimeout(() => {
        setChat5("");
      }, 3000);
    } else if (orderNo === 5) {
      setChat6(allChatList[allChatList.length - 1].message);
      setTimeout(() => {
        setChat6("");
      }, 3000);
    } else if (orderNo === 6) {
      setChat7(allChatList[allChatList.length - 1].message);
      setTimeout(() => {
        setChat7("");
      }, 3000);
    } else if (orderNo === 7) {
      setChat8(allChatList[allChatList.length - 1].message);
      setTimeout(() => {
        setChat8("");
      }, 3000);
    }
  }, [allChatList]);

  useEffect(() => {
    setChatList([chat1, chat2, chat3, chat4, chat5, chat6, chat7, chat8]);
  }, [chat1, chat2, chat3, chat4, chat5, chat6, chat7, chat8]);

  const rabbitView = (index: number) => {
    if (rabbit[index].isNone) {
      return "opacity-0";
    } else if (!amIDead && (rabbit[index].isDie || rabbit[index].isKilled)) {
      return "opacity-0";
    } else if (amIDead && (rabbit[index].isDie || rabbit[index].isKilled)) {
      return "opacity-50";
    } else {
      return "opacity-100";
    }
  };

  return (
    <>
      <div
        className="absolute 3xl:top-[250px] top-[200px] 3xl:w-[1200px] w-[960px] 3xl:h-[442.5px] h-[354px]"
        onClick={(e) => onMoveRabbit(e)}
      >
        <div className="relative w-full h-full">
          <GameVoteKill showTentacle={showTentacle} />
          {rabbit.map((user, index) => (
            <div
              className={`${rabbitView(index)} relative transition-all duration-[2000ms] ease-linear ${
                (nowTime === "NIGHT" || nowTime === "NIGHT_RESULT") && "brightness-50"
              }`}
              key={index}
              style={rabbitStyle(index)}
            >
              <img
                className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] ${
                  user.dir === 0 && "scale-x-[-1]"
                }`}
                src={RABBIT_MAP[index].IMG[user.state]}
              />
              <img
                className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] ${
                  user.dir === 0 && "scale-x-[-1]"
                } ${user.state === RABBIT_STATE_MAP.DIE && "opacity-0 duration-500"}`}
                src={`data:image/png;base64,${
                  user.state === RABBIT_STATE_MAP.STAND ? user.equippedItems.clothing : user.equippedItemsGif.clothing
                }`}
              />
              <img
                className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] ${
                  user.dir === 0 && "scale-x-[-1]"
                } ${user.state === RABBIT_STATE_MAP.DIE && "opacity-0 duration-500"}`}
                src={`data:image/png;base64,${
                  user.state === RABBIT_STATE_MAP.STAND ? user.equippedItems.face : user.equippedItemsGif.face
                }`}
              />
              <img
                className={`absolute 3xl:w-[150px] w-[120px] 3xl:h-[150px] h-[120px] ${
                  user.dir === 0 && "scale-x-[-1]"
                } ${user.state === RABBIT_STATE_MAP.DIE && "opacity-0 duration-500"}`}
                src={`data:image/png;base64,${
                  user.state === RABBIT_STATE_MAP.STAND ? user.equippedItems.cap : user.equippedItemsGif.cap
                }`}
              />
              {chatList[index] !== "" && (
                <>
                  <img
                    className={`absolute 3xl:w-[180px] w-[144px] 3xl:h-[100px] h-[80px] 3xl:left-[-16px] left-[-12.8px] 3xl:top-[-110px] top-[-88px]`}
                    src={chatImg}
                  />
                  <div className="absolute 3xl:w-[180px] w-[144px] 3xl:h-[100px] h-[80px] 3xl:left-[-16px] left-[-12.8px] 3xl:top-[-110px] top-[-88px] 3xl:p-[10px] p-[8px] overflow-hidden 3xl:text-[16px] text-[12.8px] flex justify-center items-center">
                    <p className={`break-all`}>{chatList[index]}</p>
                  </div>
                </>
              )}
              <p
                className={`absolute ${
                  isZara(index) ? "text-green-200" : "text-white"
                } font-bold top-[0px] text-center 3xl:w-[150px] w-[120px] drop-shadow-stroke-black-sm`}
              >
                {rabbit[index].nickname} {index === myOrderNo && " (나)"}
              </p>
            </div>
          ))}
        </div>
        <div className="absolute w-full h-full top-[0px] left-[0px] bg-transparent" />
      </div>
    </>
  );
};

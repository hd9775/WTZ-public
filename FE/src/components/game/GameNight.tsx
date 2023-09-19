import { useEffect } from "react";
import { GameNightTarget } from "./GameNightTarget";
import { useWebSocket } from "../../context/socketContext";
import { useParams } from "react-router-dom";
import { useAccessTokenState } from "../../context/accessTokenContext";

interface GameNightProps {
  ghostList: number[];
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  myOrderNo: number;
  zaraTarget: number;
  userSeqOrderMap: { [userSeq: number]: number };
  selectUser: number;
  setSelectUser: (num: number) => void;
  amIDead: boolean;
  ghostView: { userOrderNo: number | null; targetOrderNo: number | null };
}

export const GameNight = ({
  ghostList,
  userInfo,
  myOrderNo,
  zaraTarget,
  userSeqOrderMap,
  selectUser,
  setSelectUser,
  amIDead,
  ghostView,
}: GameNightProps) => {
  const { gameCode } = useParams();
  let myJob = userInfo[myOrderNo].jobSeq;

  const hasAbility = () => {
    return myJob !== 1 && myJob !== 5 && myJob !== 6;
  };
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();

  const mappingSeqOrd = (userOrder: number) => {
    let targetSeq = 0;
    for (const key in userSeqOrderMap) {
      if (userSeqOrderMap[key] === userOrder) {
        targetSeq = parseInt(key);
        break;
      }
    }

    return targetSeq;
  };

  useEffect(() => {
    console.log("pub test");
    console.log(selectUser);
    if (selectUser === -1) {
      return;
    }
    client?.publish({
      destination: `/pub/game/${gameCode}/ability`,
      body: JSON.stringify({ userSeq: userSeq, targetUserSeq: mappingSeqOrd(selectUser) }),
    });
  }, [selectUser]);

  useEffect(() => {
    if (zaraTarget !== -1) {
      setSelectUser(zaraTarget);
    }
  }, [zaraTarget]);

  useEffect(() => {
    console.log(ghostView);
  }, [ghostView]);

  return (
    <>
      {(amIDead || hasAbility()) && (
        <div className="absolute w-full h-full flex flex-col justify-between">
          <div className="flex justify-between">
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={0}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[0]}
                amIDead={amIDead}
                ghostView={ghostView}
                userInfo={userInfo}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={1}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[1]}
                amIDead={amIDead}
                ghostView={ghostView}
                userInfo={userInfo}
              />
            </div>
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={2}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[2]}
                amIDead={amIDead}
                ghostView={ghostView}
                userInfo={userInfo}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={3}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[3]}
                amIDead={amIDead}
                ghostView={ghostView}
                userInfo={userInfo}
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={4}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[4]}
                amIDead={amIDead}
                ghostView={ghostView}
                userInfo={userInfo}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={5}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[5]}
                amIDead={amIDead}
                ghostView={ghostView}
                userInfo={userInfo}
              />
            </div>
            <div className="flex">
              <GameNightTarget
                myJob={myJob}
                orderNo={6}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[6]}
                amIDead={amIDead}
                ghostView={ghostView}
                userInfo={userInfo}
              />
              <GameNightTarget
                myJob={myJob}
                orderNo={7}
                selectUser={selectUser}
                setSelectUser={setSelectUser}
                isDie={ghostList[7]}
                amIDead={amIDead}
                ghostView={ghostView}
                userInfo={userInfo}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

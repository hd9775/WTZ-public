// import { JOB_MAP } from "../../constants/common/JobMap";
// import { useAccessTokenState } from "../../context/accessTokenContext";
import { GameCamListItem } from "./GameCamListItem";
import { useEffect, useState } from "react";

interface UserVideoProps {
  mainStreamManager: any;
  subscribers: any[];
  myOrderNo: number;
  userInfo: {
    userSeq: number;
    jobSeq: number;
    nickname: string;
  }[];
  ghostList: number[];
  amIDead: boolean;
}

export const GameCamList = ({
  mainStreamManager,
  subscribers,
  myOrderNo,
  userInfo,
  ghostList,
  amIDead,
}: UserVideoProps) => {
  const [streamManagers, setSM] = useState([undefined]);

  const onSetSM = (idx: number, stream: any) => {
    setSM((prevSMs) => {
      let newSMs = [...prevSMs];
      while (newSMs.length <= idx) {
        newSMs.push(undefined);
      }
      newSMs[idx] = stream;
      return newSMs;
    });
  };

  useEffect(() => {
    subscribers.forEach(function (sub) {
      console.log("OVEN1", sub);
      if (sub?.stream?.connection?.data !== undefined) {  
        let userData = JSON.parse(sub.stream.connection.data);
        let userName = userData.clientData;
        userInfo.forEach(function (user, index) {
          if (user.nickname === userName) {
            onSetSM(index, sub);
          }
          console.log("OVEN2", mainStreamManager);    
          if (mainStreamManager?.stream?.connection?.data !== undefined) {
            let myData = JSON.parse(mainStreamManager.stream.connection.data);
            let myName = myData.clientData;
            if (user.nickname === myName) {
              onSetSM(index, mainStreamManager);
            }
          }
        });
      }
    });
  }, [subscribers]);

  useEffect(() => {
    console.log("OVEN3", mainStreamManager);  
    userInfo.forEach(function (user, index) {
      if (mainStreamManager?.stream?.connection?.data !== undefined) {
        let myData = JSON.parse(mainStreamManager.stream.connection.data);
        let myName = myData.clientData;
        if (user.nickname === myName) {
          onSetSM(index, mainStreamManager);
        }
      }
    });
  }, [mainStreamManager]);

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem
            orderNo={0}
            streamManager={streamManagers[0]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[0]}
            amIDead={amIDead}
          />
          <GameCamListItem
            orderNo={1}
            streamManager={streamManagers[1]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[1]}
            amIDead={amIDead}
          />
        </div>
        <div className="flex">
          <GameCamListItem
            orderNo={2}
            streamManager={streamManagers[2]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[2]}
            amIDead={amIDead}
          />
          <GameCamListItem
            orderNo={3}
            streamManager={streamManagers[3]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[3]}
            amIDead={amIDead}
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
          <GameCamListItem
            orderNo={4}
            streamManager={streamManagers[4]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[4]}
            amIDead={amIDead}
          />
          <GameCamListItem
            orderNo={5}
            streamManager={streamManagers[5]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[5]}
            amIDead={amIDead}
          />
        </div>
        <div className="flex">
          <GameCamListItem
            orderNo={6}
            streamManager={streamManagers[6]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[6]}
            amIDead={amIDead}
          />
          <GameCamListItem
            orderNo={7}
            streamManager={streamManagers[7]}
            userInfo={userInfo}
            myOrderNo={myOrderNo}
            isDie={ghostList[7]}
            amIDead={amIDead}
          />
        </div>
      </div>
    </div>
  );
};

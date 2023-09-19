import { GameVoteSkip, GameVoteUser } from "./GameVoteItem";
import { useWebSocket } from "../../context/socketContext";
import { useAccessTokenState } from "../../context/accessTokenContext";
import { useParams } from "react-router-dom";

interface GameVoteProps {
  voteList: { userSeq: number; cnt: number }[];
  ghostList: number[];
  userSeqOrderMap: { [userSeq: number]: number };
  amIDead: boolean;
}

export const GameVote = ({ voteList, ghostList, userSeqOrderMap, amIDead }: GameVoteProps) => {
  const { client } = useWebSocket();
  const { userSeq } = useAccessTokenState();
  const { gameCode } = useParams();

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

  const onSetSelectVote = (userOrder: number) => {
    let targetSeq = 0;
    if (userOrder !== 8) {
      targetSeq = mappingSeqOrd(userOrder);
    }

    client?.publish({
      destination: `/pub/game/${gameCode}/vote`,
      body: JSON.stringify({
        userSeq,
        targetUserSeq: targetSeq,
      }),
    });
  };

  return (
    <>
      <div className="absolute w-full h-full flex flex-col justify-between">
        <div className="flex justify-between">
          <div className="flex">
            <GameVoteUser
              voteNum={voteList[0].cnt}
              userOrder={0}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[0]}
              amIDead={amIDead}
            />
            <GameVoteUser
              voteNum={voteList[1].cnt}
              userOrder={1}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[1]}
              amIDead={amIDead}
            />
          </div>
          <div className="flex">
            <GameVoteUser
              voteNum={voteList[2].cnt}
              userOrder={2}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[2]}
              amIDead={amIDead}
            />
            <GameVoteUser
              voteNum={voteList[3].cnt}
              userOrder={3}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[3]}
              amIDead={amIDead}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex">
            <GameVoteUser
              voteNum={voteList[4].cnt}
              userOrder={4}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[4]}
              amIDead={amIDead}
            />
            <GameVoteUser
              voteNum={voteList[5].cnt}
              userOrder={5}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[5]}
              amIDead={amIDead}
            />
          </div>
          <div className="flex items-center">
            <GameVoteSkip voteNum={voteList[8].cnt} onSetSelectVote={onSetSelectVote} amIDead={amIDead} />
          </div>
          <div className="flex">
            <GameVoteUser
              voteNum={voteList[6].cnt}
              userOrder={6}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[6]}
              amIDead={amIDead}
            />
            <GameVoteUser
              voteNum={voteList[7].cnt}
              userOrder={7}
              onSetSelectVote={onSetSelectVote}
              isDie={ghostList[7]}
              amIDead={amIDead}
            />
          </div>
        </div>
      </div>
    </>
  );
};

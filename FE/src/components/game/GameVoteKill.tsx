import { useState, useEffect } from "react";
import tentacle from "../../assets/img/game/tentacle_only.gif";
import transparent from "../../assets/img/common/transparent.png";

interface GameVoteKillProps {
  showTentacle: boolean;
}

const GameVoteKill = ({ showTentacle }: GameVoteKillProps) => {
  const [showGif, setShowGif] = useState(tentacle);

  useEffect(() => {
    if (showTentacle) {
      setShowGif(tentacle);
    } else {
      setShowGif(transparent);
    }
  }, [showTentacle]);

  return (
    <>
      <img
        className={`absolute top-[-40px] 3xl:left-[200px] left-[160px] 3xl:w-[800px] w-[640px] 3xl:h-[880px] h-[640px] z-50 ${
          !showTentacle && "hidden"
        }`}
        src={showGif}
      />
    </>
  );
};

export default GameVoteKill;

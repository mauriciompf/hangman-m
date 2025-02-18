import { useHangManContext } from "../contexts/useHangManContext";
import WinModal from "./WinModal";
import LoseModal from "./LoseModal";
import { useEffect, useState } from "react";

function GameOverModal() {
  const { correctLetters, incorrectLetters, randomWord } = useHangManContext();
  const [isLose, setIsLose] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (incorrectLetters.length === 6) {
      setTimeout(() => {
        setIsLose(true);
      }, 500);
    }

    if (correctLetters.length === randomWord?.replace(" ", "")!.length) {
      setTimeout(() => {
        setIsWin(true);
      }, 1500);
    }
  }, [correctLetters, randomWord]);

  return (
    <>
      {isWin && <WinModal />}
      {isLose && <LoseModal />}
    </>
  );
}

export default GameOverModal;

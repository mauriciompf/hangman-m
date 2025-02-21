import { useHangManContext } from "../contexts/useHangManContext";
import WinModal from "./WinModal";
import LoseModal from "./LoseModal";
import { useEffect } from "react";
import ResetModal from "./ResetModal";

function GameOverModal() {
  const {
    correctLetters,
    incorrectLetters,
    randomWord,
    isLose,
    setIsWin,
    setIsLose,
    isWin,
    isReset,
  } = useHangManContext();

  useEffect(() => {
    if (correctLetters.length === randomWord?.replaceAll(" ", "")!.length) {
      setTimeout(() => {
        setIsWin(true);
      }, 1500);
    }

    if (incorrectLetters.length === 6) {
      setTimeout(() => {
        setIsLose(true);
      }, 500);
    }
  }, [correctLetters, incorrectLetters, randomWord]);

  return (
    <>
      {isReset && <ResetModal />}
      {isWin && <WinModal />}
      {isLose && <LoseModal />}
    </>
  );
}

export default GameOverModal;

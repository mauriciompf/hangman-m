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
    if (correctLetters.length === randomWord?.replaceAll(" ", "")!.length)
      setIsWin(true);

    if (incorrectLetters.length === 6) setIsLose(true);
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

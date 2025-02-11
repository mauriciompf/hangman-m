import { useHangManContext } from "../contexts/useHangManContext";
import WinModal from "./WinModal";
import LoseModal from "./LoseModal";

function GameOverModal() {
  const { correctLetters, incorrectLetters, words } = useHangManContext();

  return (
    <>
      {correctLetters.length - 1 === words.length && <WinModal />}
      {incorrectLetters.length === 6 && <LoseModal />}
    </>
  );
}

export default GameOverModal;

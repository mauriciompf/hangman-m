import { useHangManContext } from "../contexts/useHangManContext";
import GameOverModal from "./GameOverModal";
import HangmanFigure from "./HangmanFigure";
import LetterInput from "./LetterInput";
import WordDisplay from "./WordDisplay";

function GameBoard() {
  const { isOver } = useHangManContext();

  return (
    <>
      <GameOverModal />
      <div className={`${isOver && "cursor-default opacity-50"} `}>
        <HangmanFigure />
        <WordDisplay />
        <LetterInput />
      </div>
    </>
  );
}

export default GameBoard;

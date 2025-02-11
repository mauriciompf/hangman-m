import { HangManContextProvider } from "../contexts/useHangManContext";
import GameOverModal from "./GameOverModal";
import HangmanFigure from "./HangmanFigure";
import LetterInput from "./LetterInput";
import WordDisplay from "./WordDisplay";

function GameBoard() {
  return (
    <HangManContextProvider>
      <GameOverModal />
      <HangmanFigure />
      <WordDisplay />
      <LetterInput />
    </HangManContextProvider>
  );
}

export default GameBoard;

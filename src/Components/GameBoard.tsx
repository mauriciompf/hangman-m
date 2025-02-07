import { HangManContextProvider } from "../contexts/useHangManContext";
import HangmanFigure from "./HangmanFigure";
import LetterInput from "./LetterInput";
import WordDisplay from "./WordDisplay";

function GameBoard() {
  return (
    <HangManContextProvider>
      <HangmanFigure />
      <WordDisplay />
      <LetterInput />
    </HangManContextProvider>
  );
}

export default GameBoard;

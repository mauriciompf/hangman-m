import HangmanFigure from "./HangmanFigure";
import LetterInput from "./LetterInput";
import WordDisplay from "./WordDisplay";

function GameBoard() {
  return (
    <div>
      <HangmanFigure />
      <WordDisplay />
      <LetterInput />
    </div>
  );
}

export default GameBoard;

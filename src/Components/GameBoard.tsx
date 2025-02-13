import { useEffect } from "react";
import { useHangManContext } from "../contexts/useHangManContext";
import GameOverModal from "./GameOverModal";
import HangmanFigure from "./HangmanFigure";
import LetterInput from "./LetterInput";
import WordDisplay from "./WordDisplay";

function GameBoard() {
  const { isOver, topics, setRandomWord, randomWord } = useHangManContext();

  const randomNumber = (n: number) => Math.floor(Math.random() * n);

  useEffect(() => {
    if (topics && topics.length > 0) {
      const topicNames = topics.map((a) => a.topic);
      setRandomWord(topicNames[randomNumber(topicNames.length)]);
    }
  }, [topics, setRandomWord]);

  // ! Store Topic

  return (
    <>
      <GameOverModal />
      <div className={`${isOver && "cursor-default opacity-50"}`}>
        <HangmanFigure />
        <p className="relative -bottom-10 text-center">{randomWord}</p>
        <WordDisplay />
        <LetterInput />
      </div>
    </>
  );
}

export default GameBoard;

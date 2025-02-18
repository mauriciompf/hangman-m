import { useEffect } from "react";
import { useHangManContext } from "../contexts/useHangManContext";
import GameOverModal from "./GameOverModal";
import HangmanFigure from "./HangmanFigure";
import LetterInput from "./LetterInput";
import WordDisplay from "./WordDisplay";
import randomNumber from "../utils/randomNumber";

function GameBoard() {
  const { isOver, topics, setRandomTopic, randomTopic } = useHangManContext();

  useEffect(() => {
    const getRandomTopic = JSON.parse(localStorage.getItem("topic") as string);

    if (!getRandomTopic && topics && topics.length > 0) {
      const topicNames = topics.map((a) => a.topic);
      setRandomTopic(topicNames[randomNumber(topicNames.length)]);
    }

    if (randomTopic) {
      localStorage.setItem("topic", JSON.stringify(randomTopic));
    }
  }, [topics, setRandomTopic, randomTopic]);

  return (
    <>
      <GameOverModal />
      <div className={`${isOver && "cursor-default opacity-50"}`}>
        <div>
          <button className="absolute top-6 left-6 cursor-pointer border border-black p-2">
            Reset Word
          </button>
        </div>

        <HangmanFigure />

        <p className="relative -bottom-10 text-center">{randomTopic}</p>

        <WordDisplay />
        <LetterInput />
      </div>
    </>
  );
}

export default GameBoard;

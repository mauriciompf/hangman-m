import { useEffect, useState } from "react";
import { useHangManContext } from "../contexts/useHangManContext";
import GameOverModal from "./GameOverModal";
import HangmanFigure from "./HangmanFigure";
import LetterInput from "./LetterInput";
import WordDisplay from "./WordDisplay";
import randomNumber from "../utils/randomNumber";
import useNextWord from "../customHooks/useNextWord";

function GameBoard() {
  const {
    isOver,
    topics,
    setRandomTopic,
    randomTopic,
    setIsReset,
    letterInput,
  } = useHangManContext();
  const { resetGameState } = useNextWord();
  const [seconds, setSeconds] = useState<string | number>("00");
  const [minutes, setMinutes] = useState<string | number>("00");

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

  const addZero = (n: string | number) => {
    return parseInt(n as string) < 10 ? "0" + n : String(n);
  };

  useEffect(() => {
    if (letterInput) {
      const interval = setInterval(() => {
        setSeconds((prev) => addZero((Number(prev) + 1) % 60));

        if (seconds === "59") {
          setMinutes((prevMinutes) => addZero((Number(prevMinutes) + 1) % 60));
        }

        if (minutes === "59") {
          setMinutes((prevMinutes) => addZero((Number(prevMinutes) + 1) % 60));
          setSeconds("00");
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [seconds, letterInput, isOver]);

  return (
    <>
      <GameOverModal />
      <div className={`${isOver && "cursor-default opacity-50"}`}>
        <div className="absolute top-6 left-6">
          <button
            onClick={() => {
              resetGameState();
              setIsReset(false);
            }}
            className="cursor-pointer border border-black p-2"
          >
            Reset Word
          </button>

          <div className="mt-2 text-center font-mono">
            {minutes}:{seconds}
          </div>
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

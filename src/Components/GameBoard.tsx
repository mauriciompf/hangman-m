import { useEffect, useRef } from "react";
import { useHangManContext } from "../contexts/useHangManContext";
import GameOverModal from "./GameOverModal";
import HangmanFigure from "./HangmanFigure";
import LetterInput from "./LetterInput";
import WordDisplay from "./WordDisplay";
import randomNumber from "../utils/randomNumber";
import useNextWord from "../customHooks/useNextWord";
import { useTimeContext } from "../contexts/timeContext";

function GameBoard() {
  const {
    letterInput,
    isOver,
    topics,
    setRandomTopic,
    randomTopic,
    setIsReset,
  } = useHangManContext();

  const { seconds, setSeconds, minutes, setMinutes } = useTimeContext();
  const { resetGameState } = useNextWord();

  const timerRef = useRef<number | undefined | null>(null);

  const addZero = (n: string | number) =>
    parseInt(n as string) < 10 ? "0" + n : String(n);

  useEffect(() => {
    if (!timerRef.current && letterInput) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => addZero((Number(prev) + 1) % 60));

        setMinutes((prevMinutes) => {
          if (seconds === "59") return addZero((Number(prevMinutes) + 1) % 60);
          return prevMinutes;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [seconds, letterInput]);

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

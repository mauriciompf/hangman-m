import { useEffect } from "react";
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

  const { setTime, time } = useTimeContext();
  const { resetGameState } = useNextWord();

  const addZero = (x: number | string) => ("0" + x).slice(-2);

  useEffect(() => {
    if (letterInput) {
      const intervalId = setInterval(() => {
        localStorage.setItem("time", JSON.stringify(time));

        return setTime(Number(time) + 1);
      }, 10);

      return () => clearInterval(intervalId);
    }
  }, [time, letterInput]);

  const seconds = addZero(Math.floor((Number(time) % 6000) / 100));
  const minutes = addZero(Math.floor((Number(time) % 360000) / 6000));

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

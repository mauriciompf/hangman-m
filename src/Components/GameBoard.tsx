import { useEffect, useRef, useState } from "react";
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
    isWin,
    isLose,
    isReset,
  } = useHangManContext();

  const { setTime, time } = useTimeContext();
  const { resetGameState } = useNextWord();
  const timerRef = useRef<number | undefined>(undefined);
  const [showHint, setShowHint] = useState(false);

  const addZero = (x: number | string) => ("0" + x).slice(-2);

  useEffect(() => {
    if (!letterInput) return;

    if (!isOver) {
      timerRef.current = setInterval(() => {
        localStorage.setItem("time", JSON.stringify(time));

        return setTime(Number(time) + 1);
      }, 10);
    } else {
      return () => {
        if (timerRef.current !== undefined) {
          clearInterval(timerRef.current);
          timerRef.current = undefined;
        }
      };
    }

    return () => {
      if (timerRef.current !== undefined) clearInterval(timerRef.current);
    };
  }, [time, letterInput, isOver]);

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

  const topicObj = topics.find((obj) => obj.topic === randomTopic) as
    | { words: { hint: string }[] }
    | undefined;

  const hint = topicObj?.words[0]?.hint;

  return (
    <div className="h-full bg-[#172525] py-12 md:px-30">
      <GameOverModal />
      <div
        className={`${(isWin || isLose || isReset) && "cursor-default opacity-50 transition-opacity"}`}
      >
        <div className={`absolute top-8 left-6 md:top-12 md:left-32`}>
          <div className="py-1 text-center font-mono text-xl text-amber-300 md:mb-2">
            {minutes}:{seconds}
          </div>

          <button
            onClick={() => {
              resetGameState();
              setIsReset(false);
            }}
            disabled={isWin || isLose || isReset}
            className={`${(isWin || isLose || isReset) && "!cursor-default"} cursor-pointer rounded-sm border border-black bg-white p-2 transition-colors hover:bg-[#585858] hover:text-white focus:bg-[#585858] focus:text-white`}
          >
            Reset Word
          </button>
        </div>

        <HangmanFigure />
        <p className="relative -bottom-10 text-center text-3xl font-bold tracking-wide text-white">
          {randomTopic}
        </p>

        <WordDisplay />
        <LetterInput />

        <div className="mt-14 grid place-items-center md:absolute md:top-12 md:right-32">
          <div
            className="cursor-pointer rounded-sm bg-amber-500 px-4 py-3 text-center font-bold text-white transition-colors hover:bg-amber-600 md:py-2"
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
          >
            HINT
          </div>

          {showHint && (
            <div className="absolute -bottom-20 rounded-sm bg-amber-100 p-2 text-center italic md:-bottom-13">
              {hint}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameBoard;

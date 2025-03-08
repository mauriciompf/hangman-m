import { useEffect, useState } from "react";
import { closeIcon } from "./Icons";
import { useHangManContext } from "../contexts/useHangManContext";
import useNextWord from "../customHooks/useNextWord";
import addZero from "../utils/addZero";
import { useTimeContext } from "../contexts/timeContext";

function LoseModal() {
  const { setIsOver, randomWord, setIsLose, incorrectLetters } =
    useHangManContext();
  const { time } = useTimeContext();

  const { resetGameState, selectNewWord } = useNextWord();

  const seconds = addZero(Math.floor((Number(time) % 6000) / 100));
  const minutes = addZero(Math.floor((Number(time) % 360000) / 6000));

  const [showWord, setShowWord] = useState(false);

  useEffect(() => setIsOver(true), [setIsOver]);

  const handleCloseModal = () => setIsLose(false);

  const handleAnotherWord = () => {
    handleCloseModal();

    resetGameState();
    selectNewWord();
  };

  const handleTryAgain = () => {
    handleCloseModal();

    resetGameState();
  };

  return (
    <div className="absolute top-[50%] left-[50%] z-10 w-[250px] -translate-x-[50%] -translate-y-[50%] rounded-sm bg-gray-300 p-6">
      <h1 className="text-center text-2xl font-bold">You Lose!</h1>

      <div className="mt-4 grid gap-2">
        <div className="grid pr-4">
          <p className="flex justify-between">
            Word:
            <span
              onClick={() => setShowWord(true)}
              className={`${!showWord && "cursor-pointer bg-gray-500"}`}
            >
              <span className={`${!showWord && "relative -z-10"}`}>
                {randomWord}
              </span>
            </span>
          </p>
          <p className="flex justify-between">
            Incorrect guesses: <span>{incorrectLetters.length}</span>
          </p>
          <p className="flex justify-between">
            Timer:{" "}
            <span>
              {minutes}:{seconds}
            </span>
          </p>
        </div>
        <div className="flex gap-4 font-bold">
          <button
            onClick={handleAnotherWord}
            className="cursor-pointer rounded-sm bg-white py-2 transition-colors hover:bg-[#585858] hover:text-white focus:bg-[#585858] focus:text-white"
          >
            Try another word
          </button>
          <button
            onClick={handleTryAgain}
            className="cursor-pointer rounded-sm bg-white py-2 transition-colors hover:bg-[#585858] hover:text-white focus:bg-[#585858] focus:text-white"
          >
            Reset word
          </button>
        </div>
      </div>

      <button
        onClick={handleCloseModal}
        className="absolute top-3 right-4 cursor-pointer"
      >
        {closeIcon}
      </button>
    </div>
  );
}

export default LoseModal;

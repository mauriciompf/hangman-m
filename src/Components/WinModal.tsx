import { useEffect, useRef } from "react";
import { closeIcon } from "./Icons";
import { useHangManContext } from "../contexts/useHangManContext";
import useNextWord from "../customHooks/useNextWord";
import { useTimeContext } from "../contexts/timeContext";
import addZero from "../utils/addZero";

function WinModal() {
  const { time } = useTimeContext();
  const {
    setIsOver,
    randomWord,
    topics,
    setIsWin,
    setPrevWords,
    incorrectLetters,
  } = useHangManContext();
  const { resetGameState, selectNewWord } = useNextWord();

  const winRef = useRef<HTMLDivElement | null>(null);

  const seconds = addZero(Math.floor((Number(time) % 6000) / 100));
  const minutes = addZero(Math.floor((Number(time) % 360000) / 6000));

  useEffect(() => setIsOver(true), []);

  const handleCloseModal = () => setIsWin(false);

  const handleNextWord = () => {
    const getWord = JSON.parse(localStorage.getItem("word")!);
    setPrevWords((prev) => [...prev, getWord]);

    if (!topics) return;

    handleCloseModal();
    resetGameState();
    selectNewWord();
  };

  return (
    <div
      ref={winRef}
      className="absolute top-[50%] left-[50%] z-10 w-[250px] -translate-x-[50%] -translate-y-[50%] rounded-sm bg-gray-300 p-6"
    >
      <h1 className="text-center text-2xl font-bold">You Win!</h1>

      <div className="mt-4 grid gap-4">
        <button
          onClick={handleNextWord}
          className="mx-auto cursor-pointer rounded-sm bg-black px-4 py-2 text-white transition-colors hover:bg-[#585858] hover:text-white focus:bg-[#585858] focus:text-white"
        >
          Next word
        </button>

        <div className="grid pr-4">
          <p className="flex justify-between">
            Word: <span>{randomWord}</span>
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

export default WinModal;

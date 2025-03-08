import { useEffect, useState } from "react";
import { closeIcon } from "./Icons";
import { useHangManContext } from "../contexts/useHangManContext";
import useNextWord from "../customHooks/useNextWord";

function LoseModal() {
  const { setIsOver, randomWord, setIsLose } = useHangManContext();
  const { resetGameState, selectNewWord } = useNextWord();

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
        <div>
          Word:{" "}
          <span
            onClick={() => setShowWord(true)}
            className={`${!showWord && "cursor-pointer bg-gray-500"}`}
          >
            <span className={`${!showWord && "relative -z-10"}`}>
              {randomWord}
            </span>
          </span>
          <p>Hour: </p>
          <p>Incorrect guesses: </p>
          <p>Timer: </p>
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

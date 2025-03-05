import { useEffect, useRef } from "react";
import { closeIcon } from "./Icons";
import { useHangManContext } from "../contexts/useHangManContext";
import useNextWord from "../customHooks/useNextWord";

function WinModal() {
  const winRef = useRef<HTMLDivElement | null>(null);

  const { setIsOver, randomWord, topics, setIsWin, setPrevWords } =
    useHangManContext();
  const { resetGameState, selectNewWord } = useNextWord();

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

      <div className="mt-4 grid gap-2">
        <button
          onClick={handleNextWord}
          className="mx-auto cursor-pointer rounded-sm bg-black px-4 py-2 text-white transition-colors hover:bg-[#585858] hover:text-white focus:bg-[#585858] focus:text-white"
        >
          Next word
        </button>

        <p>Word: {randomWord}</p>
        <p>Hour: </p>
        <p>Incorrect guesses: </p>
        <p>Timer: </p>
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

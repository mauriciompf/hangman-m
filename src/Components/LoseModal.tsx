import { useEffect, useRef, useState } from "react";
import { closeIcon } from "./Icons";
import { useHangManContext } from "../contexts/useHangManContext";

function LoseModal() {
  const loseRef = useRef<HTMLDivElement | null>(null);

  const { setIsOver, randomWord } = useHangManContext();
  const [showWord, setShowWord] = useState(false);

  useEffect(() => {
    setIsOver(true);
  }, [setIsOver]);

  const handleCloseModal = () => {
    loseRef.current?.remove();
    setIsOver(false);
  };

  return (
    <div
      ref={loseRef}
      className="absolute top-[50%] left-[50%] z-10 w-[250px] -translate-x-[50%] -translate-y-[50%] bg-gray-300 p-6"
    >
      <h1 className="text-center text-2xl font-bold">You Lose!</h1>

      <div className="mt-4 grid gap-2">
        <p>
          Word:{" "}
          <span
            onClick={() => setShowWord(true)}
            className={`${!showWord && "cursor-pointer bg-gray-500"}`}
          >
            <span className={`${!showWord && "relative -z-10"}`}>
              {randomWord}
            </span>
          </span>
        </p>
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

export default LoseModal;

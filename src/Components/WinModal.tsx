import { useEffect, useRef } from "react";
import { closeIcon } from "./Icons";
import { useHangManContext } from "../contexts/useHangManContext";
import randomNumber from "../utils/randomNumber";

function WinModal() {
  const winRef = useRef<HTMLDivElement | null>(null);

  const {
    setIsOver,
    randomWord,
    setIncorrectLetters,
    setCorrectLetters,
    topics,
    randomTopic,
    setRandomWord,
    setRandomTopic,
  } = useHangManContext();

  useEffect(() => {
    setIsOver(true);
  }, [setIsOver]);

  const handleCloseModal = () => {
    winRef.current?.remove();
    setIsOver(false);
  };

  const handleNextWord = () => {
    setIncorrectLetters([]);
    setCorrectLetters([]);

    handleCloseModal();

    if (topics && topics.length > 0) {
      const topicNames = topics.map((a) => a.topic);
      setRandomTopic(topicNames[randomNumber(topicNames.length)]);
      localStorage.setItem("topic", JSON.stringify(randomTopic));
    }

    const currentTopic = topics.find((obj) => obj.topic === randomTopic);

    if (currentTopic) {
      setRandomWord(
        currentTopic.words[randomNumber(currentTopic.words.length)],
      );
      localStorage.setItem("word", JSON.stringify(randomWord));
    }
  };

  return (
    <div
      ref={winRef}
      className="absolute top-[50%] left-[50%] z-10 w-[250px] -translate-x-[50%] -translate-y-[50%] bg-gray-300 p-6"
    >
      <h1 className="text-center text-2xl font-bold">You Win!</h1>

      <div className="mt-4 grid gap-2">
        <button
          onClick={handleNextWord}
          className="mx-auto cursor-pointer bg-black px-4 py-2 text-white"
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

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
    setRandomWord,
    setRandomTopic,
    setLetterInput,
    setIsWin,
    isWin,
    setPrevWords,
    prevWords,
  } = useHangManContext();

  useEffect(() => {
    setIsOver(true);
  }, [setIsOver, prevWords, isWin]);

  const handleCloseModal = () => {
    setIsOver(false);
    setIsWin(false);
  };

  const handleNextWord = () => {
    const getWord = JSON.parse(localStorage.getItem("word")!);
    setPrevWords((prev) => [...prev, getWord]);

    if (!topics) return;

    setIncorrectLetters([]);
    setCorrectLetters([]);
    setLetterInput("");

    handleCloseModal();

    const topicNames = topics.map((a) => a.topic);
    const newTopic = topicNames[randomNumber(topicNames.length)];
    setRandomTopic(newTopic);
    localStorage.setItem("topic", JSON.stringify(newTopic));

    const currentTopic = topics.find((obj) => obj.topic === newTopic);

    if (currentTopic) {
      let newWord;
      let attempts = 0;
      const maxAttempts = currentTopic.words.length;

      do {
        newWord = currentTopic.words[randomNumber(currentTopic.words.length)];
        attempts++;
      } while (prevWords.includes(newWord) && attempts < maxAttempts);

      setRandomWord(newWord);
      localStorage.setItem("word", JSON.stringify(newWord));
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

import { useEffect } from "react";
import { useHangManContext } from "../contexts/useHangManContext";

function WordDisplay() {
  const {
    correctLetters,
    randomTopic,
    loading,
    topics,
    setRandomWord,
    randomWord,
  } = useHangManContext();

  const randomNumber = (n: number) => Math.floor(Math.random() * n);

  useEffect(() => {
    if (!topics && !randomTopic) return;

    const currentTopic = topics.find((obj) => obj.topic === randomTopic);

    if (currentTopic) {
      setRandomWord(
        currentTopic.words[randomNumber(currentTopic.words.length)],
      );
    }
  }, [topics, randomTopic]);

  return (
    loading &&
    randomWord && (
      <div className="mt-20">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-15">
          {randomWord.split("").map((letter, index) => (
            <div key={index} className="grid place-items-center">
              <div className="h-10 text-3xl font-bold select-none">
                {correctLetters.includes(letter) ? letter : ""}
              </div>
              <div className="h-1.5 w-13 bg-black"></div>
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default WordDisplay;

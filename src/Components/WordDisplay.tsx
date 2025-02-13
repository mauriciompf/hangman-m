import { useEffect } from "react";
import { useHangManContext } from "../contexts/useHangManContext";

function WordDisplay() {
  const {
    words,
    letterInput,
    correctLetters,
    setCorrectLetters,
    setIncorrectLetters,
    topics,
    randomWord,
    loading,
    setRandomWord,
  } = useHangManContext();

  const randomNumber = (n: number) => Math.floor(Math.random() * n);

  useEffect(() => {
    if (topics && topics.length > 0) {
      const topicNames = topics.map((a) => a.topic);
      setRandomWord(topicNames[randomNumber(topicNames.length)]);
    }
  }, [topics, setRandomWord]);

  // ! Get word from topic
  // ! Store word

  // useEffect(() => {
  //   if (
  //     randomWord.includes(letterInput) &&
  //     !correctLetters.includes(letterInput)
  //   ) {
  //     setCorrectLetters((prev) => [letterInput, ...prev]);
  //   }

  //   if (!randomWord.includes(letterInput)) {
  //     setIncorrectLetters((prev) => [letterInput, ...prev]);
  //   }
  // }, [
  //   letterInput,
  //   setCorrectLetters,
  //   setIncorrectLetters,
  //   randomWord,
  //   correctLetters,
  // ]);

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

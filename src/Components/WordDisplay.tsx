import { useEffect } from "react";
import { useHangManContext } from "../contexts/useHangManContext";
import randomNumber from "../utils/randomNumber";

function WordDisplay() {
  const {
    correctLetters,
    randomTopic,
    loading,
    topics,
    setRandomWord,
    randomWord,
    letterInput,
    setCorrectLetters,
    setIncorrectLetters,
  } = useHangManContext();

  useEffect(() => {
    if (!topics && !randomTopic) return;

    const getRandomWord = JSON.parse(localStorage.getItem("word")!);

    const currentTopic = topics.find((obj) => obj.topic === randomTopic);

    if (!getRandomWord && currentTopic) {
      setRandomWord(
        currentTopic.words[randomNumber(currentTopic.words.length)],
      );
    }

    if (randomWord && letterInput) {
      localStorage.setItem("word", JSON.stringify(randomWord));

      const wordUpperCase = randomWord.toUpperCase();
      const occurrences = wordUpperCase
        .split("")
        .filter((l) => l === letterInput);

      if (occurrences.length > 0) {
        setCorrectLetters((prev) => [...prev, ...occurrences]);
      }

      if (!wordUpperCase.includes(letterInput)) {
        setIncorrectLetters((prev) => [...prev, letterInput]);
      }
    }
  }, [topics, randomTopic, letterInput, randomWord]);

  // console.log("randomTopic", randomTopic);
  // console.log("randomWord", randomWord, randomWord?.length);

  return (
    loading &&
    randomWord && (
      <div className="mt-20">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-15">
          {randomWord
            .toUpperCase()
            .split("")
            .map((letter, index) => (
              <div
                key={index}
                className={`grid place-items-center ${letter.includes(" ") && "invisible w-[15px]"}`}
              >
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

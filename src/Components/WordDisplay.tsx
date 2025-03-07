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
    incorrectLetters,
  } = useHangManContext();

  useEffect(() => {
    if (!topics && !randomTopic) return;

    const getRandomWord = JSON.parse(localStorage.getItem("word")!);

    const topicObj = topics.find((obj) => obj.topic === randomTopic) as
      | { words: { word: string }[] }
      | undefined;

    if (!getRandomWord && topicObj) {
      setRandomWord(topicObj.words[randomNumber(topicObj.words.length)].word);
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

  useEffect(() => {
    localStorage.setItem("correctLetters", JSON.stringify(correctLetters));
    localStorage.setItem("incorrectLetters", JSON.stringify(incorrectLetters));
  }, [correctLetters, incorrectLetters]);

  return (
    loading &&
    randomWord && (
      <div className="mt-14">
        <div className="mx-auto flex w-[80%] flex-wrap justify-center gap-x-4 gap-y-2 md:w-[100%] md:gap-y-12">
          {randomWord
            .toUpperCase()
            .split("")
            .map((letter, index) => (
              <div
                key={index}
                className={`grid place-items-center ${letter.includes(" ") && "invisible w-[15px]"}`}
              >
                <div className="h-10 text-3xl font-bold text-yellow-300 select-none">
                  {correctLetters.includes(letter) ? letter : ""}
                </div>
                <div className="h-1.5 w-8 rounded-sm bg-white md:w-13"></div>
              </div>
            ))}
        </div>
      </div>
    )
  );
}

export default WordDisplay;

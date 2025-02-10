import { useEffect } from "react";
import { useHangManContext } from "../contexts/useHangManContext";

function WordDisplay() {
  const {
    words,
    letterInput,
    correctLetters,
    setCorrectLetters,
    setIncorrectLetters,
  } = useHangManContext();

  useEffect(() => {
    if (words.includes(letterInput) && !correctLetters.includes(letterInput)) {
      setCorrectLetters((prev) => [letterInput, ...prev]);
    }

    if (!words.includes(letterInput)) {
      setIncorrectLetters((prev) => [letterInput, ...prev]);
    }
  }, [
    letterInput,
    setCorrectLetters,
    setIncorrectLetters,
    words,
    correctLetters,
  ]);

  return (
    <div className="mt-20">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-15">
        {words.split("").map((letter, index) => (
          <div key={index} className="grid place-items-center">
            <div className="h-10 text-3xl font-bold select-none">
              {correctLetters.includes(letter) ? letter : ""}
            </div>
            <div className="h-1.5 w-13 bg-black"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordDisplay;

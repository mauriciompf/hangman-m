import { useEffect } from "react";
import { useHangManContext } from "../contexts/useHangManContext";

function LetterInput() {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  const {
    setLetterInput,
    correctLetters,
    incorrectLetters,
    isReset,
    setIsReset,
    isLose,
    isWin,
  } = useHangManContext();

  const handleLetter = (letter: string) => {
    if (incorrectLetters.length >= 6) {
      setIsReset(true);

      return 0;
    }

    setLetterInput(letter);
  };

  useEffect(() => {
    const keyPress = (e: KeyboardEvent) => {
      if (incorrectLetters.length === 6) return;

      if (letters.includes(e.key.toUpperCase())) {
        setLetterInput(e.key.toUpperCase());
      }
    };

    window.addEventListener("keydown", keyPress);

    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, [incorrectLetters]);

  return (
    <div className="mt-10 hidden flex-wrap justify-center gap-2 min-[658px]:flex">
      {letters.map((letter) => (
        <button
          onClick={() => handleLetter(letter)}
          key={letter}
          disabled={
            correctLetters.includes(letter) || incorrectLetters.includes(letter)
          }
          className={`${
            correctLetters.includes(letter) || incorrectLetters.includes(letter)
              ? "cursor-not-allowed opacity-30"
              : `${(isWin || isLose || isReset) && "hover:opacity-100 focus:opacity-100"} cursor-pointer hover:opacity-75 focus:opacity-75`
          } ${(isWin || isLose || isReset) && "!cursor-default"} rounded-sm border-x-4 border-t-2 border-b-8 border-gray-300 bg-white p-1 px-5 font-bold select-none`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default LetterInput;

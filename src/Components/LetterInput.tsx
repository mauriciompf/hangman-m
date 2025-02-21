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
    isOver,
    setIsReset,
    isLose,
    isWin,
  } = useHangManContext();

  const handleLetter = (letter: string) => {
    if (incorrectLetters.length >= 6) {
      if (!isLose || !isWin) setIsReset(true);

      return;
    }

    setLetterInput(letter);
  };

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-2">
      {letters.map((letter) => (
        <button
          onClick={() => handleLetter(letter)}
          key={letter}
          // disabled={
          //   correctLetters.includes(letter) ||
          //   incorrectLetters.includes(letter) ||
          //   incorrectLetters.length === 6
          // }
          className={`${
            correctLetters.includes(letter) || incorrectLetters.includes(letter)
              ? "cursor-not-allowed opacity-30"
              : "cursor-pointer"
          } ${isOver && "!cursor-default"} rounded-sm border-x-4 border-t-2 border-b-8 border-gray-300 p-1 px-5 font-bold select-none`}
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default LetterInput;

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

  const { setLetterInput } = useHangManContext();

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-2">
      {letters.map((letter) => (
        <button
          onClick={() => setLetterInput(letter)}
          key={letter}
          className="cursor-pointer rounded-sm border-x-4 border-t-2 border-b-8 border-gray-300 p-1 px-5 font-bold"
        >
          {letter}
        </button>
      ))}
    </div>
  );
}

export default LetterInput;

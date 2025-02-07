import { useEffect } from "react";
import { useHangManContext } from "../contexts/useHangManContext";

function WordDisplay() {
  const { words, letterInput, correctLetters, setCorrectLetters } =
    useHangManContext();

  useEffect(() => {
    if (words.includes(letterInput)) {
      setCorrectLetters((prev) => [letterInput, ...prev]);
    }
  }, [letterInput, correctLetters]);

  console.log(correctLetters);

  return (
    <div className="mt-20">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-15">
        {words.split("").map((_, index) => (
          <div key={index} className="grid place-items-center">
            <div className="text-3xl font-bold"></div>
            <div className="h-1.5 w-13 bg-black"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WordDisplay;

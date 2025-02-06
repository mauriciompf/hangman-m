import { useState } from "react";

function WordDisplay() {
  const [words, setWords] = useState("Bulldog");

  return (
    <div className="mt-20">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-15">
        {words.split("").map((_, index) => (
          <div key={index} className="h-1.5 w-13 bg-black"></div>
        ))}
      </div>
    </div>
  );
}

export default WordDisplay;

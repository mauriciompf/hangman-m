import { useRef } from "react";
import { closeIcon } from "./Icons";

function WinModal() {
  const winRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={winRef}
      className="absolute top-[50%] left-[50%] z-10 w-[250px] -translate-x-[50%] -translate-y-[50%] bg-gray-300 p-6"
    >
      <h1 className="text-center text-2xl font-bold">You Win!</h1>

      <div className="mt-4 grid gap-2">
        <p>Hour: </p>
        <p>Incorrect guesses: </p>
        <p>Timer: </p>
      </div>

      <button
        onClick={() => winRef.current?.remove()}
        className="absolute top-3 right-4 cursor-pointer"
      >
        {closeIcon}
      </button>
    </div>
  );
}

export default WinModal;

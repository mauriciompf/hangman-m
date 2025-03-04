import { useHangManContext } from "../contexts/useHangManContext";

function HangmanFigure() {
  const { incorrectLetters } = useHangManContext();

  return (
    <div className="grid justify-center">
      <div className="relative left-55 h-[250px] w-[15px] bg-white">
        <div className="absolute top-0 right-0 h-[10px] w-[130px] bg-white">
          <div className="absolute top-0 h-[50px] w-[10px] bg-white">
            {incorrectLetters.length > 0 && (
              <div className="absolute top-12 -right-5.5 grid size-13 place-items-center rounded-full bg-black">
                <div className="top-12 -right-5.5 size-11 rounded-full bg-white"></div>
                {incorrectLetters.length > 1 && (
                  <div className="absolute -bottom-17 h-[70px] w-[10px] bg-white">
                    {incorrectLetters.length > 2 && (
                      <div className="absolute bottom-7 -left-4 h-[48px] w-[8px] rotate-50 bg-white"></div>
                    )}

                    {incorrectLetters.length > 3 && (
                      <div className="absolute -right-4 bottom-7 h-[48px] w-[8px] rotate-130 bg-white"></div>
                    )}

                    {incorrectLetters.length > 4 && (
                      <div className="absolute -bottom-10 -left-3 h-[50px] w-[8px] rotate-30 bg-white"></div>
                    )}

                    {incorrectLetters.length > 5 && (
                      <div className="absolute -right-3 -bottom-10 h-[50px] w-[8px] rotate-150 bg-white"></div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="h-[10px] w-[260px] rounded-sm bg-white"></div>
    </div>
  );
}

export default HangmanFigure;

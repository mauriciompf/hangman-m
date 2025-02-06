function HangmanFigure() {
  return (
    <div className="grid justify-center">
      <div className="relative left-55 h-[250px] w-[15px] bg-black">
        <div className="absolute top-0 right-0 h-[10px] w-[130px] bg-black">
          <div className="absolute top-0 h-[50px] w-[10px] bg-black">
            <div className="absolute top-12 -right-5.5 grid size-13 place-items-center rounded-full bg-black">
              <div className="top-12 -right-5.5 size-11 rounded-full bg-white"></div>
              <div className="absolute -bottom-17 h-[70px] w-[10px] bg-black">
                <div className="absolute bottom-7 -left-4 h-[50px] w-[8px] rotate-50 bg-black"></div>
                <div className="absolute -right-4 bottom-7 h-[50px] w-[8px] rotate-130 bg-black"></div>
                <div className="absolute -bottom-10 -left-3 h-[50px] w-[8px] rotate-30 bg-black"></div>
                <div className="absolute -right-3 -bottom-10 h-[50px] w-[8px] rotate-150 bg-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[10px] w-[300px] bg-black"></div>
    </div>
  );
}

export default HangmanFigure;

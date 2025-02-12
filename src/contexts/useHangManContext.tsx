import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface HangManContextValues {
  words: string;
  setWords: Dispatch<SetStateAction<string>>;
  letterInput: string;
  setLetterInput: Dispatch<SetStateAction<string>>;
  correctLetters: string[];
  setCorrectLetters: Dispatch<SetStateAction<string[]>>;
  incorrectLetters: string[];
  setIncorrectLetters: Dispatch<SetStateAction<string[]>>;
  isOver: boolean;
  setIsOver: Dispatch<SetStateAction<boolean>>;
}

const HangManContext = createContext<HangManContextValues | null>(null);

function HangManContextProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<string>("BULLDOG");
  const [letterInput, setLetterInput] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [isOver, setIsOver] = useState<boolean>(false);

  return (
    <HangManContext.Provider
      value={{
        words,
        setWords,
        letterInput,
        setLetterInput,
        correctLetters,
        setCorrectLetters,
        incorrectLetters,
        setIncorrectLetters,
        isOver,
        setIsOver,
      }}
    >
      {children}
    </HangManContext.Provider>
  );
}

const useHangManContext = () => {
  const context = useContext(HangManContext);

  if (!context) throw new Error("Cannot without a provider.");

  return context;
};

export { useHangManContext, HangManContextProvider };

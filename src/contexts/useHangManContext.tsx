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
}

const HangManContext = createContext<HangManContextValues | null>(null);

function HangManContextProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<string>("BULLDOG");
  const [letterInput, setLetterInput] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);

  return (
    <HangManContext.Provider
      value={{
        words,
        setWords,
        letterInput,
        setLetterInput,
        correctLetters,
        setCorrectLetters,
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

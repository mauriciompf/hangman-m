import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface Topics {
  topic: string;
  words: string;
  id: number;
}

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
  topics: Topics[];
  setTopics: Dispatch<SetStateAction<Topics[]>>;
  randomWord: string;
  setRandomWord: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const HangManContext = createContext<HangManContextValues | null>(null);

async function getData() {
  const response = await fetch("/data.json");
  const json = await response.json();

  if (!response.ok) throw new Error("...");

  return json;
}

function HangManContextProvider({ children }: { children: React.ReactNode }) {
  const [words, setWords] = useState<string>("BULLDOG");
  const [letterInput, setLetterInput] = useState<string>("");
  const [correctLetters, setCorrectLetters] = useState<string[]>([]);
  const [incorrectLetters, setIncorrectLetters] = useState<string[]>([]);
  const [isOver, setIsOver] = useState<boolean>(false);
  const [topics, setTopics] = useState<Topics[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [randomWord, setRandomWord] = useState<string>("");

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await getData();
        setTopics(data);
        setLoading(true);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    getTopics();
  }, []);

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
        topics,
        setTopics,
        randomWord,
        setRandomWord,
        loading,
        setLoading,
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

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface timeContextValues {
  seconds: string | number;
  setSeconds: Dispatch<SetStateAction<string | number>>;
  minutes: string | number;
  setMinutes: Dispatch<SetStateAction<string | number>>;
}

const timeContext = createContext<timeContextValues | null>(null);

function TimeContextProvider({ children }: { children: React.ReactNode }) {
  const [seconds, setSeconds] = useState<string | number>("00");
  const [minutes, setMinutes] = useState<string | number>("00");

  return (
    <timeContext.Provider
      value={{
        seconds,
        setSeconds,
        minutes,
        setMinutes,
      }}
    >
      {children}
    </timeContext.Provider>
  );
}

const useTimeContext = () => {
  const context = useContext(timeContext);

  if (!context) throw new Error("Cannot without a provider.");

  return context;
};

export { TimeContextProvider, useTimeContext };

import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface timeContextValues {
  time: string | number;
  setTime: Dispatch<SetStateAction<string | number>>;
}

const timeContext = createContext<timeContextValues | null>(null);

function TimeContextProvider({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState<string | number>(
    Number(JSON.parse(localStorage.getItem("time")!) | 0),
  );

  return (
    <timeContext.Provider
      value={{
        time,
        setTime,
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

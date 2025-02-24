import GameBoard from "./Components/GameBoard";
import { TimeContextProvider } from "./contexts/timeContext";
import { HangManContextProvider } from "./contexts/useHangManContext";

function App() {
  return (
    <main>
      <HangManContextProvider>
        <TimeContextProvider>
          <GameBoard />
        </TimeContextProvider>
      </HangManContextProvider>
    </main>
  );
}

export default App;

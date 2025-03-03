import GameBoard from "./Components/GameBoard";
import { ThemeProvider } from "./contexts/themeContext";
import { TimeContextProvider } from "./contexts/timeContext";
import { HangManContextProvider } from "./contexts/useHangManContext";

function App() {
  return (
    <ThemeProvider>
      <main>
        <HangManContextProvider>
          <TimeContextProvider>
            <GameBoard />
          </TimeContextProvider>
        </HangManContextProvider>
      </main>
    </ThemeProvider>
  );
}

export default App;

import GameBoard from "./Components/GameBoard";
import { HangManContextProvider } from "./contexts/useHangManContext";

function App() {
  return (
    <main>
      <HangManContextProvider>
        <GameBoard />
      </HangManContextProvider>
    </main>
  );
}

export default App;

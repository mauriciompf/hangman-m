import { useHangManContext } from "../contexts/useHangManContext";
import useNextWord from "../customHooks/useNextWord";

function ResetModal() {
  const { setIsReset } = useHangManContext();

  const { resetGameState, selectNewWord } = useNextWord();

  const handleCloseModal = () => {
    setIsReset(false);
  };

  const handleResetWord = () => {
    handleCloseModal();
    resetGameState();
  };

  const handleAnotherWord = () => {
    handleResetWord();
    selectNewWord();
  };

  return (
    <div className="absolute top-[50%] left-[50%] z-10 w-[250px] -translate-x-[50%] -translate-y-[50%] rounded-sm bg-gray-300 p-6">
      <div className="flex gap-4">
        <button
          onClick={handleAnotherWord}
          className="cursor-pointer rounded-sm bg-white font-bold transition-colors hover:bg-[#585858] hover:text-white focus:bg-[#585858] focus:text-white"
        >
          Try another word
        </button>
        <button
          onClick={handleResetWord}
          className="cursor-pointer rounded-sm bg-white font-bold transition-colors hover:bg-[#585858] hover:text-white focus:bg-[#585858] focus:text-white"
        >
          Reset word
        </button>
      </div>
    </div>
  );
}

export default ResetModal;

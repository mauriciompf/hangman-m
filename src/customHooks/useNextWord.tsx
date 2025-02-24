import { useTimeContext } from "../contexts/timeContext";
import { useHangManContext } from "../contexts/useHangManContext";
import randomNumber from "../utils/randomNumber";

function useNextWord() {
  const {
    setIncorrectLetters,
    setCorrectLetters,
    topics,
    setRandomWord,
    setRandomTopic,
    setLetterInput,
    prevWords,
  } = useHangManContext();

  const { setMinutes, setSeconds } = useTimeContext();

  const resetGameState = () => {
    setIncorrectLetters([]);
    setCorrectLetters([]);
    setLetterInput("");
    setMinutes("00");
    setSeconds("00");
  };

  const getRandomTopic = () => {
    const topicNames = topics.map((a) => a.topic);
    const newTopic = topicNames[randomNumber(topicNames.length)];
    setRandomTopic(newTopic);
    localStorage.setItem("topic", JSON.stringify(newTopic));

    return newTopic;
  };

  const selectNewWord = () => {
    const currentTopic = topics.find((obj) => obj.topic === getRandomTopic());

    if (currentTopic) {
      let newWord;
      let attempts = 0;
      const maxAttempts = currentTopic.words.length;

      do {
        newWord = currentTopic.words[randomNumber(currentTopic.words.length)];
        attempts++;
      } while (prevWords.includes(newWord) && attempts < maxAttempts);

      setRandomWord(newWord);
      localStorage.setItem("word", JSON.stringify(newWord));
    }
  };

  return {
    resetGameState,
    selectNewWord,
  };
}

export default useNextWord;

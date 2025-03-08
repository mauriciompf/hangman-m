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
    setIsOver,
  } = useHangManContext();

  const { setTime } = useTimeContext();

  const getRandomTopic = () => {
    const topicNames = topics.map((obj) => obj.topic);
    const newTopic = topicNames[randomNumber(topicNames.length)];
    setRandomTopic(newTopic);
    localStorage.setItem("topic", JSON.stringify(newTopic));

    return newTopic;
  };

  const resetGameState = () => {
    setIncorrectLetters([]);
    setCorrectLetters([]);
    setLetterInput("");
    setTime(0);
    setIsOver(false);
    localStorage.setItem("time", JSON.stringify(0));
  };

  const selectNewWord = () => {
    const topicObj = topics.find((obj) => obj.topic === getRandomTopic()) as
      | { words: { word: string }[] }
      | undefined;

    if (topicObj) {
      // console.log(topicObj.words[randomNumber(topicObj.words.length)].word)

      let newWord;
      let attempts = 0;
      const maxAttempts = topicObj.words.length;

      do {
        newWord = topicObj.words[randomNumber(topicObj.words.length)].word;
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

import { useEffect, useState } from "react";
// import ViewAllWordsResultsContainer from "./ViewAllWordsResultsContainer.js";
import { Word } from "../types/Word";

export default function ViewAllWords() {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/words`)
      .then((res) => res.json())
      .then((res) => {
        setWords(res), setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      View All {words.length > 0 && !isLoading ? words.length : null} Words{" "}
      {words.length > 0 && !isLoading
        ? words.map((word: Word) => {
            return <p key={word.id}>{word.word_name}</p>;
          })
        : words.length === 0 && !isLoading
        ? " - No words found"
        : null}
    </>
  );
}

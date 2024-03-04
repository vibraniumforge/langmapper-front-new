import { useEffect, useState } from "react";
import { Word } from "../types/Word.js";
import ViewAllWordsResultCard from "../components/ViewAllWordsResultCard.tsx";
import "../styles/word-results-card.css";

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

  const wordCards =
    words.length > 0 && !isLoading
      ? words.map((word) => {
          return <ViewAllWordsResultCard key={word.id} word={word} />;
        })
      : words.length === 0 && !isLoading
      ? " - No words found"
      : null;

  return (
    <>
      View All {words.length > 0 && !isLoading ? words.length : null} Words{" "}
      <div id="card-container">{wordCards}</div>;
    </>
  );
}

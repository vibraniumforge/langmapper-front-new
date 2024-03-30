import { Word } from "../types/Word";

interface ViewAllWordsResultsCardProps {
  word: Word;
}

export default function ViewAllWordsResultCard({
  word,
}: ViewAllWordsResultsCardProps) {
  return (
    <div className="translation-result-card">
      <p>
        <strong>ID: </strong>
        {word.id}
      </p>
      <p>
        <strong>Name: </strong>
        {word.word_name} {word.emoji ? " - " + word.emoji : ""}
      </p>

      <p>
        <strong>Definition: </strong>
        {word.definition}
      </p>
    </div>
  );
}

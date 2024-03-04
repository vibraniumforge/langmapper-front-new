import { Language } from "../types/Language";
import "../styles/language-results-card.css";

interface ViewAllLanguagesResultsCardProps {
  language: Language;
}

export default function ViewAllLanguagesResultCard({
  language,
}: ViewAllLanguagesResultsCardProps) {
  return (
    <div className="language-result-card">
      <p>
        <strong>ID: </strong>
        {language.id}
      </p>
      <p>
        <strong>Name: </strong>
        {language.name}
      </p>
      <p>
        <strong>Abbreviation: </strong>
        {language.abbreviation}
      </p>
      <p>
        <strong>Alphabet: </strong>
        {language.alphabet}
      </p>
      <p>
        <strong>Macrofamily: </strong>
        {language.macrofamily}
      </p>
      <p>
        <strong>Family: </strong>
        {language.family}
      </p>
      <p>
        <strong>Subfamily:</strong> {language.subfamily}
      </p>
      <p>
        <strong>Area 1: </strong>
        {language.area1}
      </p>
      <p>
        <strong>Area 2: </strong>
        {language.area2}
      </p>
      <p>
        <strong>Area 3: </strong>
        {language.area3}
      </p>
      <p>
        <strong>Notes: </strong>
        {language.notes}
      </p>
      <p>
        <strong>Has Gender?: </strong>
        {language.has_gender.toString()}
      </p>
      <p>
        <strong>Alive: </strong>
        {language.alive.toString()}
      </p>
    </div>
  );
}

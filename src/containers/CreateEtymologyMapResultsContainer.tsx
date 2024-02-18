import CreateTranslationRow from "../components/CreateTranslationRow";
import { TranslationRow } from "../types/TranslationRow";

interface CreateTranslationMapResultsProps {
  translationResults: TranslationRow[];
  searchedWord: string;
  searchedArea: string;
  wordDefinition: string;
}
export default function CreateGenderMapResultsContainer({
  translationResults,
  searchedWord,
  searchedArea,
  wordDefinition,
}: CreateTranslationMapResultsProps) {
  const translations =
    translationResults && translationResults.length > 0
      ? translationResults.map((translation: TranslationRow) => {
          return (
            <CreateTranslationRow
              key={translation.id}
              translation={translation}
            />
          );
        })
      : null;

  return (
    <>
      <h3>Area: {searchedArea}</h3>
      <h3>
        Word: {searchedWord} - {wordDefinition}
      </h3>
      <table>
        <thead key={-1}>
          <tr key={0}>
            <th>Language</th>
            <th>Macrofamily</th>
            <th>Family</th>
            <th>Translation</th>
            <th>Romanization</th>
            <th>Gender</th>
            <th>Etymology</th>
          </tr>
        </thead>
        <tbody>{translations}</tbody>
      </table>
    </>
  );
}

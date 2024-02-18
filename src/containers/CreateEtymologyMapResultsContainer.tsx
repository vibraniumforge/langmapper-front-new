import CreateTranslationRow from "../components/CreateTranslationRow";
import { TranslationRow } from "../types/TranslationRow";

interface CreateTranslationMapResultsProps {
  translationResults: TranslationRow[];
}
export default function CreateGenderMapResultsContainer({
  translationResults,
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

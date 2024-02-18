import { TranslationRow } from "../types/TranslationRow";
import { genderColorHelper, genderHelper } from "../heleprs/genderHelper";
import "./CreateTranslationRow.css";

interface CreateTranslationMapResultsProps {
  translation: TranslationRow;
}

export default function CreateTranslationRow({
  translation,
}: CreateTranslationMapResultsProps) {
  return (
    <tr key={translation.id}>
      <td>{translation.name}</td>
      <td>
        {translation.macrofamily === "Indo-European"
          ? "I.E."
          : translation.macrofamily}
      </td>
      <td>{translation.family}</td>
      <td>{translation.translation}</td>
      <td>
        {translation.translation === translation.romanization
          ? null
          : translation.romanization}
      </td>
      <td className={genderColorHelper(translation.gender)}>
        {genderHelper(translation.macrofamily, translation.name)
          ? translation.gender
          : ""}
      </td>
      <td className="table-etymology">
        {translation.etymology ? translation.etymology : "N/A"}
      </td>
    </tr>
  );
}

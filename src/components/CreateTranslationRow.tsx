import { TranslationRow } from "../types/TranslationRow";
import { genderColorHelper, genderHelper } from "../helpers/genderHelper";
import "./CreateTranslationRow.css";
import WiktionaryLink from "./WiktionaryLink";

interface CreateTranslationMapResultsProps {
  translationRow: TranslationRow;
}

export default function CreateTranslationRow({
  translationRow,
}: CreateTranslationMapResultsProps) {
  return (
    <tr key={translationRow.id}>
      <td>
        {translationRow.name} {translationRow.flag ? translationRow.flag : ""}
      </td>
      <td>
        {translationRow.macrofamily === "Indo-European"
          ? "I.E."
          : translationRow.macrofamily}
      </td>
      <td>{translationRow.family}</td>
      <td>{translationRow.translation}</td>
      <td>
        {translationRow.translation === translationRow.romanization
          ? null
          : translationRow.romanization}
      </td>
      <td className={genderColorHelper(translationRow.gender)}>
        {genderHelper(translationRow.macrofamily, translationRow.name)
          ? translationRow.gender
          : ""}
      </td>
      <td className="table-etymology">
        <WiktionaryLink link={translationRow.link} />
        {translationRow.etymology ? translationRow.etymology : "N/A"}
      </td>
    </tr>
  );
}

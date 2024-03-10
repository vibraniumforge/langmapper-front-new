import { TranslationRow } from "../types/TranslationRow";
import { genderColorHelper, genderHelper } from "../helpers/genderHelper";
import EditAndDeleteButtons from "./EditAndDeleteButtons";

interface SearchTranslationsByLanguageResultProps {
  translation: TranslationRow;
  handleOnEdit: Function;
}

export default function SearchTranslationsByLanguageResultCard({
  translation,
  handleOnEdit,
}: SearchTranslationsByLanguageResultProps) {
  return (
    <div className="translation-result-card">
      {/* {loggedIn ? ( */}
      <div>
        <p>
          <strong>Translation Id: </strong>
          {translation.id}
        </p>
        <p>
          <strong>Language Id: </strong>
          {translation.language_id}
        </p>
        <p>
          <strong>Word Id: </strong>
          {translation.word_id}
        </p>
      </div>
      {/* ) : null} */}
      <h1>
        <i>{translation.translation}</i>
      </h1>
      {translation.translation !== translation.romanization ? (
        <h2>({translation.romanization})</h2>
      ) : null}
      {/* <p>
        <strong>Word: </strong>
        {translation.word_name}
      </p> */}
      {genderHelper(translation.macrofamily, translation.name) ? (
        <p>
          <strong>Gender: </strong>
          <strong>
            <span className={genderColorHelper(translation.gender)}>
              {translation.gender}
            </span>
          </strong>
        </p>
      ) : null}
      <p>
        <strong>Etymology: </strong>
        <span>{translation.etymology}</span>
        {/* {etymologyFormatHelper(translation.etymology)} */}
      </p>
      <>
        <EditAndDeleteButtons
          handleOnEdit={handleOnEdit}
          // onHandleDelete={onHandleDelete}
          translation={translation}
        />
      </>
      {/* <p>
        <strong>Link: </strong>
        <WiktionaryLink link={translation.link} />
      </p> */}
      {/* {loggedIn ? (
        <>
          <EditAndDeleteButtons
            onHandleEdit={onHandleEdit}
            onHandleDelete={onHandleDelete}
            translation={translation}
          />
        </>
      ) : null} */}
    </div>
  );
}

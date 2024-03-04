import { useEffect, useState } from "react";
import { TranslationRow } from "../types/TranslationRow";
import { Language } from "../types/Language";
import SearchTranslationsByLanguageResultCard from "../components/SearchTranslationsByLanguageResultCard";

export default function SearchTranslationsByLanguage() {
  const [translations, setTranslations] = useState<TranslationRow[]>();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [language, setLanguage] = useState<string>("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/languages`)
      .then((res) => res.json())
      .then((res) => setLanguages(res))
      .catch((err) => console.log(err));
  }, []);

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLanguage(e.target.value);
  }

  function handleOnSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    console.log("onHandleSubmit fires");
    e.preventDefault();
    fetch(
      `${import.meta.env.VITE_URL}/translations/search/language/${language}`
    )
      .then((res) => res.json())
      .then((res) => setTranslations(res.data))
      .catch((err) => console.log(err));
  }

  const languagesOptions =
    languages.length > 0
      ? languages.map((language) => {
          return <option key={language.id}>{language.name}</option>;
        })
      : null;

  const translationCards =
    translations?.length! > 0 && translations
      ? translations?.map((translation: TranslationRow) => {
          return (
            <SearchTranslationsByLanguageResultCard
              translation={translation}
              key={translation.id}
            />
          );
        })
      : null;

  return (
    <>
      {/* <LanguageNameAutofill languages={languages} /> */}
      <select onChange={(e) => handleOnChange(e)}>
        <option>Select a Language</option>
        {languagesOptions}
      </select>
      <button type="button" onClick={(e) => handleOnSubmit(e)}>
        Select
      </button>
      <div id="results">{translationCards}</div>
    </>
  );
}

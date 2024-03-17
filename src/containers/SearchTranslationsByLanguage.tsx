import { useEffect, useState } from "react";
import { TranslationRow } from "../types/TranslationRow";
import { Language } from "../types/Language";
import SearchTranslationsByLanguageResultCard from "../components/SearchTranslationsByLanguageResultCard";

export default function SearchTranslationsByLanguage() {
  const [translations, setTranslations] = useState<TranslationRow[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [chosenLanguage, setChosenLanguage] = useState<string>("");
  const [chosenTranslation, setChosenTranslation] =
    useState<TranslationRow | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/languages`)
      .then((res) => res.json())
      .then((res) => {
        setLanguages(res), setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleOnChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setChosenLanguage(e.target.value);
  }

  function handleOnSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    fetch(
      `${
        import.meta.env.VITE_URL
      }/translations/search/language/${chosenLanguage}`
    )
      .then((res) => res.json())
      .then((res) => setTranslations(res.data))
      .catch((err) => console.log(err));
  }

  function handleOnEdit(
    e: React.MouseEvent<HTMLButtonElement>,
    translation: TranslationRow
  ) {
    e.preventDefault();
    const token = () => localStorage.getItem("jwt");

    const headers = () => {
      return {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token()}`,
      };
    };

    const params = {
      method: "GET",
      headers: headers(),
    };
    console.log(chosenTranslation);
    fetch(`${import.meta.env.VITE_URL}/translations/${translation.id}`, params)
      .then((res) => res.json())
      .then((res) => setChosenTranslation(res))
      .catch((err) => console.log(err));
  }

  const languagesOptions =
    languages.length > 0
      ? languages.map((language: Language) => {
          return (
            <option key={language.id} value={language.id}>
              {language.name} {language?.flag ? language?.flag : ""}
            </option>
          );
        })
      : null;

  const translationCards =
    translations?.length! > 0 && !isLoading
      ? translations?.map((translation: TranslationRow) => {
          return (
            <SearchTranslationsByLanguageResultCard
              translation={translation}
              key={translation.id}
              handleOnEdit={handleOnEdit}
            />
          );
        })
      : null;

  return (
    <>
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

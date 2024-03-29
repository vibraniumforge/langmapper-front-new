import { useEffect, useState } from "react";
import { TranslationRow } from "../types/TranslationRow";
import { Word } from "../types/Word";
import CreateTranslationMapResultsContainer from "./CreateTranslationMapResultsContainer";

export default function CreateTranslationsMap() {
  const [translationResults, setTranslationResults] = useState<
    TranslationRow[]
  >([]);
  const [imageResults, setImageResults] = useState<string>();
  const [words, setWords] = useState<Word[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [chosenWord, setChosenWord] = useState<string>("silver");
  const [chosenArea, setChosenArea] = useState<string>("Europe");
  const [wordDefinition, setWordDefinition] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  /**
   * @returns - a list of all available words and geographic areas for the 2 dropdowns.
   */
  useEffect(() => {
    Promise.all([
      fetch(`${import.meta.env.VITE_URL}/words`),
      fetch(`${import.meta.env.VITE_URL}/languages/get/area_names`),
    ])
      .then(([res1, res2]) => {
        Promise.all([res1.json(), res2.json()]).then(([res1, res2]) => {
          setWords(res1), setAreas(res2.data), setIsLoading(false);
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnChangeWord = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenWord(e.target.value);
    setWordDefinition("");
  };

  const handleOnChangeArea = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenArea(e.target.value);
  };

  /**
   * @param e {HTMLFormElement}
   * @returns 1. The map. 2. The definition of the word. 3. The translation info.
   */
  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    Promise.all([
      fetch(
        `${
          import.meta.env.VITE_URL
        }/translations/search/all_translations_by_area_img/${chosenArea}/${chosenWord}`
      ),
      fetch(
        `${import.meta.env.VITE_URL}/words/search/definition/${chosenWord}`
      ),
      fetch(
        `${
          import.meta.env.VITE_URL
        }/translations/search/area/${chosenArea}/${chosenWord}`
      ),
    ])
      .then(([res1, res2, res3]) => {
        Promise.all([res1.blob(), res2.json(), res3.json()]).then(
          ([images, res2, res3]) => {
            let outside = URL.createObjectURL(images);
            setImageResults(outside);
            setWordDefinition(res2.data);
            setTranslationResults(res3.data);
            setIsLoading(false);
          }
        );
      })
      .catch((err) => console.log(err));
  };

  const allWords =
    !isLoading && words.length > 0
      ? words.map((word: Word) => {
          return <option key={word.id}>{word.word_name}</option>;
        })
      : null;

  const allAreas =
    !isLoading && areas.length > 0
      ? areas.map((area: string) => {
          return <option key={area}>{area}</option>;
        })
      : null;

  return (
    <>
      {!isLoading ? (
        <form onSubmit={(e) => handleOnSubmit(e)}>
          <select
            id="selectArea"
            name="selectedArea"
            value={chosenArea}
            onChange={(e) => handleOnChangeArea(e)}
          >
            <option value="">Select One Area</option>
            {allAreas}
          </select>
          <select
            id="selectWord"
            name="selectedWord"
            value={chosenWord}
            onChange={(e) => handleOnChangeWord(e)}
          >
            <option value="">Select One Word</option>
            {allWords}
          </select>
          <input
            id="submit-button"
            type="submit"
            value="Search"
            className={chosenWord && chosenArea ? "submit-btn" : "disabled"}
            disabled={!chosenWord && !chosenArea}
          />
        </form>
      ) : null}
      <h3>
        Area: {chosenArea} Word: {chosenWord}{" "}
        {wordDefinition ? " - " + wordDefinition : null}
      </h3>
      {imageResults && !isLoading && translationResults.length > 0 ? (
        <>
          <img
            id="etymology-map"
            src={imageResults}
            alt={chosenArea + " language map"}
          />
          <CreateTranslationMapResultsContainer
            translationResults={translationResults}
            // onHandleEdit={}
          />
        </>
      ) : null}
    </>
  );
}

import { useEffect, useState } from "react";
import { TranslationRow } from "../types/TranslationRow";
import { Word } from "../types/Word";
import CreateEtymologyMapResultsContainer from "./CreateEtymologyMapResultsContainer";

export default function CreateEtymologyMap() {
  const [translationResults, setTranslationResults] = useState<
    TranslationRow[]
  >([]);
  const [imageResults, setImageResults] = useState<string>();
  const [words, setWords] = useState<Word[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [chosenWord, setChosenWord] = useState<string>("gold");
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
        }/translations/search/all_etymologies_by_area_img/${chosenArea}/${chosenWord}`
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

  function getWordEmoji(): string {
    let wordToGetEmoji: Word;
    if (chosenWord) {
      wordToGetEmoji = words.find(
        (word: Word): boolean => word.word_name === chosenWord
      )!;
      return wordToGetEmoji?.emoji ? wordToGetEmoji.emoji : "";
    } else {
      return "";
    }
  }

  const allWords =
    words && words.length > 0 && !isLoading
      ? words.map((word: Word) => {
          return (
            <option key={word.id} value={word.word_name}>
              {`${word.word_name} ${word.emoji}`}
            </option>
          );
        })
      : null;

  const allAreas =
    areas.length > 0
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
      <h2>
        Area: {chosenArea} Word: {chosenWord} {chosenWord ? getWordEmoji() : ""}
        {wordDefinition ? " - " + wordDefinition : null}
      </h2>
      {imageResults &&
      !isLoading &&
      translationResults &&
      translationResults.length > 0 ? (
        <>
          <img src={imageResults} alt="europe language map" />
          <CreateEtymologyMapResultsContainer
            translationResults={translationResults}
            // onHandleEdit={}
          />
        </>
      ) : null}
    </>
  );
}

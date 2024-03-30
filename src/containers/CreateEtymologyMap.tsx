import { useEffect, useState } from "react";
import { TranslationRow } from "../types/TranslationRow";
import { Word } from "../types/Word";
import CreateEtymologyMapResultsContainer from "./CreateEtymologyMapResultsContainer";
import "../styles/create-etymology-map.css";

export default function CreateEtymologyMap() {
  const [translationResults, setTranslationResults] = useState<
    TranslationRow[]
  >([]);
  const [imageResults, setImageResults] = useState<string>();
  const [words, setWords] = useState<Word[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [chosenWord, setChosenWord] = useState<Word>();
  const [chosenArea, setChosenArea] = useState<string>("Europe small");
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
    const newWord = words.filter((word: Word): boolean => {
      return word.word_name === e.target.value;
    });
    setChosenWord(newWord[0]);
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
        }/translations/search/all_etymologies_by_area_img/${chosenArea}/${
          chosenWord?.word_name
        }`
      ),
      fetch(
        `${import.meta.env.VITE_URL}/translations/search/area/${chosenArea}/${
          chosenWord?.word_name
        }`
      ),
    ])
      .then(([res1, res2]) => {
        Promise.all([res1.blob(), res2.json()]).then(([images, res2]) => {
          let outside = URL.createObjectURL(images);
          setImageResults(outside);
          setTranslationResults(res2.data);
          setIsLoading(false);
        });
      })
      .catch((err) => console.log(err));
  };

  function getWordEmoji(): string {
    let wordToGetEmoji: Word;
    if (chosenWord) {
      wordToGetEmoji = words.find(
        (word: Word): boolean => word.word_name === chosenWord.word_name
      )!;
      return wordToGetEmoji?.emoji ? wordToGetEmoji.emoji : "";
    } else {
      return "";
    }
  }

  function randomWord(e: React.MouseEvent<HTMLInputElement, MouseEvent>): void {
    console.log(e);
    const wordsLength: number = words.length;
    if (wordsLength > 0) {
      const randomNumber: number = Math.floor(Math.random() * wordsLength);

      setChosenWord(words[randomNumber]);
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
        <form className="centered" onSubmit={(e) => handleOnSubmit(e)}>
          <select
            id="selectArea"
            name="selectedArea"
            value={chosenArea}
            onChange={(e) => handleOnChangeArea(e)}
          >
            <option value="">Select One Area</option>
            <option value="Europe small">Europe small</option>
            {allAreas}
          </select>
          <select
            id="selectWord"
            name="selectedWord"
            value={chosenWord?.word_name}
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
            disabled={!chosenWord || !chosenArea}
          />
          <input
            id="random-button"
            type="button"
            value="Random"
            onClick={(e) => randomWord(e)}
          />
        </form>
      ) : null}
      <div className="word-desc">
        {/* <div>
          <h2 className={chosenWord ? "visible" : "hidden"}>
            Area: {chosenArea} Word: {chosenWord?.word_name}{" "}
          </h2>
        </div> */}
        <div>
          <h1
            className={`emoji-container {chosenWord?.emoji?.length! > 0 ? "visible" : "hidden"}`}
          >
            {" "}
            {chosenWord?.word_name ? getWordEmoji() : ""}{" "}
          </h1>
        </div>
        <div>
          <h4 className={chosenWord ? "visible" : "hidden"}>
            Definition:{" "}
            {chosenWord?.definition ? " - " + chosenWord?.definition : null}{" "}
          </h4>
        </div>
      </div>
      {imageResults && !isLoading && translationResults.length > 0 ? (
        <>
          <div className="centered">
            <img src={imageResults} alt={`${chosenArea} language map`} />
          </div>
          <p className="centered">{translationResults.length} Results:</p>
          <div>
            <CreateEtymologyMapResultsContainer
              translationResults={translationResults}
              // onHandleEdit={}
            />
          </div>
        </>
      ) : null}
    </>
  );
}

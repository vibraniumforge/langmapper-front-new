import { useEffect, useState } from "react";
import { TranslationRow } from "../types/TranslationRow";
import { Word } from "../types/Word";
import { Language } from "../types/Language";
import "../styles/edit-translation-form.css";

interface FormStateProps {
  id: number;
  gender?: string;
  link: string;
  romanization: string;
  translation: string;
  etymology: string;
  language_name: string;
  word_name: string;
}

interface TranslationProps {
  translation: TranslationRow | null;
}

export default function EditTranslationForm({ translation }: TranslationProps) {
  const [formState, setFormState] = useState<FormStateProps>({
    id: translation?.id ?? 0,
    gender: translation?.gender ?? "",
    link: translation?.link ?? "",
    romanization: translation?.romanization ?? "",
    translation: translation?.translation ?? "",
    etymology: translation?.etymology ?? "",
    language_name: translation?.name ?? "",
    word_name: translation?.word_name ?? "",
  });
  const [languages, setLanguages] = useState<Language[]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [chosenWordId, setChosenWordId] = useState<string>();
  const [chosenLanguageId, setChosenLanguageId] = useState<string>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   setFormState({
  //     gender: translation?.gender ?? "",
  //     link: translation?.link ?? "",
  //     romanization: translation?.romanization ?? "",
  //     translation: translation?.translation ?? "",
  //     etymology: translation?.etymology ?? "",
  //     language_name: translation?.language_name ?? "",
  //     word_name: translation?.word_name ?? "",
  //   });
  // }, [translation]);

  useEffect(() => {
    console.log(formState);
  }, [translation]);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(`${import.meta.env.VITE_URL}/words`),
      fetch(`${import.meta.env.VITE_URL}/languages`),
    ])
      .then(([res1, res2]) => {
        return Promise.all([res1.json(), res2.json()]);
      })
      .then(([res1, res2]) => {
        setWords(res1);
        setLanguages(res2);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const token = () => localStorage.getItem("jwt");

  const handleOnChangeWord = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenWordId(e.target.value);
  };

  const handleOnChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChosenLanguageId(e.target.value);
  };

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormState((prevState: any) => {
      let helper = { ...prevState };
      helper[e.target.name] = e.target.value;
      return helper;
    });
  };

  const clearForm = (): void => {
    setFormState({
      id: 0,
      gender: "",
      link: "",
      romanization: "",
      translation: "",
      etymology: "",
      language_name: "",
      word_name: "",
    });
  };

  const handleOnDropdownSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    console.log(chosenLanguageId);
    console.log("wordID", chosenWordId);
    fetch(
      `${
        import.meta.env.VITE_URL
      }/find_translation_by_word_and_language/${chosenWordId}/${chosenLanguageId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        return setFormState({
          id: res?.data[0]?.id ?? 0,
          gender: res?.data[0]?.gender ?? "",
          link: res?.data[0]?.link ?? "",
          romanization: res?.data[0]?.romanization ?? "",
          translation: res?.data[0]?.translation ?? "",
          etymology: res?.data[0]?.etymology ?? "",
          language_name: res?.data[0]?.name ?? "",
          word_name: res?.data[0]?.word_name ?? "",
        });
      })
      .catch((err) => console.log(err));
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("formState.id", formState.id);
    fetch(`${import.meta.env.VITE_URL}/translations/${formState.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify({
        translation: {
          etymology: formState?.etymology,
          link: formState?.link,
          gender: formState?.gender,
        },
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err))
      .finally(clearForm);
  };

  const wordsOptions =
    words.length > 0 && !isLoading
      ? words.map((word: Word) => {
          return (
            <option key={word.id} value={word.id}>
              {word.word_name + " " + word?.emoji}
            </option>
          );
        })
      : null;

  const languagesOptions =
    languages.length > 0 && !isLoading
      ? languages.map((language: Language) => {
          return (
            <option key={language.id} value={language.id}>
              {language.name} {language?.flag ? language?.flag : ""}
            </option>
          );
        })
      : null;

  return (
    <>
      <div>
        <form
          id="edit-translation-form"
          className="form-control"
          onSubmit={(e) => handleOnSubmit(e)}
        >
          <h3 className="form-headline">Edit a Translation</h3>
          <div>
            <select id="word-select" onChange={(e) => handleOnChangeWord(e)}>
              <option>Select a Word</option>
              {wordsOptions}
            </select>
            <select
              id="language-select"
              onChange={(e) => handleOnChangeLanguage(e)}
            >
              <option>Select a Language</option>
              {languagesOptions}
            </select>
            <button
              type="submit"
              disabled={!chosenLanguageId || !chosenWordId}
              onClick={(e) => handleOnDropdownSubmit(e)}
            >
              Select
            </button>
            <label htmlFor="id">Id: </label>
            <input
              type="text"
              id="id"
              name="id"
              placeholder="-1"
              value={formState.id}
              disabled
            />
          </div>
          <div className="form-row">
            <div className="one-third-col">
              <label htmlFor="translation">Translation: </label>
              <input
                type="text"
                id="translation"
                name="translation"
                placeholder="Translation"
                value={formState?.translation ?? ""}
                onChange={(e) => handleOnChange(e)}
                className="input-text"
              />
            </div>
            <div className="one-third-col">
              <label htmlFor="romanization">Romanization: </label>
              <input
                type="text"
                id="romanization"
                name="romanization"
                placeholder="Romanization"
                value={formState?.romanization ?? ""}
                onChange={(e) => handleOnChange(e)}
                className="input-text"
              />
            </div>
            <div className="one-third-col">
              <div>
                <label htmlFor="gender">Gender: </label>
                <br />
                <input
                  type="text"
                  id="gender"
                  name="gender"
                  placeholder="Gender"
                  value={formState?.gender}
                  disabled={formState?.gender ? false : true}
                  onChange={(e) => handleOnChange(e)}
                  className="input-text gender-input"
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="three-quarter-col">
              <label htmlFor="link">Link: </label>
              <input
                type="text"
                id="link"
                name="link"
                placeholder="Link"
                value={formState?.link ?? ""}
                onChange={(e) => handleOnChange(e)}
                className="three-quarter-col input-text"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="full-col">
              <label htmlFor="etymology">Etymology: </label>
              <textarea
                id="etymology"
                name="etymology"
                placeholder="Etymology"
                value={formState?.etymology ?? ""}
                onChange={(e) => handleOnChange(e)}
                className="new-etymology-textarea"
              />
            </div>
          </div>
          <input
            type="submit"
            value="Update"
            className={
              chosenLanguageId && chosenWordId && formState.etymology
                ? "submit-btn"
                : "submit-btn-disabled"
            }
            disabled={
              !chosenLanguageId || !chosenWordId || !formState.etymology
            }
          />

          <button
            type="button"
            className="cancel-btn"
            //   onClick={this.cancelFormAction}
          >
            Cancel
          </button>
          <button type="button" className="clear-btn" onClick={clearForm}>
            Clear Form
          </button>
        </form>
      </div>
    </>
  );
}

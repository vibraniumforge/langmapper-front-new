import { useEffect, useState } from "react";
import "../styles/edit-translation-form.css";
// import LanguageNameAutofill from "../selects/LanguageNameAutofill";

interface FormStateProps {
  gender: string;
  link: string;
  romanization: string;
  translation: string;
  etymology: string;
}
export default function TranslationForm() {
  const [formState, setFormState] = useState<FormStateProps>({
    gender: "",
    link: "",
    romanization: "",
    translation: "",
    etymology: "",
  });

  const translationId: number = 5;

  const token = () => localStorage.getItem("jwt");

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token()}`,
    },
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/translations/${translationId}`, params)
      .then((res) => res.json())
      .then((res) => {
        setFormState({
          gender: res.gender,
          link: res.link,
          romanization: res.romanization,
          translation: res.translation,
          etymology: res.etymology,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleOnChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
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
      gender: "",
      link: "",
      romanization: "",
      translation: "",
      etymology: "",
    });
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_URL}/translations/${translationId}`, {
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
            {/* <label htmlFor="name">Language: </label>
          <input
            type="text"
            id="language"
            name="language"
            placeholder="Language Name"
            value={this.state.language}
            onChange={this.handleOnChange}
            disabled
          /> */}
            {/* <label htmlFor="word">Word: </label>
          <input
            type="text"
            id="word"
            name="word"
            placeholder="Word"
            value={this.state.word}
            onChange={this.handleOnChange}
            disabled
          /> */}
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
                  value={formState?.gender.toString()}
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
          <input type="submit" value="Update" className="submit-btn" />

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

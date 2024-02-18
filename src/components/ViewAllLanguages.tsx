import { useEffect, useState } from "react";
// import ViewAllWordsResultsContainer from "./ViewAllWordsResultsContainer.js";
import { Language } from "../types/Language";

export default function ViewAllLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/languages`)
      .then((res) => res.json())
      .then((res) => {
        setLanguages(res), setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      View All {languages.length > 0 && !isLoading ? languages.length : null}{" "}
      Languages
      {languages.length > 0 && !isLoading
        ? languages.map((language: Language) => {
            return <p key={language.id}>{language.name}</p>;
          })
        : null}
    </>
  );
}

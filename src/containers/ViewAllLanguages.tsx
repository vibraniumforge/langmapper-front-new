import { useEffect, useState } from "react";
import ViewAllLanguagesResultCard from "../components/ViewAllLanguagesResultCard.tsx";
import { Language } from "../types/Language.js";

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

  const languageCards =
    languages.length > 0 && !isLoading
      ? languages.map((language) => {
          return (
            <ViewAllLanguagesResultCard key={language.id} language={language} />
          );
        })
      : languages.length === 0 && !isLoading
      ? " - No words found"
      : null;
  return (
    <>
      {/* View All {languages.length > 0 && !isLoading ? languages.length : null}{" "}
      Languages{" "}
      {languages.length > 0 && !isLoading ? (
        <ViewAllLanguagesResultsContainer languages={languages} />
      ) : languages.length === 0 && !isLoading ? (
        " - No languages found"
      ) : null} */}
      View All {languages.length > 0 && !isLoading ? languages.length : null}{" "}
      Languages <div id="card-container">{languageCards}</div>;
    </>
  );
}

import { useEffect, useState } from "react";
// import ViewAllWordsResultsContainer from "./ViewAllWordsResultsContainer.js";
import { Translation } from "../types/Translation";

export default function ViewAllTranslations() {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL}/translations`)
      .then((res) => res.json())
      .then((res) => {
        setTranslations(res), setIsLoading(false);
      })
      .catch((err) => console.log(err));
    setIsLoading(false);
  }, []);

  return (
    <>
      View All Translations
      {translations.length > 0 && !isLoading
        ? translations.map((translation: Translation) => {
            return <p key={translation.id}>{translation.etymology}</p>;
          })
        : null}
    </>
  );
}

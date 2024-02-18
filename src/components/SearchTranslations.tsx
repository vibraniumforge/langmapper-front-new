import { useEffect, useState } from "react";

export default function SearchTranslations() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(false);
    console.log("Home fires");
  }, []);

  //   const navigation = useNavigation();

  //   const searching =
  //     navigation.location &&
  //     new URLSearchParams(navigation.location.search).has("q");

  return !isLoading ? <>"Hi SearchTranslations"</> : null;
}

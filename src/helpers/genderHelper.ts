const genderHelper = (macrofamily: string, language: string): boolean => {
  const genderlessIELangs = [
    "Afrikaans",
    "Armenian",
    "Bengali",
    "English",
    "Konkani",
    "Ossetian",
    "Persian",
    "Scots",
  ];
  if (macrofamily !== "Indo-European" && macrofamily !== "Afro-Asiatic") {
    return false;
  }
  if (genderlessIELangs.includes(language)) {
    return false;
  }
  return true;
};

const genderColorHelper = (gender: string): string => {
  switch (gender?.substring(0, 1)) {
    case "m":
      return "male-result";
    case "f":
      return "female-result";
    case "n":
      return "neuter-result";
    case "c":
      return "common-result";
    default:
      return "";
  }
};

export { genderHelper, genderColorHelper };

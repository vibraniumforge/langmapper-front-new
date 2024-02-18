const genderHelper = (macrofamily: string, language: string): boolean => {
  const genderlessLangs = [
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
  if (genderlessLangs.includes(language)) {
    return false;
  }
  return true;
};

const genderColorHelper = (gender: string): string => {
  switch (gender) {
    case "m":
      return "male-result";
    case "f":
      return "female-result";
    case "n":
      return "neuter-result";
    default:
      return "";
  }
};

export { genderHelper, genderColorHelper };

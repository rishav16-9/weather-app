export const getSuffix = (n: number) => {
  const pr = new Intl.PluralRules("en-US", { type: "ordinal" });
  const suffix = {
    zero: "th", // Just in case — not used in English for ordinals
    one: "st",
    two: "nd",
    few: "rd",
    many: "th", // Not needed for English but TypeScript requires it
    other: "th",
  };
  return `${n}${suffix[pr.select(n)]}`;
};

export const getTIme = (date: string) => {
  const isodate = new Date(date.replace(" ", "T")); // Make it ISO-compliant

  const time = isodate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return time;
};

export const getDate = (date: string) => {
  const isodate = new Date(date.replace(" ", "T")); // Make it ISO-compliant

  const day = isodate.getDate();
  const dayWithSuffix = getSuffix(day);
  return dayWithSuffix;
};

export const getDay = (date: string) => {
  const isodate = new Date(date.replace(" ", "T"));
  const day = isodate.toLocaleDateString("en-US", { weekday: "short" });
  return day;
};

// TMDBのスコア背景
export const getTmdbScoreBgColor = (value: number | undefined): string => {
  if (!value) return "bg-gray-500";
  if (typeof value === "number") {
    const score = value;
    if (score >= 8.0) return "bg-green-500";
    if (score >= 6.0) return "bg-yellow-500";
    if (score >= 4.0) return "bg-orange-500";
    return "bg-gray-500";
  }
};

// IMDbのスコア背景
export const getImdbScoreBgColor = (value: string | undefined): string => {
  if (!value) return "bg-gray-500";
  if (typeof value === "string") {
    const score = parseFloat(value.split("/")[0]);
    if (score >= 8.0) return "bg-green-500";
    if (score >= 6.0) return "bg-yellow-500";
    if (score >= 4.0) return "bg-orange-500";
    if (score >= 0) return "bg-red-500";
    return "bg-gray-500";
  }
};

// Rotten tomatoesのスコア背景
export const getRtScoreBgColor = (value: string | undefined): string => {
  if (!value) return "bg-gray-500";
  if (typeof value === "string") {
    const score = parseFloat(value);
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    if (score >= 0) return "bg-red-500";
    return "bg-gray-500";
  }
};

// Metacriticのスコア背景
export const getMetaScoreBgColor = (value: string | undefined): string => {
  if (!value) return "bg-gray-500";
  if (typeof value === "string") {
    const score = parseFloat(value.split("/")[0]);
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    if (score >= 40) return "bg-orange-500";
    if (score >= 0) return "bg-red-500";
    return "bg-gray-500";
  }
};

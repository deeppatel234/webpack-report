import { partial } from "filesize";

const THEME = "theme";

export const getThemeFromLocal = () => {
  return localStorage.getItem(THEME);
};

export const setThemeInLocal = (theme) => {
  localStorage.setItem(THEME, theme);
};

export const size = partial({ base: 10 });

export const timeConversion = (millisec) => {
  const seconds = (millisec / 1000).toFixed(1);
  const minutes = (millisec / (1000 * 60)).toFixed(1);
  const hours = (millisec / (1000 * 60 * 60)).toFixed(1);
  const days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

  if (seconds < 60) {
    return `${seconds} Sec`;
  }
  if (minutes < 60) {
    return `${minutes} Min`;
  }
  if (hours < 24) {
    return `${hours} Hrs`;
  }
  return `${days} Days`;

  return `${millisec}millisec`;
};

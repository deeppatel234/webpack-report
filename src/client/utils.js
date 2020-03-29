const THEME = 'theme';

export const getThemeFromLocal = () => {
  return localStorage.getItem(THEME);
};

export const setThemeInLocal = theme => {
  localStorage.setItem(THEME, theme);
};

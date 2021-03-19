export const getThemeMode = () => {
  let mode = localStorage.getItem("darkMode");

  if (mode === "true" || mode === "false") {
    return JSON.parse(mode);
  } else {
    return false;
  }
};

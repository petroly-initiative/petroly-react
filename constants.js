
var URL_ENDPOINT = "https://petroly-api.graphcdn.app";


if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
  URL_ENDPOINT = "http://localhost:8000/endpoint/";

export const USER = {
  LOGGED_OUT: "logged_out",
  LOGGED_IN: "logged_in",
  VERIFING: "verifing",
  SETTING: "setting",
};

export const T = {
  LOGIN: "login",
  LOGOUT: "logout",
  SET_CLIENT: "set_client",
  SET_ME: "set_me",
  CHANGE_LANG: "change_language",
  CHANGE_THEME: "change_theme",
};

// Languages

export const L = {
  AR_SA: "ar-SA",
  EN_US: "en-US",
};

export const M = {
  DARK: "dark",
  LIGHT: "light",
};
// Set a default const language
export const DEF_LANG = L.EN_US;
export const DEF_THEME = M.DARK;

export const langDirection = (inLang) => ({
  width: "100%",
  display: "flex",
  justifyContent: "flex-start !important",
});

export { URL_ENDPOINT };

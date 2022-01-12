export const URL_ENDPOINT = process.env.REACT_APP_URL_ENDPOINT
  ? process.env.REACT_APP_URL_ENDPOINT
  : "http://localhost:8000/endpoint/";

export const USER = {
  LOGGED_OUT: "logged_out",
  LOGGED_IN: "logged_in",
  VERIFING: "verifing",
};

export const T = {
  LOGIN: "login",
  LOGOUT: "logout",
  SET_CLIENT: "set_client",
  CHANGE_LANG: "change_language",
};

// Languages

export const L = {
  AR_SA: "ar-SA",
  EN_US: "en-US",
};
// Set a default const language
export const DEF_LANG = L.EN_US;

export const langDirection = (inLang) => ({
   direction: `${inLang === L.AR_SA ? "rtl !important" : "ltr !important"}`,
   textAlign: `${inLang === L.AR_SA ? "right !important" : "left !important"}`,
 });

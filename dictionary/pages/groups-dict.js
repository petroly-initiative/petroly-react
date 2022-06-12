import { L } from "../../constants";

// TODO: arabic translation for groups screen
const arabic = {
  searchbar: "أدخل اسم المجتمع",
  createBlock: "الرجاء تسجيل الدخول",
  errMsg: "لا يوجد نتائج لبحثك"
};

// TODO: english translation for groups screen
const english = {
  searchbar: "Search for community name",
  createBlock: "Please Sign in",
  errMsg: "Could not find any results"
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

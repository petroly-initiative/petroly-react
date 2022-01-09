import {L} from "../../constants";
const arabic = {
  searchbar: "أدخل اسم المحاضر",
  searchbarFilter: "القسم الجامعي",
};

const english = {
  searchbar: "Search for Instructor",
  searchbarFilter: "Department",
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
    default:
      return lang;
  }
}

import { L } from "../../constants";

// TODO: arabic translation for groups screen
const arabic = {
  searchbar: "أدخل اسم المحاضر",
  header: "تقييماتي"
};

// TODO: english translation for groups screen
const english = {
  searchbar: "Search for instructor name",
  header: "My Evaluations"
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

import { L } from "../../constants";


const arabic = {
  searchbar: "أدخل اسم المجتمع",
  header: "مجتمعاتي",
};


const english = {
  searchbar: "Search for Group name",
  header: "My Groups",
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

// TODO: arabic translation for instructor screen
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
    case "ar":
      return arabic;
    case "en":
      return english;
    default:
      return lang;
  }
}

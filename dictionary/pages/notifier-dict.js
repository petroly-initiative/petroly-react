import { L } from "../../constants";

const arabic = {
  departments: "الأقسام الجامعية",
  searchbar: "ابحث عن كود المادة",
  searchbarFilter: "القسم الجامعي",

  trackBtn: "استعرض المواد المتتبعة",
};
const english = {
  depratments: "Departments List",
  searchbar: "Search for a course code",
  searchbarFilter: "Department",
  trackBtn: "View Tracked Courses",
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

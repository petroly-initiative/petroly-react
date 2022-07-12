import { L } from "../../constants";

const arabic = {
  departments: "الأقسام الجامعية",
  searchbar: "ابحث عن كود المادة",
  searchbarFilter: "القسم الجامعي",
  trackBtn: "استعرض المواد المتتبعة",
  termfilter: "الفصل الأكاديمي",
  allDepts: "جميع الأقسام"
};
const english = {
  depratments: "Departments List",
  searchbar: "Search for a course code",
  searchbarFilter: "Departments",
  trackBtn: "View Tracked Courses",
  termfilter: "Academic term",
  allDepts: "All Departments",
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

import {L} from "../../constants";
const arabic = {
  searchbar: "أدخل اسم المحاضر",
  searchbarFilter: "القسم الجامعي",
  errMsg: "اسم المحاضر المدخل غير موجود",
  errBtn: "اطلب إضافة المحاضر"
};

const english = {
  searchbar: "Search for Instructor",
  searchbarFilter: "Department",
  errMsg: "Instructor nor found",
  errBtn: "Request Instructor Addition"
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

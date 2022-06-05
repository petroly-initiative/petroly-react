import { L } from "../../constants";


const arabic = {
  searchbar: "أدخل اسم المحاضر",
  header: "تقييماتي",
  err: "خطأ في استعادة البيانات"
};


const english = {
  searchbar: "Search for instructor name",
  header: "My Evaluations",
  err: "Cannot Load Data"
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

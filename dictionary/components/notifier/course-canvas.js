import { L } from "../../../constants";

const arabic = {
  header: "المواد المتتبعة",
  instructions: "حالة جميع المواد المتتبعة",
  delete: "إلغاء تتبع المادة",
  settings: "إعدادات الإشعارات",
  emptyMsg: "ليس لديك أية مواد دراسية متتبعة في هذا الفصل الدراسي"
};

const english = {
  header: "Tracked Courses",
  instructions: "Status of all tracked courses",
  delete: "Cancel section tracking",
  settings: "Notifications Settings",
  emptyMsg: "You do not have any tracked courses in this term"
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

import { L } from "../../constants";

const arabic = {
  modalHeader: "إعدادات البحث",
  typesubHeader: "نوع المجتمع",
  edu: "تعليمي",
  fun: "ترفيهي",
  section: "شعبة",
  platformSubHeader: "منصة المجتمع",
  all: "كل ما سبق",
  courseErr: "الرجاء استخدام صيغة ABCDXXX",
  course: "المادة الدراسية",
};

const english = {
  modalHeader: "Search Settings",
  typesubHeader: "Group Type",
  edu: "Educational",
  fun: "Entertainment",
  section: "Section",
  platformSubHeader: "Group Platform",
  all: "All",
  courseErr: "Please use the following format : ABCDXXX",
  course: "Course Code",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

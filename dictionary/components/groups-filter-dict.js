import { L } from "../../constants";

const arabic = {
modalHeader: "إعدادات البحث",
typesubHeader: "نوع المجتمع",
edu: "تعليمي",
fun: "ترفيهي",
section: "شعبة",
platformSubHeader: "منصة المجتمع"
};

const english = {
  modalHeader: "Search Settings",
  typesubHeader: "Group Type",
  edu: "Educational",
  fun: "Entertainment",
  section: "Section",
  platformSubHeader: "Group Platform",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

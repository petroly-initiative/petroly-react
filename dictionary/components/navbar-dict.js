import { L } from "../../constants";

const arabic = {
  dashboard: "لوحة التحكم",
  logout: "تسجيل الخروج",
  settings: "الإعدادات",
  home: "الرئيسية",
  rating: "التقييم",
  groups: "المجتمعات",
  support: "الدعم"
};

const english = {
  dashboard: "Dashboard",
  logout: "Logout",
  settings: "Settings",
  home: "Home",
  rating: "Evaluation",
  groups: "Groups",
  support: "Support",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

import { L } from "../../constants";

const arabic = {
  dashboard: "لوحة التحكم",
  logout: "تسجيل الخروج",
  settings: "الإعدادات",
  home: "الرئيسية",
  rating: "التقييم",
  groups: "المجتمعات",
  language: "اللغة",
  radar: "الرادار",
  support: "الدعم",
  notifier: "الرادار",
  theme: "وضع العرض",};

const english = {
  dashboard: "Dashboard",
  logout: "Logout",
  settings: "Settings",
  home: "Home",
  rating: "Evaluation",
  groups: "Groups",
  support: "Support",
  language: "language",
  radar: "Radar",
  theme: "Theme",
  unauth_msg: "You need to login to access this feature"
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

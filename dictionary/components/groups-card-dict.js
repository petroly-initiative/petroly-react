import { L } from "../../constants";

// TODO: arabic translation for groups screen
const arabic = {
  edu: "تعليمي",
  fun: "ترفيهي",
  section: "شعبة",
  like: "إعجاب",
  report: "بلاغ",
};

// TODO: english translation for groups screen
const english = {
  edu: "Education",
  fun: "Entertainment",
  section: "Section",
  like: "Like",
  report: "Report",
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

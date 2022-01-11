import { L } from "../../constants";

// TODO: arabic translation for groups screen
const arabic = {
  header: "حسابي الشخصي",
  evals: "التقييمات",
  groups:"المجتمعات",
  pic: "صورة العرض"
};

// TODO: english translation for groups screen
const english = {
  header: "My Groups",
  evals: "Evaluations",
  groups: "Groups",
  pic: "Profile Picture",
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

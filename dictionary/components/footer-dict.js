import { L } from "../../constants";

const arabic = {
    serviceTitle: "خدماتنا",
    groups: "المجتمعات",
    evals: "التقييم",
    follow: "تابع جديدنا"
}

const english = {
  serviceTitle: "Our Services",
  groups: "Groups",
  evals: "Evaluation",
  follow: "Follow Us",
};


export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

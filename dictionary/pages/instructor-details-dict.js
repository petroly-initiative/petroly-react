import { L } from "../../constants";

const arabic = {
  ratingHeader: "التقييم العام",
  evalCount: "عدد المقيمين",
  evalBlock: "الرجاء تسجيل الدخول",
  evalAllow: "قيّم المحاضر",
  evaluated: "قيمتَ المُحاضِر",
  checkingData: "نتفقد بياناتك",
};

const english = {
  ratingHeader: "Rating",
  recentEvals: "Recent Evaluations",
  evalCount: "Evaluations Count",
  evalBlock: "Please Sign in",
  evalAllow: "Evaluate Instructor",
  evaluated: "Already Evaluated",
  checkingData: "Checking Your data",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

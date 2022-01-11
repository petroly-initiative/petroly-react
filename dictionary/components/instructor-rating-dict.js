import { L } from "../../constants";

const arabic = {
  grades: "الدرجات والتصحيح",
  teaching: "التدريس",
  person: "الشخصية",
};

const english = {
  grades: "Grading",
  teaching: "Teaching",
  person: "Personality",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

import { L } from "../../constants";

const arabic = {
  grades: "الدرجات",
  teaching: "التدريس",
  person: "الشخصية",
  course: "المادة الدراسية",
  comment: "تعليق عام",
  term :"الفصل الأكاديمي"
};

const english = {
  grades: "Grading",
  teaching: "Teaching",
  person: "Personality",
  course: "Course",
  comment: "Overview",
  term: "Academic term"
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

const arabic = {
  grades: "الدرجات",
  teaching: "التدريس",
  person: "الشخصية",
  course: "المادة الدراسية",
  comment: "تعليق عام"
};

const english = {
  grades: "Grading",
  teaching: "Teaching",
  person: "Personality",
  course: "Course",
  comment: "Overview"
};

export default function translator(lang) {
  switch (lang) {
    case "en":
      return english;
    case "ar":
      return arabic;
  }
}

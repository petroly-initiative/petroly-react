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
    case "en":
      return english;
    case "ar":
      return arabic;
  }
}

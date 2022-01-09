import { L } from "../../constants";

const arabic = {
modalHeader: "استمارة التقييم",
politeMsg: "نرجو عدم استخدام الألفاظ النابية تجاه أساتذتنا الكرام في استمارة التقييم",
infoHeader: "معلومات التقييم",
infoSubHeader: "معلومات ضرورية للاستفادةالقصوى من تقييمك",
termSubHeader: "الفصل الدراسي",
courseSubHeader: "المادة الدراسية",
gradeHeader: "التصحيح والدرجات",
gradeSubHeader: "شفافية التصحيح والالتزام بمعايير محددة للدرجات",
gradePlaceholder: "اكتب تعليقك عن تصحيح المحاضِر",
teachHeader: "التدريس",
teachSubHeader: "سهولة إيصال المعلومة وفهم المنهج",
teachPlaceholder: "اكتب تعليقك عن تدريس المحاضِر",
personHeader: "الشخصية",
personSubHeader: "المزاج العام والتعامل مع الطلاب",
personPlaceholder: "اكتب تعليقك عن شخصية المحاضِر",
commentHeader: "تعليق عام",
commentPlaceholder: "اكتب تعليقك العام",
submitHover: "تسلييم التقييم",
cancelHover: "إلغاء التقييم",
termErr: "الرجاء استخدام 3 أرقام فقط",
courseErr: " ABCDXXX :الرجاء كتابة اسم المدة الدراسية كالآتي"
};

const english = {
  modalHeader: "Evaluation Form",
  politeMsg: "Please Avoid using inappropriate language towards the instructors",
  infoHeader: "Evaluation Details",
  infoSubHeader: "Required info to maximize evaluation benefits",
  termSubHeader: "Academic Term",
  courseSubHeader: "Course",
  gradeHeader: "Grading",
  gradeSubHeader: "Transperancy and followed guidelines",
  gradePlaceholder: "comment on the instructor grading",
  teachHeader: "Teaching",
  teachSubHeader: "Ability to deliver material easily",
  teachPlaceholder: "Comment on instructor teaching",
  personHeader: "Personality",
  personSubHeader: "General mood, and student interactions",
  personPlaceholder: "comment on the instructor personality",
  commentHeader: "Overview",
  commentPlaceholder: "comment an overview of the instructor",
  submitHover: "Submit",
  cancelHover: "Cancel",
  termErr: "Please use 3 digits only",
    courseErr: "Please use the following course format: ABCDXXX "
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

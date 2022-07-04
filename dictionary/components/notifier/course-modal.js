import { L } from "../../../constants";

const arabic = {
    title: "تتبع المادة",
    instruction: "اختر الشعب التي تريد تتبعها",
    reminder: "إشعار تغير حالة المادة سيرسل عبر البريد الإلكتروني",
    lectureLabel: "محاضرة",
    labLabel: "مختبر",
    hybridLabel: "محاضرة ومختبر",
    confirm: "تأكيد التتبع",
    cancel: "إلغاء التتبع"
}

const english = {
  title: "Track a course",
  instruction: "Select sections to track",
  reminder: "Course status change will be sent via email",
  lectureLabel: "Lecture",
  labLabel: "Lab",
  hybridLabel: "Lecture & Lab",
  confirm: "Track Selected",
  cancel: "Cancel",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

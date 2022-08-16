import { L } from "../../../constants";

const arabic = {
  title: "تتبع المادة",
  instruction: "اختر جميع الشعب التي تريد تتبعها",
  reminder: "إشعار تغير حالة المادة سيرسل عبر البريد الإلكتروني",
  lectureLabel: "محاضرة",
  labLabel: "مختبر",
  hybridLabel: "مدمج",
  confirm: "تأكيد التتبع",
  cancel: "إلغاء التتبع",
  cancelhover: "إلغاء تتبع المادة",
  confirmHover: "تأكيد تتبع الشعب المختارة",
  unauth_msg: "الرجاء تسجيل الدخول لتتبع موادك الدراسية ",
};

const english = {
  title: "Track a course",
  instruction: "Check all sections that you would like to track",
  reminder: "Course status change will be sent via email",
  lectureLabel: "Lecture",
  labLabel: "Lab",
  hybridLabel: "Hybrid",
  confirm: "Track Selected",
  cancel: "Cancel",
  cancelHover: "Cancel course tracking",
  confirmHover: "Confirm tracking of selected sections",
  unauth_msg: "You need to login to track courses",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

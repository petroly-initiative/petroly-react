import { L } from "../../../constants";

const arabic = {
  title: "تتبع المادة",
  instruction: "اختر جميع الشعب التي تريد تتبعها",
  reminder: "إشعار تغير حالة المادة سيرسل حسب إعدادات الإشعار",
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
  instruction: "Check the desired section to track it",
  reminder: "Course status change will be sent according to your notification settings",
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

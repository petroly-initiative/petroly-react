import { L } from "../../../constants";

const arabic = {
  seats: "المقاعد المتاحة",
  sections: "الشعب",
  lectureLabel: "محاضرة",
  labLabel: "مختبر",
  hybridLabel: "مدمج",
  cancel: "إيقاف تتبع الشعبة",
  closed: "قائمة الانتظار ممتلئة",
  open: "قائمة الانتظار مفتوحة",
  seats: "المقاعد المتاحة",
  unavailableName: "اسم المحاضر غير متوفر",
  waitlist: "قائمة الانتظار",
  copied: "تم نسخ رقم تعريف الشعبة",
  crn: " انسخ رقم تعريف الشعبة",
  notCopied: "فشل نسخ الرقم التعريفي للشعبة",
};

const english = {
  seats: "Available Seats",
  sections: "Sections",
  lectureLabel: "Lecture",
  labLabel: "Lab",
  hybridLabel: "Hybrid",
  cancel: "Cancel Tracking",
  closed: "Waitlist is full",
  open: "Waitlist is open",
  seats: "Available Seats",
  unavailableName: "Instructor Name Unavailable",
  waitlist: "Waitlist",
  copied: "CRN copied successfully",
  crn: "copy course reference number (CRN)",
  notCopied: "failed to copy the CRN to your clipboard"

};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

import { L } from "../../../constants";

const arabic = {
  seats: "المقاعد المتاحة",
  sections: "الشعب",
  lectureLabel: "محاضرة",
  labLabel: "مختبر",
  hybridLabel: "مدمج",
  closed: "قائمة الانتظار ممتلئة",
  open: "قائمة الانتظار مفتوحة",
  seats: "المقاعد المتاحة",
  unavailableName: "اسم المحاضر غير متوفر",
  waitlist: "قائمة الانتظار",
  copied: "تم نسخ رقم تعريف الشعبة",
  crn: " انسخ رقم تعريف الشعبة",
  notCopied: "فشل نسخ الرقم التعريفي للشعبة",
  ratingHeader: "توجه للتقييم",
  enrolements: "عدد المقاعد المسجلة مقارنة بعدد المقاعد الكتاحة الكلي",
};

const english = {
  seats: "Available Seats",
  sections: "Sections",
  lectureLabel: "Lecture",
  labLabel: "Lab",
  hybridLabel: "Hybrid",
  closed: "Waitlist is full",
  open: "Waitlist is open",
  seats: "Available Seats",
  unavailableName: "Instructor Name Unavailable",
  waitlist: "Waitlist",
  copied: "CRN copied successfully",
  crn: "copy course reference number (CRN)",
  notCopied: "failed to copy the CRN to your clipboard",
  ratingHeader: "Lookup ratings",
  enrolements: "Number of taken seats / total number of offered seats",
};

export function waitlistMsg(lang, seats) {
  switch (lang) {
    case L.EN_US:
      return `Waitlist open with ${seats} seats left`;
    case L.AR_SA:
      return ` مقاعد متاحة في قائمة الانتظار ${seats}`;
  }
}

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

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
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}
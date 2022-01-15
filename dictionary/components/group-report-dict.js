import { L } from "../../constants";


const arabic = {
  header: "بلاغ عن مجتمع",
  reasonSub: "سبب البلاغ",
  badContent: "محتوى غير مناسب",
  deadLink: "الرابط لا يعمل / يعمل بشكل غير صحيح",
  other: "أسباب أخرى",
  clue: "دليل البلاغ",
  clueHelper: "الرجاء إرفاق ملف بإحدى الصيغ التالية: PNG, JPEG, MP4",
  submit: "أرسل البلاغ",
  err: "الرجاء اختيار سبب البلاغ",
  otherErr: "الرجاء كتابة سبب البلاغ في هذه الحالة"
};


const english = {
  header: "Report a Group",
  reasonSub: "Report Cause" ,
  badContent: "Inappropriate Content",
  deadLink: "Link is not working / does not work as intended",
  other: "Other Reasons",
  clue: "Report Evidence",
  clueHelper: "Please submit an evidence using PNG, JPEG, MP4",
  submit: "Send the Report",
  err: "please select a report cause",
  otherErr: "Please state the reason for reporting"
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

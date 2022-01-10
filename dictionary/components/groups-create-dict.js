import { L } from "../../constants";

// TODO: arabic translation for groups screen
const arabic = {
  header: "إنشاء مجتمع",
  name: "الاسم",
  namePlaceholder: "ادخل اسم المجموعة",
  edu: "تعليمي",
  eduSub: "لتجمعات طلاب المواد الدراسية والاهتمامات العلمية المشتركة",
  fun: "ترفيهي",
  funSub:
    "للانشطة غير الاكاديمية, كالرياضات البدنية والإلكترونية, والهوايات المتعددة",
  section: "شعبة",
  sectionSub: "لطلاب الشعبة الدراسية الواحدة",
  whatsapp: "واتساب",
  discord: "ديسكورد",
  telegram: "تيليقرام",
  pic: "صورة العرض",
  platform: "المنصة",
  type: "تصنيف المجتمع",
  desc: "الوصف",
  descPlaceHolder: "اكتب وصفاً للمجموعة",
  descHelper: "الحد الأقصى للوصف هو 500 حرف",
  link: "الرابط",
  linkPlaceholder: "ادخل رابط المجموعة",
  create: "أنشئ المجتمع",
  course: "المادة الدراسية",
  courseErr: "الرجاء استخدام صيغة ABCDXXX",
};

// TODO: english translation for groups screen
const english = {
  header: "Create a Group",
  name: "Name",
  namePlaceholder: "Enter Group name",
  edu: "Educational",
  eduSub: "For scientific and educational gatherings",
  fun: "Entertainment",
  funSub: "For non-academic activities, and hobbies",
  section: "Section",
  sectionSub: "For KFUPM students in certain sections",
  whatsapp: "Whatsapp",
  discord: "Discord",
  telegram: "Telegram",
  pic: "Display Picture",
  platform: "Platform",
  type: "Group Type",
  desc: "Description",
  descPlaceHolder: "Enter Group Description",
  descHelper: "Description Should not exceed 500 letters",
  link: "Link",
  linkPlaceholder: "Enter the Group link",
  create: "Create Group",
  course: "Course",
  courseErr: "Please use the following format : ABCDXXX"
                          
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

import { L } from "../../constants";


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
  nameHelper: "الحد الأقصى هو 100 حرفا",
  link: "الرابط",
  linkPlaceholder: "ادخل رابط المجموعة",
  create: "أنشئ المجتمع",
  course: "المادة الدراسية",
  courseErr: "الرجاء استخدام صيغة ABCDXXX",
  nameErr: "الرجاء ملء خانة اسم المجموعة",
  linkErr: "الرجاء تزويدنا برابط صالح للمجتمع المراد إضافته",
  typeErr: "الرجاء اختيار نوع المجتمع المراد إضافته",
  platformErr: "الرجاء اختيار المنصة الإلكترونية للمجتمع",
  descErr: "الرجاء كتابة وصف للمجموعة",
  };


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
  nameHelper: "Name should not exceed 100 letters",
  link: "Link",
  linkPlaceholder: "Enter the Group link",
  create: "Create Group",
  course: "Course",
  courseErr: "Please use the following format : ABCDXXX",
  nameErr: "Please fill the name field",
  linkErr: "Please provide us with a valid link",
  typeErr: "Please Select the Group Type",
  platformErr: "Please Select the Group Platform",
  descErr: "Please provide a description for the group",
 
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

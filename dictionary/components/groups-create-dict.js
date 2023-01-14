import { L } from "../../constants";

const arabic = {
  header: "إنشاء مجتمع",
  headerQuick: "إضافة مجموعات متعددة",
  name: "الاسم",
  namePlaceholder: "ادخل اسم المجموعة",
  namePlaceholderQuick: "أدخل العديد من روابط وتساب",
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
  descQuick: "إوابط وتساب",
  descPlaceHolder: "اكتب وصفاً للمجموعة",
  descHelper: "الحد الأقصى للوصف هو 500 حرف",
  descHelperQuick:
    "يمكن كتباة أكثر من رابط، كل رابط في سطر جديد. حتى مع وجود نصوص عشوائية.",
  nameHelper: "الحد الأقصى هو 100 حرفا",
  link: "الرابط",
  linkPlaceholder: "ادخل رابط المجموعة",
  create: "أنشئ المجتمع",
  createQuick: "استخرج الكل ثم أضف",
  edit: "حدث المجتمع",
  course: "المادة الدراسية",
  courseErr: "الرجاء استخدام صيغة ABCDXXX",
  nameErr: "الرجاء ملء خانة اسم المجموعة",
  linkErr: "الرجاء تزويدنا برابط صالح للمجتمع المراد إضافته",
  typeErr: "الرجاء اختيار نوع المجتمع المراد إضافته",
  platformErr: "الرجاء اختيار المنصة الإلكترونية للمجتمع",
  descErr: "الرجاء كتابة وصف للمجموعة",
  imageHelper: "الرجاء استخدام صيغة PNG, JPG, JPEG",
};

const english = {
  header: "Create a Group",
  headerQuick: "Create Multiple Groups",
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
  descQuick: "WahtsApp URLs",
  descPlaceHolder: "Enter Group Description",
  descPlaceHolderQuick: "Enter multiple WahtsApp URLs",
  descHelper: "Description Should not exceed 500 letters",
  descHelperQuick:
    "Write any mumber of WahtsApp links, even with some text, each link in a new line.",
  nameHelper: "Name should not exceed 100 letters",
  link: "Link",
  linkPlaceholder: "Enter the Group link",
  create: "Create Group",
  createQuick: "Extract All and Add",
  edit: "Edit Group",
  course: "Course",
  courseErr: "Please use the following format : ABCDXXX",
  nameErr: "Please fill the name field",
  linkErr: "Please provide us with a valid link",
  typeErr: "Please Select the Group Type",
  platformErr: "Please Select the Group Platform",
  descErr: "Please provide a description for the group",
  imageHelper: "Please use PNG, JPG, or JPEG format",
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

import { L } from "../../constants";

const arabic = {
  departments: "الأقسام الجامعية",
  searchbar: "ابحث عن كود المادة أو وصف المادة",
  searchbarFilter: "القسم الجامعي",
  trackBtn: "استعرض المواد المتتبعة",
  termfilter: "الفصل الأكاديمي",
  allDepts: "كل الأقسام",
  tutorialHeader: "كيفية تتبع حالة موادك الجامعية",
  searchHeader: "ابحث",
  searchContent:
    "قم بالبحث ياستخدام القسم الجامعي, الفصل الأكاديمي, واسم المادة",
  selectHeader: "اختر",
  selectContent: "قم باختيار الشعب التي تود تتبعها من القائمة",
  waitHeader: "انتظر",
  waitContent:
    "سنقوم بتنبيهك عند تحديث حالة المواد باستخدام البريد الإلكتروني , و بوت تلقرام الخاص بنا!",
  unauth_msg: "الرجاء تسجيل الدخول لاستخدام قائمة التتبع",
  deleted: "تم إيقاف تتبع الشعبة بنجاح",
  added: "تم تحديث قائمة التتبع بنجاح",
  error: "نواجه مشاكل في عرض البيانات. حاول مرة أخرى",
  empty: "لا توجد مواد دراسية متاحة لهذا القسم في الفصل الدراسي المختار",
  
};
const english = {
  depratments: "Departments List",
  searchbar: "Search for a course code, or course title",
  searchbarFilter: "Departments",
  trackBtn: "View Tracked Courses",
  termfilter: "Academic term",
  allDepts: "All ",
  tutorialHeader: "How to track your courses",
  searchHeader: "Search",
  searchContent:
    "Specify a term, a department, title or course code of your course and hit Search!",
  selectHeader: "Select",
  selectContent: "Select all sections you would like to track and confirm",
  waitHeader: "Wait",
  waitContent:
    "After tracking a course ,wait until we notify you via an email, or using our telegram bot!",
  unauth_msg: "You need to login to access the tracking list",
  deleted: "Section untracked Successfully",
  added: "Updated tracking list succesfully",
  error: "We are facing issues in providing data. Please try later",
  empty: "No courses are offered for this department in the specified term",
  
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
    default:
      return lang;
  }
}

import { L } from "../../../constants";

const arabic = {
  header: " إعدادات التسجيل (بيتا)",
  instructions: "اختار وش تبي تسوي لما تفتح المادة:",
  offHeader: "ما أبي أسجل",
  offContent: "لا تسجل لي المادة خلاص",
  defaultHeader: "سجل المادة بس",
  defaultContent: "سجل لي ذي المادة لما تفتح",
  linkedLabHeader: "سجل المادة مع المختبر",
  linkedLabContent: "سجل لي ذي المادة مع المختبر اللي رقمه:",
  replaceHeader: "بدل مادة ثانية",
  replaceContent: "سجل لي ذي المادة واحذف المادة اللي رقمها:",
  confirm: "حفظ الإعدادات",
  cancel: "إلغاء التغييرات",
  confirmTooltip: "حفظ التغييرات في إعدادات الإشعارات",
  cancelTooltip: "حذف التغييرات في إعدادات الإشعارات",
  successTele: "!تم تسجيل الدخول",
  successEdit: "!تم تحديث إعدادات الإشعارات بنجاح",
  failEdit:
    "حدث خطأ! لم نستطع تحديث إعدادات التسجيل",
};

const english = {
  header: " Registration Settings (Beta)",
  instructions:
    "Select how you want to handle registration when this course becomes available:",
  offHeader: "Don't Register",
  offContent: "Skip this course - don't attempt registration",
  defaultHeader: "Register Course Only",
  defaultContent: "Register for this course when it opens",
  linkedLabHeader: "Register Course + Lab",
  linkedLabContent:
    "Register for this course along with the specified lab section (CRN):",
  replaceHeader: "Replace Existing Course",
  replaceContent:
    "Register for this course and automatically drop the specified course (CRN):",
  confirm: "Confirm",
  cancel: "Cancel",
  confirmTooltip: "Confirm notification channels",
  cancelTooltip: "Cancel notification channels",
  successTele: "You are Signed in!",
  successEdit: "Notifcation settings setup is successful!",
  failEdit:
    "Oops! we couldn't update your notifications settings. Make sure you link your Telegram account",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

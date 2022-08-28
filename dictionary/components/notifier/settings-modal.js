import { L } from "../../../constants";

const arabic = {
  header: "إعدادات الإشعارات",
  instructions: "الرجاء ربط حسابك في تلقرام لتلقي الإشعارات",
  emailHeader: "البريد الإلكتروني",
  emailContent:
    "نقوم بإرسال الإشعارات عبر بريدك الإكلتروني المسجل في بترولي الرجاء عدم استخدام البريد الجامعي لتجنب الحجب ",
  teleHeader: "رسائل تلقرام",
  teleContent:
    "سيقوم بوت تلقرام الخاص بنا بإرسال الإشعارات مباشرة لحسابك في تلقرام. الرجاء تسجيل الدخولأدناه للتفعيل",
  confirm: "حفظ الإعدادات",
  cancel: "إلغاء التغييرات",
  confirmTooltip: "حفظ التغييرات في إعدادات الإشعارات",
  cancelTooltip: "حذف التغييرات في إعدادات الإشعارات",
  successTele: "!تم تسجيل الدخول",
  successEdit: "!تم تحديث إعدادات الإشعارات بنجاح",
  failEdit: "حدث خطأ! لم نستطع تحديث إعدادات الإشعارات",
};

const english = {
  header: "Notifications Settings",
  instructions: "You need to connect your telegram account to recieve notifications",
  emailHeader: "Email",
  emailContent:
    "Sending notifications via your registered email. Please do not use your KFUPM account",
  teleHeader: "Telegram",
  teleContent:
    "Our telegram bot will send you direct notifications! Requires sign in to telegram",
  confirm: "Confirm",
  cancel: "Cancel",
  confirmTooltip: "Confirm notification channels",
  cancelTooltip: "Cancel notification channels",
  successTele: "You are Signed in!",
  successEdit: "Notifcation settings setup is successful!",
  failEdit:
    "Oops! we couldn't update your notifications settings. Try again later",
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

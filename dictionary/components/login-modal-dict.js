
import { L } from "../../constants";

const arabic = {
  switch1: "تسجيل الدخول",
  switch2: "إنشاء حساب",
  textField1: "اسم المستخدم",
  textField2: "البريد الإلكتروني",
  passField1: "كلمة المرور",
  passField2: "تأكيد كلمة المرور",
  wrongPassword: "الرجاء التاكد من التطابق كلمة المرور",
  forgetPassword: "نسيت كلمة المرور؟",
  replacePass: "أعد تعيين كلمة المرور",
  replacePassHeader: "إعادة تعيين كلمة المرور",
  replacePassHelper: "الرجاء كتابة بريدك الإلكتروني لإرسال كلمة المرور الجديدة",
  sendPass: "أرسل كلمة المرور",
  alreadyAcc: "لديك حساب بترولي؟",
  alreadySignIn: "سجل دخولك",
  emailErr: "الرجاء استخدام بريد إلكتروني صالح",
  emptyErr: "الرجاء تعبئة الخانات المطلوبة لتسجيل الدخول",
  confirmErr: "الرجاء تأكيد إنشاء الحساب الخاص بك عن طريق بريدك الإلكتروني",
  checker: "الرجاء تأكيد إنشاء الحساب الخاص بك عن طريق بريدك الإلكتروني",
  confirmer: "تأكيد إنشاء حساب",
  doublePass: "الرجاء التأكد من تطابق كلمة المرور",
  checkMail: "تفقد بريدك الإلكتروني لإعادة ضبط كلمة المرور"
};

const english = {
  switch1: "Login",
  switch2: "Register",
  textField1: "Username",
  textField2: "Email",
  passField1: "Password",
  passField2: "Confirm Password",
  submitButton1: "Register",
  submitButton2: "Login",
  wrongPassword: "Please make sure the passowrds match",
  forgetPassword: "Forget password?",
  replacePass: "click here to reset",
  replacePassHeader: "Send a new Password",
  replacePassHelper: "Please provide your email account to send the password ",
  sendPass: "Send a New Password",
  alreadyAcc: "You Have a petroly Account?",
  alreadySignIn: "Sign in",
  emailErr: "Please use a valid email address",
  emptyErr: "Please fill empty fields",
  confirmErr: "Make sure to sign in using your email address",
  confirmer: "Confirm New Account",
  checker: "Please Check your email address to activate your petroly account",
  doublePass: "Please enter a matching password",
  checkMail: "check your emal for password reset"
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

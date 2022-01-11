
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
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

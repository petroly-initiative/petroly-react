import { L } from "../../constants";

const arabic = {
  headerOne: "خدمات رقمية",
  headerTwo: "بترولية",
  landingText: "خدمات إلكترونية عالية الجدوة لزملائنا البتروليين!",
  navBtnMain: "اكتشف خدماتنا",
  navBtnSecondary: "اكتشف الخدمة",
  servicesHeader: "خدماتنا",
  quoteHeader: "هدفنا",
  quoteText:
    "دعم زملائنا البتروليين عن طريق تقديم خدمات إلكترونية متميزة تدعم مسيرتهم الأكاديمية المتميزة عن طريق جمع جميع المعلومات التي يحتاجون إليها تحت منصة واحدة. ونطمح بانضمام زملاء آخرين لنا لننقل هذه الشعلة من جيل لآخر",

  quoteAuth: "- فريق بترولي",
  service0: "المجتمعات",
  service0Desc:
    "سئمت من البحث عن المجموعات التي تحتاجها في بداية الفصل الدراسي ؟ بترولي يوفر لك تشكيلة من مجتمعات متعددة تخدم كل احتياجاتك",
  service1: "التقييم",
  service1Desc:
    "تبحث عن محاضر يناسب اهتماماتك ؟ بترولي يتيح لك اتخاذ القرار الأنسب في خدمة التقييم التي تحتوي على مئات التقييمات لعديد المحاضرين",
  service2: "الرادار",
  service2Desc:
    "لا تضيع وقتك في انتظار تغير حالة موادك بعد اليوم. بترولي سيقوم بإشعارك من هاتفك مباشرة",
};

const english = {
  headerOne: "High-class",
  headerTwo: "Digital Services",
  landingText: "Premium digital services curated carefully for our classmates!",
  navBtnMain: "Explore our services",
  navBtnSecondary: "Explore it",
  servicesHeader: "Our Services",
  quoteHeader: "Our Goal",
  quoteAuth: " - Petroly Intiative Team",
  quoteText:
    "Supporting our beloved university classmates in their academic journeys by compiling all information that they need under one platform, and we hope to be joined by new friends to pass the torch for next generations",
  service0: "Groups",
  service0Desc:
    "Tired from searching for communities that gather your interests? Petroly has a collection of all types of communities !",
  service1: "Rating",
  service1Desc:
    "Searching for your ideal instructor? Petroly got you covered with hundreds of evaluations",
  service2: "Radar",
  service2Desc:
    "Stop wasting your time waiting for the sections to open. Track them and Petroly will notify you immediately",
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

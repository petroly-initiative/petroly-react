import { L } from "../../../constants";

const arabic = {
  header: "المواد المتتبعة",
  instructions: "حالة جميع المواد المتتبعة",
  delete: "إلغاء تتبع المادة"
};

const english = {
  header: "Tracked Courses",
  instructions: "Status of all tracked courses",
  delete: "Cancel section tracking"
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

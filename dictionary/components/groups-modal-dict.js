
import { L } from "../../constants";


const arabic = {
  platform: "المنصة",
  type: "تصنيف المجتمع",
  desc: "الوصف",
  submit: "انضم للمجموعة",
};


const english = {
  platform: "Platform",
  type: "Group Type",
  desc: "Description",
  submit: "Join Group",
};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

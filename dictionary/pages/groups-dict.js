import { L } from "../../constants";

// TODO: arabic translation for groups screen
const arabic = {};

// TODO: english translation for groups screen
const english = {};

export default function translator(lang) {
  switch (lang) {
    case L.AR_SA:
      return arabic;
    case L.EN_US:
      return english;
  }
}

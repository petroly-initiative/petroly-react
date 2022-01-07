// TODO: arabic translation for groups screen
const arabic = {};

// TODO: english translation for groups screen
const english = {};

export default function translator(lang) {
  switch (lang) {
    case "ar":
      return arabic;
    case "en":
      return english;
  }
}

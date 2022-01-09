const arabic = {};

const english = {};

export default function translator(lang) {
  switch (lang) {
    case "EN_US":
      return english;
    case "AR_SA":
      return arabic;
  }
}

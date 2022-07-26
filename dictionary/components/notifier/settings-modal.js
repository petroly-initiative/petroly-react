import { L } from "../../../constants";

const arabic = {
  header: "",
  instructions: "",
  emailHeader: "",
  emailContent: "",
  teleHeader: "",
  teleContent: "",
  confirm: "",
  cancel: "",
  confirmTooltip: "",
  cancelTooltip: ""
};

const english = {
  header: "Notifications Settings",
  instructions: "Select at least a single notifications channel",
  emailHeader: "Email",
  emailContent: "Sending notifications via your registered email. Please do not use your KFUPM account",
  teleHeader: "Telegram",
  teleContent: "Our telegram bot will send you direct notifications! Requires sign in to telegram",
  confirm: "Confirm",
  cancel: "Cancel",
  confirmTooltip: "Confirm notification channels",
  cancelTooltip: "Cancel notification channels"
};

export default function translator(lang) {
  switch (lang) {
    case L.EN_US:
      return english;
    case L.AR_SA:
      return arabic;
  }
}

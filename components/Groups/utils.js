export default function mapErrorsToFields({ errors }) {
  var result = {};
  errors.map((error) => {
    var longMsg = "";
    error.messages.map((msg) => (longMsg += msg + "\n"));
    result[error.field] = longMsg;
  });
  return result;
}

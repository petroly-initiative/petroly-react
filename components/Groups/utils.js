export default function mapErrorsToFields({ messages }) {
  var result = {};
  messages.map((message) => {
    result[message.field] = message.message;
  });
  return result;
}

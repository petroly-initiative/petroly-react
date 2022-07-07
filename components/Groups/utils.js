export default function mapErrorsToFields({ messages }) {
  console.log(messages);
  var result = {};
  messages.map((message) => {
    result[message.field] = message.message;
  });
  return result;
}

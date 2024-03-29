import { useState } from "react";
import Alert from "react-bootstrap/Alert";

function RadarAlert() {
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(false);

  return (
    <>
      <Alert
        variant="success"
        onClose={() => setShow(false)}
        show={show}
        dismissible
      >
        <Alert.Heading>New Feature !</Alert.Heading>
        <p>
          We introduce our new feature <em>Radar Register</em> (beta) & hidden terms. To acivate
          it:
          <ol>
            <li>
              <Alert.Link href="https://cutt.ly/AwIJMqMo">
                Download
              </Alert.Link>{" "}
              our Chrome extension.
            </li>
            <li>
              Follow{" "}
              <Alert.Link
                href="https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked"
                target="_blank"
              >
                these steps
              </Alert.Link>{" "}
              for how to load it to your Chrome.
            </li>
            <li>
              Sign in to both Petroly and Banner/Portal, then open the extension
              in Petroly.co tab.
            </li>
            <li>
              Now from your tracked courses toggle "Register" button for each
              section.
            </li>
          </ol>
        </p>
      </Alert>
      <Alert
        variant="warning"
        onClose={() => setShow2(false)}
        show={show2}
        dismissible
      >
        <Alert.Heading>Limitations</Alert.Heading>
        <p>
          <ul>
            <li>Normal users can track as many as 5 sections.</li>
            <li>
              Only contributors to the{" "}
              <Alert.Link
                target="_blank"
                href="https://cutt.ly/ewUFbDXG"
              >
                source code
              </Alert.Link>{" "}
              can track up to 30 sections.
            </li>
          </ul>
        </p>
      </Alert>
    </>
  );
}

export default RadarAlert;
